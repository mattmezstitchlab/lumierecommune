import { eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  addShortlist,
  createEventRequest,
  createIssueReport,
  createLegalGodmother,
  createMissionDocument,
  createMissionSheet,
  createPaymentRecord,
  createPartnerApplication,
  getIssueReportsForAdmin,
  getLegalGodmothersForAdmin,
  getDocumentsForRequest,
  getMissionSheetsForRequest,
  getMissionSheetById,
  getPaymentRecordsForAdmin,
  getPaymentRecordsForRequest,
  getPartnerApplicationsForAdmin,
  getProfileForUser,
  getPublicTalentProfiles,
  getRequestById,
  getRequestsForUser,
  getShortlistsForRequest,
  getTalentProfileById,
  getTalentProfilesForAdmin,
  setTalentApproval,
  setTalentPartnerStatus,
  updateLegalGodmotherStatus,
  updateMissionSheet,
  updatePaymentRecord,
  updateIssueReportStatus,
  updatePartnerApplicationStatus,
  updateRequestStatus,
  updateShortlistStatus,
  upsertTalentProfile,
} from "./db";
import { canTransitionRequestStatus, missionSheetStatusFor, partnerStateFor } from "./domainRules";
import { eventRequestInputSchema } from "./inputSchemas";
import { COOKIE_NAME } from "../shared/const";
import { missionDocuments } from "../drizzle/schema";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { adminProcedure, protectedProcedure, publicProcedure, router } from "./_core/trpc";

const categorySchema = z.enum(["accueil", "service", "animation", "technique", "art", "logistique"]);
const requestStatusSchema = z.enum(["nouvelle", "qualification", "preselection", "confirmee", "cloturee"]);
const missionSheetStatusSchema = z.enum(["brouillon", "consentements_attendus", "en_relecture_juridique", "validee", "annulee"]);
const legalReviewStatusSchema = z.enum(["non_soumis", "en_attente", "valide", "a_revoir"]);
const documentTypeSchema = z.enum(["devis", "fiche_mission", "facture"]);
const documentStatusSchema = z.enum(["brouillon", "emis", "valide", "annule"]);
const paymentTypeSchema = z.enum(["coordination", "talent", "remboursement", "autre"]);
const paymentStatusSchema = z.enum(["a_preparer", "a_valider", "autorise", "envoye", "rapproche", "echoue", "annule"]);

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      ctx.res.clearCookie(COOKIE_NAME, { ...getSessionCookieOptions(ctx.req), maxAge: -1 });
      return { success: true } as const;
    }),
  }),
  requests: router({
    create: protectedProcedure
      .input(eventRequestInputSchema)
      .mutation(async ({ ctx, input }) => {
        const id = await createEventRequest({ organizerId: ctx.user.id, ...input, venue: input.venue || null, contactPhone: input.contactPhone || null });
        return { id };
      }),
    mine: protectedProcedure.query(({ ctx }) => getRequestsForUser(ctx.user.id, ctx.user.role === "admin")),
    updateStatus: adminProcedure.input(z.object({ id: z.number().int().positive(), status: requestStatusSchema })).mutation(async ({ input }) => {
      const request = await getRequestById(input.id);
      if (!request) throw new TRPCError({ code: "NOT_FOUND", message: "Demande introuvable." });
      if (!canTransitionRequestStatus(request.status, input.status)) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "La mission doit suivre les étapes de coordination dans l’ordre." });
      }
      await updateRequestStatus(input.id, input.status);
      return { success: true };
    }),
  }),
  talents: router({
    publicList: publicProcedure.input(z.object({ category: categorySchema.optional(), search: z.string().max(120).optional() })).query(({ input }) => getPublicTalentProfiles(input)),
    mine: protectedProcedure.query(({ ctx }) => getProfileForUser(ctx.user.id)),
    save: protectedProcedure
      .input(z.object({
        professionalName: z.string().trim().min(2).max(160),
        headline: z.string().trim().min(8).max(220),
        city: z.string().trim().min(2).max(160),
        region: z.string().trim().min(2).max(160),
        category: categorySchema,
        skills: z.string().trim().min(3).max(1200),
        bio: z.string().trim().min(30).max(3000),
        accessPath: z.enum(["independant", "accompagne"]),
        consentPublic: z.literal(true),
        isOpenToMissions: z.boolean(),
        availableFrom: z.string().max(32).optional(),
        availableTo: z.string().max(32).optional(),
        availabilityNote: z.string().trim().max(320).optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const profileId = await upsertTalentProfile({
          userId: ctx.user.id,
          professionalName: input.professionalName,
          headline: input.headline,
          city: input.city,
          region: input.region,
          category: input.category,
          skills: input.skills,
          bio: input.bio,
          accessPath: input.accessPath,
          partnerStatus: partnerStateFor(input.accessPath),
          consentPublic: true,
          consentedAt: new Date(),
          isOpenToMissions: input.isOpenToMissions,
        }, {
          availableFrom: input.availableFrom,
          availableTo: input.availableTo,
          note: input.availabilityNote,
        });
        return { profileId, approvalStatus: "en_attente" as const };
      }),
    approve: adminProcedure.input(z.object({ id: z.number().int().positive(), approvalStatus: z.enum(["approuve", "suspendu"]) })).mutation(async ({ input }) => {
      await setTalentApproval(input.id, input.approvalStatus);
      return { success: true };
    }),
    adminList: adminProcedure.query(() => getTalentProfilesForAdmin()),
    setPartnerStatus: adminProcedure.input(z.object({ id: z.number().int().positive(), partnerStatus: z.enum(["non_requis", "en_attente", "valide"]) })).mutation(async ({ input }) => {
      await setTalentPartnerStatus(input.id, input.partnerStatus);
      return { success: true };
    }),
  }),
  coordination: router({
    shortlistsForRequest: protectedProcedure.input(z.object({ eventRequestId: z.number().int().positive() })).query(async ({ ctx, input }) => {
      const request = await getRequestById(input.eventRequestId);
      if (!request || (request.organizerId !== ctx.user.id && ctx.user.role !== "admin")) {
        throw new TRPCError({ code: "FORBIDDEN", message: "Cette mission n’est pas accessible." });
      }
      return getShortlistsForRequest(input.eventRequestId);
    }),
    addShortlist: adminProcedure.input(z.object({ eventRequestId: z.number().int().positive(), talentProfileId: z.number().int().positive(), coordinationNote: z.string().max(1000).optional() })).mutation(async ({ input }) => {
      const id = await addShortlist({ ...input, coordinationNote: input.coordinationNote || null });
      return { id };
    }),
    updateShortlist: adminProcedure.input(z.object({ id: z.number().int().positive(), status: z.enum(["propose", "contacte", "preselectionne", "confirme", "retire"]) })).mutation(async ({ input }) => {
      await updateShortlistStatus(input.id, input.status);
      return { success: true };
    }),
  }),
  legal: router({
    adminList: adminProcedure.query(() => getLegalGodmothersForAdmin()),
    create: adminProcedure.input(z.object({
      displayName: z.string().trim().min(2).max(180),
      professionalTitle: z.string().trim().min(2).max(220),
      contactEmail: z.string().email().max(320).optional().or(z.literal("")),
      profileUrl: z.string().url().max(500).optional().or(z.literal("")),
      scope: z.string().trim().min(20).max(3000),
    })).mutation(async ({ input }) => {
      const id = await createLegalGodmother({
        ...input,
        contactEmail: input.contactEmail || null,
        profileUrl: input.profileUrl || null,
        status: "proposee",
      });
      return { id, status: "proposee" as const };
    }),
    updateStatus: adminProcedure.input(z.object({
      id: z.number().int().positive(),
      status: z.enum(["proposee", "en_discussion", "validation_demandee", "validee", "suspendue"]),
      writtenValidationReference: z.string().trim().max(500).optional().or(z.literal("")),
    })).mutation(async ({ input }) => {
      if (input.status === "validee" && !input.writtenValidationReference?.trim()) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "Une référence de validation écrite est requise avant de déclarer la marraine validée." });
      }
      await updateLegalGodmotherStatus(input.id, input.status, input.writtenValidationReference || null);
      return { success: true };
    }),
  }),
  missionSheets: router({
    forRequest: protectedProcedure.input(z.object({ eventRequestId: z.number().int().positive() })).query(async ({ ctx, input }) => {
      const request = await getRequestById(input.eventRequestId);
      if (!request || (request.organizerId !== ctx.user.id && ctx.user.role !== "admin")) {
        throw new TRPCError({ code: "FORBIDDEN", message: "Cette mission n’est pas accessible." });
      }
      return getMissionSheetsForRequest(input.eventRequestId);
    }),
    create: adminProcedure.input(z.object({
      eventRequestId: z.number().int().positive(),
      talentProfileId: z.number().int().positive(),
      legalGodmotherId: z.number().int().positive().optional().nullable(),
      title: z.string().trim().min(5).max(240),
      missionDescription: z.string().trim().min(20).max(5000),
      workDate: z.string().trim().min(2).max(32),
      location: z.string().trim().min(2).max(240),
      schedule: z.string().trim().max(160).optional(),
      remunerationCents: z.number().int().positive().max(100000000),
      organizerConsent: z.boolean().default(false),
      talentConsent: z.boolean().default(false),
    })).mutation(async ({ ctx, input }) => {
      const request = await getRequestById(input.eventRequestId);
      if (!request) throw new TRPCError({ code: "NOT_FOUND", message: "Demande introuvable." });
      const talent = await getTalentProfileById(input.talentProfileId);
      if (!talent) throw new TRPCError({ code: "NOT_FOUND", message: "Talent introuvable." });
      const partnerConsentStatus = talent.accessPath === "independant" ? "non_requis" as const : "attendu" as const;
      const generatedStatus = missionSheetStatusFor({
        organizerConsent: input.organizerConsent,
        talentConsent: input.talentConsent,
        partnerConsentStatus,
        hasLegalGodmother: Boolean(input.legalGodmotherId),
      });
      const missionSheetId = await createMissionSheet({
        ...input,
        schedule: input.schedule || null,
        legalGodmotherId: input.legalGodmotherId ?? null,
        status: generatedStatus,
        partnerConsentStatus,
        partnerConsent: false,
        consentedAt: generatedStatus === "en_relecture_juridique" ? new Date() : null,
        legalReviewStatus: input.legalGodmotherId ? "en_attente" : "non_soumis",
        createdBy: ctx.user.id,
      });
      const documentId = await createMissionDocument({
        eventRequestId: input.eventRequestId,
        missionSheetId,
        type: "fiche_mission",
        reference: `FM-${new Date().getFullYear()}-${String(missionSheetId).padStart(5, "0")}`,
        status: "brouillon",
        amountCents: input.remunerationCents,
        createdBy: ctx.user.id,
      });
      return { missionSheetId, documentId, status: generatedStatus };
    }),
    update: adminProcedure.input(z.object({
      id: z.number().int().positive(),
      status: missionSheetStatusSchema.optional(),
      legalReviewStatus: legalReviewStatusSchema.optional(),
      talentConsent: z.boolean().optional(),
      organizerConsent: z.boolean().optional(),
      partnerConsentStatus: z.enum(["non_requis", "attendu", "recu"]).optional(),
    })).mutation(async ({ input }) => {
      const { id, ...values } = input;
      const existing = await getMissionSheetById(id);
      if (!existing) throw new TRPCError({ code: "NOT_FOUND", message: "Fiche de mission introuvable." });
      const talent = await getTalentProfileById(existing.talentProfileId);
      if (!talent) throw new TRPCError({ code: "NOT_FOUND", message: "Talent de la fiche introuvable." });
      const partnerConsentStatus = talent.accessPath === "independant" ? "non_requis" as const : values.partnerConsentStatus ?? existing.partnerConsentStatus;
      if (talent.accessPath === "accompagne" && partnerConsentStatus === "non_requis") {
        throw new TRPCError({ code: "BAD_REQUEST", message: "Une structure accompagnante doit être consultée et son accord doit être tracé." });
      }
      const consented = (values.talentConsent ?? existing.talentConsent) && (values.organizerConsent ?? existing.organizerConsent) && partnerConsentStatus !== "attendu";
      const computedStatus = missionSheetStatusFor({
        organizerConsent: Boolean(values.organizerConsent ?? existing.organizerConsent),
        talentConsent: Boolean(values.talentConsent ?? existing.talentConsent),
        partnerConsentStatus,
        hasLegalGodmother: Boolean(existing.legalGodmotherId),
      });
      if (values.status === "en_relecture_juridique" && computedStatus !== "en_relecture_juridique") {
        throw new TRPCError({ code: "BAD_REQUEST", message: "La fiche doit avoir les consentements documentés et une marraine juridique associée avant relecture." });
      }
      await updateMissionSheet(id, { ...values, partnerConsentStatus, partnerConsent: partnerConsentStatus === "recu", ...(consented ? { consentedAt: new Date() } : { consentedAt: null }), ...(values.status ? {} : { status: computedStatus }) });
      return { success: true };
    }),
  }),
  documents: router({
    forRequest: protectedProcedure.input(z.object({ eventRequestId: z.number().int().positive() })).query(async ({ ctx, input }) => {
      const request = await getRequestById(input.eventRequestId);
      if (!request || (request.organizerId !== ctx.user.id && ctx.user.role !== "admin")) {
        throw new TRPCError({ code: "FORBIDDEN", message: "Ces documents ne sont pas accessibles." });
      }
      return getDocumentsForRequest(input.eventRequestId);
    }),
    create: adminProcedure.input(z.object({
      eventRequestId: z.number().int().positive(),
      missionSheetId: z.number().int().positive().optional().nullable(),
      type: documentTypeSchema,
      reference: z.string().trim().min(3).max(80),
      amountCents: z.number().int().positive().max(100000000),
      status: documentStatusSchema.default("brouillon"),
    })).mutation(async ({ ctx, input }) => {
      const id = await createMissionDocument({ ...input, missionSheetId: input.missionSheetId ?? null, createdBy: ctx.user.id, issuedAt: input.status === "emis" ? new Date() : null });
      return { id };
    }),
    updateStatus: adminProcedure.input(z.object({ id: z.number().int().positive(), status: documentStatusSchema })).mutation(async ({ input }) => {
      const { getDb } = await import("./db");
      const database = await getDb();
      if (!database) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "La base de données est indisponible." });
      await database.update(missionDocuments).set({ status: input.status, issuedAt: input.status === "emis" ? new Date() : undefined }).where(eq(missionDocuments.id, input.id));
      return { success: true };
    }),
  }),
  payments: router({
    forRequest: protectedProcedure.input(z.object({ eventRequestId: z.number().int().positive() })).query(async ({ ctx, input }) => {
      const request = await getRequestById(input.eventRequestId);
      if (!request || (request.organizerId !== ctx.user.id && ctx.user.role !== "admin")) {
        throw new TRPCError({ code: "FORBIDDEN", message: "Ces informations de paiement ne sont pas accessibles." });
      }
      return getPaymentRecordsForRequest(input.eventRequestId);
    }),
    adminList: adminProcedure.query(() => getPaymentRecordsForAdmin()),
    create: adminProcedure.input(z.object({
      eventRequestId: z.number().int().positive(),
      missionSheetId: z.number().int().positive().optional().nullable(),
      documentId: z.number().int().positive().optional().nullable(),
      paymentType: paymentTypeSchema,
      amountCents: z.number().int().positive().max(100000000),
      notes: z.string().trim().max(2000).optional(),
    })).mutation(async ({ ctx, input }) => {
      const id = await createPaymentRecord({ ...input, missionSheetId: input.missionSheetId ?? null, documentId: input.documentId ?? null, notes: input.notes || null, createdBy: ctx.user.id });
      return { id, status: "a_preparer" as const, provider: "revolut_business" as const };
    }),
    updateStatus: adminProcedure.input(z.object({
      id: z.number().int().positive(),
      status: paymentStatusSchema,
      externalReference: z.string().trim().max(180).optional(),
      notes: z.string().trim().max(2000).optional(),
    })).mutation(async ({ ctx, input }) => {
      await updatePaymentRecord(input.id, { status: input.status, externalReference: input.externalReference || null, notes: input.notes || null, approvedBy: ["autorise", "envoye", "rapproche"].includes(input.status) ? ctx.user.id : undefined, paidAt: input.status === "rapproche" ? new Date() : undefined });
      return { success: true };
    }),
  }),
  partners: router({
    submit: publicProcedure.input(z.object({
      organisationName: z.string().trim().min(2).max(220),
      contactName: z.string().trim().min(2).max(160),
      contactEmail: z.string().email().max(320),
      website: z.string().url().max(500).optional().or(z.literal("")),
      supportFramework: z.string().trim().min(30).max(4000),
    })).mutation(async ({ input }) => {
      const id = await createPartnerApplication({ ...input, website: input.website || null });
      return { id, status: "en_echange" as const };
    }),
    adminList: adminProcedure.query(() => getPartnerApplicationsForAdmin()),
    updateStatus: adminProcedure.input(z.object({ id: z.number().int().positive(), status: z.enum(["en_echange", "valide", "suspendu"]) })).mutation(async ({ input }) => {
      await updatePartnerApplicationStatus(input.id, input.status);
      return { success: true };
    }),
  }),
  reports: router({
    create: publicProcedure.input(z.object({
      category: z.enum(["securite", "remuneration", "confidentialite", "comportement", "autre"]),
      relatedRequestId: z.number().int().positive().optional(),
      contactEmail: z.string().email().max(320).optional().or(z.literal("")),
      message: z.string().trim().min(20).max(5000),
    })).mutation(async ({ ctx, input }) => {
      const id = await createIssueReport({
        reporterId: ctx.user?.id ?? null,
        category: input.category,
        relatedRequestId: input.relatedRequestId ?? null,
        contactEmail: input.contactEmail || null,
        message: input.message,
      });
      return { id, status: "recu" as const };
    }),
    adminList: adminProcedure.query(() => getIssueReportsForAdmin()),
    updateStatus: adminProcedure.input(z.object({ id: z.number().int().positive(), status: z.enum(["recu", "en_cours", "clos"]) })).mutation(async ({ input }) => {
      await updateIssueReportStatus(input.id, input.status);
      return { success: true };
    }),
  }),
});

export type AppRouter = typeof appRouter;
