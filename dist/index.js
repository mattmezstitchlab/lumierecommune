var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// drizzle/schema.ts
import {
  boolean,
  int,
  mysqlEnum,
  mysqlTable,
  text,
  timestamp,
  varchar
} from "drizzle-orm/mysql-core";
var users, eventRequests, talentProfiles, talentAvailabilities, requestShortlists, partnerApplications, issueReports, legalGodmothers, missionSheets, missionDocuments, paymentRecords;
var init_schema = __esm({
  "drizzle/schema.ts"() {
    "use strict";
    users = mysqlTable("users", {
      id: int("id").autoincrement().primaryKey(),
      openId: varchar("openId", { length: 64 }).notNull().unique(),
      name: text("name"),
      email: varchar("email", { length: 320 }),
      loginMethod: varchar("loginMethod", { length: 64 }),
      role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
      lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull()
    });
    eventRequests = mysqlTable("eventRequests", {
      id: int("id").autoincrement().primaryKey(),
      organizerId: int("organizerId").notNull(),
      eventType: mysqlEnum("eventType", ["mariage", "prive", "entreprise", "culture", "autre"]).notNull(),
      eventDate: varchar("eventDate", { length: 32 }).notNull(),
      city: varchar("city", { length: 160 }).notNull(),
      venue: varchar("venue", { length: 240 }),
      guestCount: int("guestCount"),
      budgetCents: int("budgetCents").notNull(),
      needs: text("needs").notNull(),
      contactName: varchar("contactName", { length: 160 }).notNull(),
      contactEmail: varchar("contactEmail", { length: 320 }).notNull(),
      contactPhone: varchar("contactPhone", { length: 48 }),
      status: mysqlEnum("status", ["nouvelle", "qualification", "preselection", "confirmee", "cloturee"]).default("nouvelle").notNull(),
      coordinationFeeCents: int("coordinationFeeCents").default(18e3).notNull(),
      solidarityContributionCents: int("solidarityContributionCents").default(0).notNull(),
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
    talentProfiles = mysqlTable("talentProfiles", {
      id: int("id").autoincrement().primaryKey(),
      userId: int("userId").notNull().unique(),
      professionalName: varchar("professionalName", { length: 160 }).notNull(),
      headline: varchar("headline", { length: 220 }).notNull(),
      city: varchar("city", { length: 160 }).notNull(),
      region: varchar("region", { length: 160 }).notNull(),
      category: mysqlEnum("category", ["accueil", "service", "animation", "technique", "art", "logistique"]).notNull(),
      skills: text("skills").notNull(),
      bio: text("bio").notNull(),
      accessPath: mysqlEnum("accessPath", ["independant", "accompagne"]).default("independant").notNull(),
      partnerStatus: mysqlEnum("partnerStatus", ["non_requis", "en_attente", "valide"]).default("non_requis").notNull(),
      approvalStatus: mysqlEnum("approvalStatus", ["en_attente", "approuve", "suspendu"]).default("en_attente").notNull(),
      consentPublic: boolean("consentPublic").default(false).notNull(),
      consentedAt: timestamp("consentedAt"),
      isOpenToMissions: boolean("isOpenToMissions").default(true).notNull(),
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
    talentAvailabilities = mysqlTable("talentAvailabilities", {
      id: int("id").autoincrement().primaryKey(),
      talentProfileId: int("talentProfileId").notNull(),
      availableFrom: varchar("availableFrom", { length: 32 }),
      availableTo: varchar("availableTo", { length: 32 }),
      note: varchar("note", { length: 320 }),
      createdAt: timestamp("createdAt").defaultNow().notNull()
    });
    requestShortlists = mysqlTable("requestShortlists", {
      id: int("id").autoincrement().primaryKey(),
      eventRequestId: int("eventRequestId").notNull(),
      talentProfileId: int("talentProfileId").notNull(),
      status: mysqlEnum("status", ["propose", "contacte", "preselectionne", "confirme", "retire"]).default("propose").notNull(),
      coordinationNote: text("coordinationNote"),
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
    partnerApplications = mysqlTable("partnerApplications", {
      id: int("id").autoincrement().primaryKey(),
      organisationName: varchar("organisationName", { length: 220 }).notNull(),
      contactName: varchar("contactName", { length: 160 }).notNull(),
      contactEmail: varchar("contactEmail", { length: 320 }).notNull(),
      website: varchar("website", { length: 500 }),
      supportFramework: text("supportFramework").notNull(),
      status: mysqlEnum("status", ["en_echange", "valide", "suspendu"]).default("en_echange").notNull(),
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
    issueReports = mysqlTable("issueReports", {
      id: int("id").autoincrement().primaryKey(),
      reporterId: int("reporterId"),
      category: mysqlEnum("category", ["securite", "remuneration", "confidentialite", "comportement", "autre"]).notNull(),
      relatedRequestId: int("relatedRequestId"),
      contactEmail: varchar("contactEmail", { length: 320 }),
      message: text("message").notNull(),
      status: mysqlEnum("status", ["recu", "en_cours", "clos"]).default("recu").notNull(),
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
    legalGodmothers = mysqlTable("legalGodmothers", {
      id: int("id").autoincrement().primaryKey(),
      displayName: varchar("displayName", { length: 180 }).notNull(),
      professionalTitle: varchar("professionalTitle", { length: 220 }).notNull(),
      contactEmail: varchar("contactEmail", { length: 320 }),
      profileUrl: varchar("profileUrl", { length: 500 }),
      scope: text("scope").notNull(),
      status: mysqlEnum("status", ["proposee", "en_discussion", "validation_demandee", "validee", "suspendue"]).default("proposee").notNull(),
      writtenValidationReference: varchar("writtenValidationReference", { length: 500 }),
      validatedAt: timestamp("validatedAt"),
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
    missionSheets = mysqlTable("missionSheets", {
      id: int("id").autoincrement().primaryKey(),
      eventRequestId: int("eventRequestId").notNull(),
      talentProfileId: int("talentProfileId").notNull(),
      legalGodmotherId: int("legalGodmotherId"),
      title: varchar("title", { length: 240 }).notNull(),
      missionDescription: text("missionDescription").notNull(),
      workDate: varchar("workDate", { length: 32 }).notNull(),
      location: varchar("location", { length: 240 }).notNull(),
      schedule: varchar("schedule", { length: 160 }),
      remunerationCents: int("remunerationCents").notNull(),
      status: mysqlEnum("status", ["brouillon", "consentements_attendus", "en_relecture_juridique", "validee", "annulee"]).default("brouillon").notNull(),
      talentConsent: boolean("talentConsent").default(false).notNull(),
      organizerConsent: boolean("organizerConsent").default(false).notNull(),
      partnerConsent: boolean("partnerConsent").default(false).notNull(),
      partnerConsentStatus: mysqlEnum("partnerConsentStatus", ["non_requis", "attendu", "recu"]).default("attendu").notNull(),
      consentedAt: timestamp("consentedAt"),
      legalReviewStatus: mysqlEnum("legalReviewStatus", ["non_soumis", "en_attente", "valide", "a_revoir"]).default("non_soumis").notNull(),
      createdBy: int("createdBy").notNull(),
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
    missionDocuments = mysqlTable("missionDocuments", {
      id: int("id").autoincrement().primaryKey(),
      eventRequestId: int("eventRequestId").notNull(),
      missionSheetId: int("missionSheetId"),
      type: mysqlEnum("type", ["devis", "fiche_mission", "facture"]).notNull(),
      reference: varchar("reference", { length: 80 }).notNull(),
      status: mysqlEnum("status", ["brouillon", "emis", "valide", "annule"]).default("brouillon").notNull(),
      amountCents: int("amountCents").notNull(),
      fileUrl: varchar("fileUrl", { length: 700 }),
      issuedAt: timestamp("issuedAt"),
      createdBy: int("createdBy").notNull(),
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
    paymentRecords = mysqlTable("paymentRecords", {
      id: int("id").autoincrement().primaryKey(),
      eventRequestId: int("eventRequestId").notNull(),
      missionSheetId: int("missionSheetId"),
      documentId: int("documentId"),
      provider: mysqlEnum("provider", ["revolut_business"]).default("revolut_business").notNull(),
      paymentType: mysqlEnum("paymentType", ["coordination", "talent", "remboursement", "autre"]).notNull(),
      amountCents: int("amountCents").notNull(),
      status: mysqlEnum("status", ["a_preparer", "a_valider", "autorise", "envoye", "rapproche", "echoue", "annule"]).default("a_preparer").notNull(),
      externalReference: varchar("externalReference", { length: 180 }),
      notes: text("notes"),
      approvedBy: int("approvedBy"),
      paidAt: timestamp("paidAt"),
      createdBy: int("createdBy").notNull(),
      createdAt: timestamp("createdAt").defaultNow().notNull(),
      updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
    });
  }
});

// server/_core/env.ts
var ENV;
var init_env = __esm({
  "server/_core/env.ts"() {
    "use strict";
    ENV = {
      appId: process.env.VITE_APP_ID ?? "",
      cookieSecret: process.env.JWT_SECRET ?? "",
      databaseUrl: process.env.DATABASE_URL ?? "",
      oAuthServerUrl: process.env.OAUTH_SERVER_URL ?? "",
      ownerOpenId: process.env.OWNER_OPEN_ID ?? "",
      isProduction: process.env.NODE_ENV === "production",
      forgeApiUrl: process.env.BUILT_IN_FORGE_API_URL ?? "",
      forgeApiKey: process.env.BUILT_IN_FORGE_API_KEY ?? ""
    };
  }
});

// server/db.ts
var db_exports = {};
__export(db_exports, {
  addShortlist: () => addShortlist,
  createEventRequest: () => createEventRequest,
  createIssueReport: () => createIssueReport,
  createLegalGodmother: () => createLegalGodmother,
  createMissionDocument: () => createMissionDocument,
  createMissionSheet: () => createMissionSheet,
  createPartnerApplication: () => createPartnerApplication,
  createPaymentRecord: () => createPaymentRecord,
  getDb: () => getDb,
  getDocumentsForRequest: () => getDocumentsForRequest,
  getIssueReportsForAdmin: () => getIssueReportsForAdmin,
  getLegalGodmothersForAdmin: () => getLegalGodmothersForAdmin,
  getMissionSheetById: () => getMissionSheetById,
  getMissionSheetsForRequest: () => getMissionSheetsForRequest,
  getPartnerApplicationsForAdmin: () => getPartnerApplicationsForAdmin,
  getPaymentRecordsForAdmin: () => getPaymentRecordsForAdmin,
  getPaymentRecordsForRequest: () => getPaymentRecordsForRequest,
  getProfileForUser: () => getProfileForUser,
  getPublicTalentProfiles: () => getPublicTalentProfiles,
  getRequestById: () => getRequestById,
  getRequestsForUser: () => getRequestsForUser,
  getShortlistsForRequest: () => getShortlistsForRequest,
  getTalentProfileById: () => getTalentProfileById,
  getTalentProfilesForAdmin: () => getTalentProfilesForAdmin,
  getUserByOpenId: () => getUserByOpenId,
  setTalentApproval: () => setTalentApproval,
  setTalentPartnerStatus: () => setTalentPartnerStatus,
  updateIssueReportStatus: () => updateIssueReportStatus,
  updateLegalGodmotherStatus: () => updateLegalGodmotherStatus,
  updateMissionSheet: () => updateMissionSheet,
  updatePartnerApplicationStatus: () => updatePartnerApplicationStatus,
  updatePaymentRecord: () => updatePaymentRecord,
  updateRequestStatus: () => updateRequestStatus,
  updateShortlistStatus: () => updateShortlistStatus,
  upsertTalentProfile: () => upsertTalentProfile,
  upsertUser: () => upsertUser
});
import { and, desc, eq, like, or } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}
async function upsertUser(user) {
  if (!user.openId) throw new Error("User openId is required for upsert");
  const db = await getDb();
  if (!db) return;
  const values = { openId: user.openId, lastSignedIn: /* @__PURE__ */ new Date() };
  const updateSet = { lastSignedIn: /* @__PURE__ */ new Date() };
  ["name", "email", "loginMethod"].forEach((field) => {
    if (user[field] !== void 0) {
      values[field] = user[field] ?? null;
      updateSet[field] = user[field] ?? null;
    }
  });
  if (user.role !== void 0) {
    values.role = user.role;
    updateSet.role = user.role;
  } else if (user.openId === ENV.ownerOpenId) {
    values.role = "admin";
    updateSet.role = "admin";
  }
  await db.insert(users).values(values).onDuplicateKeyUpdate({ set: updateSet });
}
async function getUserByOpenId(openId) {
  const db = await getDb();
  if (!db) return void 0;
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result[0];
}
async function createEventRequest(values) {
  const db = await getDb();
  if (!db) throw new Error("La base de donn\xE9es est indisponible.");
  const result = await db.insert(eventRequests).values(values);
  return Number(result[0].insertId);
}
async function getRequestsForUser(userId, isAdmin) {
  const db = await getDb();
  if (!db) return [];
  const query = db.select().from(eventRequests).orderBy(desc(eventRequests.createdAt));
  return isAdmin ? query : query.where(eq(eventRequests.organizerId, userId));
}
async function getRequestById(id) {
  const db = await getDb();
  if (!db) return void 0;
  const result = await db.select().from(eventRequests).where(eq(eventRequests.id, id)).limit(1);
  return result[0];
}
async function updateRequestStatus(id, status) {
  const db = await getDb();
  if (!db) throw new Error("La base de donn\xE9es est indisponible.");
  await db.update(eventRequests).set({ status }).where(eq(eventRequests.id, id));
}
async function upsertTalentProfile(values, availability) {
  const db = await getDb();
  if (!db) throw new Error("La base de donn\xE9es est indisponible.");
  await db.insert(talentProfiles).values(values).onDuplicateKeyUpdate({
    set: {
      professionalName: values.professionalName,
      headline: values.headline,
      city: values.city,
      region: values.region,
      category: values.category,
      skills: values.skills,
      bio: values.bio,
      accessPath: values.accessPath,
      partnerStatus: values.partnerStatus,
      consentPublic: values.consentPublic,
      consentedAt: values.consentedAt,
      isOpenToMissions: values.isOpenToMissions,
      approvalStatus: "en_attente"
    }
  });
  const profile = await db.select().from(talentProfiles).where(eq(talentProfiles.userId, values.userId)).limit(1);
  if (!profile[0]) throw new Error("Profil introuvable apr\xE8s enregistrement.");
  if (availability.availableFrom || availability.availableTo || availability.note) {
    await db.insert(talentAvailabilities).values({ talentProfileId: profile[0].id, ...availability });
  }
  return profile[0].id;
}
async function getPublicTalentProfiles(filters) {
  const db = await getDb();
  if (!db) return [];
  const conditions = [
    eq(talentProfiles.approvalStatus, "approuve"),
    eq(talentProfiles.consentPublic, true),
    eq(talentProfiles.isOpenToMissions, true)
  ];
  if (filters.category) conditions.push(eq(talentProfiles.category, filters.category));
  if (filters.search?.trim()) {
    const query = `%${filters.search.trim()}%`;
    conditions.push(or(like(talentProfiles.professionalName, query), like(talentProfiles.headline, query), like(talentProfiles.skills, query)));
  }
  return db.select().from(talentProfiles).where(and(...conditions)).orderBy(desc(talentProfiles.updatedAt));
}
async function getProfileForUser(userId) {
  const db = await getDb();
  if (!db) return void 0;
  const result = await db.select().from(talentProfiles).where(eq(talentProfiles.userId, userId)).limit(1);
  return result[0];
}
async function getTalentProfileById(id) {
  const db = await getDb();
  if (!db) return void 0;
  const result = await db.select().from(talentProfiles).where(eq(talentProfiles.id, id)).limit(1);
  return result[0];
}
async function getShortlistsForRequest(eventRequestId) {
  const db = await getDb();
  if (!db) return [];
  return db.select({
    id: requestShortlists.id,
    talentProfileId: requestShortlists.talentProfileId,
    status: requestShortlists.status,
    coordinationNote: requestShortlists.coordinationNote,
    professionalName: talentProfiles.professionalName,
    headline: talentProfiles.headline,
    category: talentProfiles.category,
    accessPath: talentProfiles.accessPath
  }).from(requestShortlists).innerJoin(talentProfiles, eq(requestShortlists.talentProfileId, talentProfiles.id)).where(eq(requestShortlists.eventRequestId, eventRequestId)).orderBy(desc(requestShortlists.createdAt));
}
async function addShortlist(values) {
  const db = await getDb();
  if (!db) throw new Error("La base de donn\xE9es est indisponible.");
  const result = await db.insert(requestShortlists).values(values);
  return Number(result[0].insertId);
}
async function updateShortlistStatus(id, status) {
  const db = await getDb();
  if (!db) throw new Error("La base de donn\xE9es est indisponible.");
  await db.update(requestShortlists).set({ status }).where(eq(requestShortlists.id, id));
}
async function createPartnerApplication(values) {
  const db = await getDb();
  if (!db) throw new Error("La base de donn\xE9es est indisponible.");
  const result = await db.insert(partnerApplications).values(values);
  return Number(result[0].insertId);
}
async function createIssueReport(values) {
  const db = await getDb();
  if (!db) throw new Error("La base de donn\xE9es est indisponible.");
  const result = await db.insert(issueReports).values(values);
  return Number(result[0].insertId);
}
async function setTalentApproval(id, approvalStatus) {
  const db = await getDb();
  if (!db) throw new Error("La base de donn\xE9es est indisponible.");
  await db.update(talentProfiles).set({ approvalStatus }).where(eq(talentProfiles.id, id));
}
async function getTalentProfilesForAdmin() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(talentProfiles).orderBy(desc(talentProfiles.createdAt));
}
async function setTalentPartnerStatus(id, partnerStatus) {
  const db = await getDb();
  if (!db) throw new Error("La base de donn\xE9es est indisponible.");
  await db.update(talentProfiles).set({ partnerStatus }).where(eq(talentProfiles.id, id));
}
async function getPartnerApplicationsForAdmin() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(partnerApplications).orderBy(desc(partnerApplications.createdAt));
}
async function updatePartnerApplicationStatus(id, status) {
  const db = await getDb();
  if (!db) throw new Error("La base de donn\xE9es est indisponible.");
  await db.update(partnerApplications).set({ status }).where(eq(partnerApplications.id, id));
}
async function getIssueReportsForAdmin() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(issueReports).orderBy(desc(issueReports.createdAt));
}
async function updateIssueReportStatus(id, status) {
  const db = await getDb();
  if (!db) throw new Error("La base de donn\xE9es est indisponible.");
  await db.update(issueReports).set({ status }).where(eq(issueReports.id, id));
}
async function getLegalGodmothersForAdmin() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(legalGodmothers).orderBy(desc(legalGodmothers.createdAt));
}
async function createLegalGodmother(values) {
  const db = await getDb();
  if (!db) throw new Error("La base de donn\xE9es est indisponible.");
  const result = await db.insert(legalGodmothers).values(values);
  return Number(result[0].insertId);
}
async function updateLegalGodmotherStatus(id, status, writtenValidationReference) {
  const db = await getDb();
  if (!db) throw new Error("La base de donn\xE9es est indisponible.");
  await db.update(legalGodmothers).set({
    status,
    writtenValidationReference: writtenValidationReference ?? null,
    validatedAt: status === "validee" ? /* @__PURE__ */ new Date() : null
  }).where(eq(legalGodmothers.id, id));
}
async function createMissionSheet(values) {
  const db = await getDb();
  if (!db) throw new Error("La base de donn\xE9es est indisponible.");
  const result = await db.insert(missionSheets).values(values);
  return Number(result[0].insertId);
}
async function getMissionSheetsForRequest(eventRequestId) {
  const db = await getDb();
  if (!db) return [];
  return db.select({
    id: missionSheets.id,
    eventRequestId: missionSheets.eventRequestId,
    talentProfileId: missionSheets.talentProfileId,
    legalGodmotherId: missionSheets.legalGodmotherId,
    title: missionSheets.title,
    missionDescription: missionSheets.missionDescription,
    workDate: missionSheets.workDate,
    location: missionSheets.location,
    schedule: missionSheets.schedule,
    remunerationCents: missionSheets.remunerationCents,
    status: missionSheets.status,
    talentConsent: missionSheets.talentConsent,
    organizerConsent: missionSheets.organizerConsent,
    partnerConsent: missionSheets.partnerConsent,
    partnerConsentStatus: missionSheets.partnerConsentStatus,
    consentedAt: missionSheets.consentedAt,
    legalReviewStatus: missionSheets.legalReviewStatus,
    professionalName: talentProfiles.professionalName,
    legalGodmotherName: legalGodmothers.displayName,
    createdAt: missionSheets.createdAt,
    updatedAt: missionSheets.updatedAt
  }).from(missionSheets).innerJoin(talentProfiles, eq(missionSheets.talentProfileId, talentProfiles.id)).leftJoin(legalGodmothers, eq(missionSheets.legalGodmotherId, legalGodmothers.id)).where(eq(missionSheets.eventRequestId, eventRequestId)).orderBy(desc(missionSheets.createdAt));
}
async function getMissionSheetById(id) {
  const db = await getDb();
  if (!db) return void 0;
  const result = await db.select().from(missionSheets).where(eq(missionSheets.id, id)).limit(1);
  return result[0];
}
async function updateMissionSheet(id, values) {
  const db = await getDb();
  if (!db) throw new Error("La base de donn\xE9es est indisponible.");
  await db.update(missionSheets).set(values).where(eq(missionSheets.id, id));
}
async function createMissionDocument(values) {
  const db = await getDb();
  if (!db) throw new Error("La base de donn\xE9es est indisponible.");
  const result = await db.insert(missionDocuments).values(values);
  return Number(result[0].insertId);
}
async function getDocumentsForRequest(eventRequestId) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(missionDocuments).where(eq(missionDocuments.eventRequestId, eventRequestId)).orderBy(desc(missionDocuments.createdAt));
}
async function createPaymentRecord(values) {
  const db = await getDb();
  if (!db) throw new Error("La base de donn\xE9es est indisponible.");
  const result = await db.insert(paymentRecords).values(values);
  return Number(result[0].insertId);
}
async function getPaymentRecordsForRequest(eventRequestId) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(paymentRecords).where(eq(paymentRecords.eventRequestId, eventRequestId)).orderBy(desc(paymentRecords.createdAt));
}
async function getPaymentRecordsForAdmin() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(paymentRecords).orderBy(desc(paymentRecords.createdAt));
}
async function updatePaymentRecord(id, values) {
  const db = await getDb();
  if (!db) throw new Error("La base de donn\xE9es est indisponible.");
  await db.update(paymentRecords).set(values).where(eq(paymentRecords.id, id));
}
var _db;
var init_db = __esm({
  "server/db.ts"() {
    "use strict";
    init_schema();
    init_env();
    _db = null;
  }
});

// server/_core/index.ts
import "dotenv/config";
import express2 from "express";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";

// shared/const.ts
var COOKIE_NAME = "app_session_id";
var ONE_YEAR_MS = 1e3 * 60 * 60 * 24 * 365;
var AXIOS_TIMEOUT_MS = 3e4;
var UNAUTHED_ERR_MSG = "Please login (10001)";
var NOT_ADMIN_ERR_MSG = "You do not have required permission (10002)";
var OAUTH_STATE_COOKIE = "__Host-oauth_state";
var decodeOAuthState = (state) => {
  let decoded;
  try {
    decoded = atob(state);
  } catch {
    return { redirectUri: "" };
  }
  try {
    const parsed = JSON.parse(decoded);
    if (parsed && typeof parsed.redirectUri === "string") return parsed;
  } catch {
  }
  return { redirectUri: decoded };
};

// server/_core/oauth.ts
init_db();
import { parse as parseCookieHeader2 } from "cookie";

// server/_core/cookies.ts
function isSecureRequest(req) {
  if (req.protocol === "https") return true;
  const forwardedProto = req.headers["x-forwarded-proto"];
  if (!forwardedProto) return false;
  const protoList = Array.isArray(forwardedProto) ? forwardedProto : forwardedProto.split(",");
  return protoList.some((proto) => proto.trim().toLowerCase() === "https");
}
function getSessionCookieOptions(req) {
  return {
    httpOnly: true,
    path: "/",
    sameSite: "none",
    secure: isSecureRequest(req)
  };
}

// shared/_core/errors.ts
var HttpError = class extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.name = "HttpError";
  }
};
var ForbiddenError = (msg) => new HttpError(403, msg);

// server/_core/sdk.ts
init_db();
init_env();
import axios from "axios";
import { parse as parseCookieHeader } from "cookie";
import { SignJWT, jwtVerify } from "jose";
var isNonEmptyString = (value) => typeof value === "string" && value.length > 0;
var EXCHANGE_TOKEN_PATH = `/webdev.v1.WebDevAuthPublicService/ExchangeToken`;
var GET_USER_INFO_PATH = `/webdev.v1.WebDevAuthPublicService/GetUserInfo`;
var GET_USER_INFO_WITH_JWT_PATH = `/webdev.v1.WebDevAuthPublicService/GetUserInfoWithJwt`;
var OAuthService = class {
  constructor(client) {
    this.client = client;
    console.log("[OAuth] Initialized with baseURL:", ENV.oAuthServerUrl);
    if (!ENV.oAuthServerUrl) {
      console.error(
        "[OAuth] ERROR: OAUTH_SERVER_URL is not configured! Set OAUTH_SERVER_URL environment variable."
      );
    }
  }
  decodeState(state) {
    return decodeOAuthState(state).redirectUri;
  }
  async getTokenByCode(code, state) {
    const payload = {
      clientId: ENV.appId,
      grantType: "authorization_code",
      code,
      redirectUri: this.decodeState(state)
    };
    const { data } = await this.client.post(
      EXCHANGE_TOKEN_PATH,
      payload
    );
    return data;
  }
  async getUserInfoByToken(token) {
    const { data } = await this.client.post(
      GET_USER_INFO_PATH,
      {
        accessToken: token.accessToken
      }
    );
    return data;
  }
};
var createOAuthHttpClient = () => axios.create({
  baseURL: ENV.oAuthServerUrl,
  timeout: AXIOS_TIMEOUT_MS
});
var SDKServer = class {
  client;
  oauthService;
  constructor(client = createOAuthHttpClient()) {
    this.client = client;
    this.oauthService = new OAuthService(this.client);
  }
  deriveLoginMethod(platforms, fallback) {
    if (fallback && fallback.length > 0) return fallback;
    if (!Array.isArray(platforms) || platforms.length === 0) return null;
    const set = new Set(
      platforms.filter((p) => typeof p === "string")
    );
    if (set.has("REGISTERED_PLATFORM_EMAIL")) return "email";
    if (set.has("REGISTERED_PLATFORM_GOOGLE")) return "google";
    if (set.has("REGISTERED_PLATFORM_APPLE")) return "apple";
    if (set.has("REGISTERED_PLATFORM_MICROSOFT") || set.has("REGISTERED_PLATFORM_AZURE"))
      return "microsoft";
    if (set.has("REGISTERED_PLATFORM_GITHUB")) return "github";
    const first = Array.from(set)[0];
    return first ? first.toLowerCase() : null;
  }
  /**
   * Exchange OAuth authorization code for access token
   * @example
   * const tokenResponse = await sdk.exchangeCodeForToken(code, state);
   */
  async exchangeCodeForToken(code, state) {
    return this.oauthService.getTokenByCode(code, state);
  }
  /**
   * Get user information using access token
   * @example
   * const userInfo = await sdk.getUserInfo(tokenResponse.accessToken);
   */
  async getUserInfo(accessToken) {
    const data = await this.oauthService.getUserInfoByToken({
      accessToken
    });
    const loginMethod = this.deriveLoginMethod(
      data?.platforms,
      data?.platform ?? data.platform ?? null
    );
    return {
      ...data,
      platform: loginMethod,
      loginMethod
    };
  }
  parseCookies(cookieHeader) {
    if (!cookieHeader) {
      return /* @__PURE__ */ new Map();
    }
    const parsed = parseCookieHeader(cookieHeader);
    return new Map(Object.entries(parsed));
  }
  getSessionSecret() {
    const secret = ENV.cookieSecret;
    return new TextEncoder().encode(secret);
  }
  /**
   * Create a session token for a Manus user openId
   * @example
   * const sessionToken = await sdk.createSessionToken(userInfo.openId);
   */
  async createSessionToken(openId, options = {}) {
    return this.signSession(
      {
        openId,
        appId: ENV.appId,
        name: options.name || ""
      },
      options
    );
  }
  async signSession(payload, options = {}) {
    const issuedAt = Date.now();
    const expiresInMs = options.expiresInMs ?? ONE_YEAR_MS;
    const expirationSeconds = Math.floor((issuedAt + expiresInMs) / 1e3);
    const secretKey = this.getSessionSecret();
    return new SignJWT({
      openId: payload.openId,
      appId: payload.appId,
      name: payload.name
    }).setProtectedHeader({ alg: "HS256", typ: "JWT" }).setExpirationTime(expirationSeconds).sign(secretKey);
  }
  async verifySession(cookieValue) {
    if (!cookieValue) {
      console.warn("[Auth] Missing session cookie");
      return null;
    }
    try {
      const secretKey = this.getSessionSecret();
      const { payload } = await jwtVerify(cookieValue, secretKey, {
        algorithms: ["HS256"]
      });
      const { openId, appId, name } = payload;
      if (!isNonEmptyString(openId) || !isNonEmptyString(appId) || !isNonEmptyString(name)) {
        console.warn("[Auth] Session payload missing required fields");
        return null;
      }
      return {
        openId,
        appId,
        name
      };
    } catch (error) {
      console.warn("[Auth] Session verification failed", String(error));
      return null;
    }
  }
  async getUserInfoWithJwt(jwtToken) {
    const payload = {
      jwtToken,
      projectId: ENV.appId
    };
    const { data } = await this.client.post(
      GET_USER_INFO_WITH_JWT_PATH,
      payload
    );
    const loginMethod = this.deriveLoginMethod(
      data?.platforms,
      data?.platform ?? data.platform ?? null
    );
    return {
      ...data,
      platform: loginMethod,
      loginMethod
    };
  }
  async authenticateRequest(req) {
    const cookies = this.parseCookies(req.headers.cookie);
    let sessionToken = cookies.get(COOKIE_NAME);
    if (!sessionToken) {
      const authHeader = req.headers.authorization;
      if (typeof authHeader === "string" && authHeader.startsWith("Bearer ")) {
        sessionToken = authHeader.slice(7);
      }
    }
    const session = await this.verifySession(sessionToken);
    if (!session) {
      throw ForbiddenError("Invalid session cookie");
    }
    if (session.openId.startsWith(CRON_OPEN_ID_PREFIX)) {
      const userInfo = await this.getUserInfoWithJwt(sessionToken ?? "");
      const taskUid = userInfo.taskUid ?? null;
      if (!taskUid) {
        throw ForbiddenError("Cron session missing task_uid");
      }
      return buildCronUser(userInfo);
    }
    const sessionUserId = session.openId;
    const signedInAt = /* @__PURE__ */ new Date();
    let user = await getUserByOpenId(sessionUserId);
    if (!user) {
      try {
        const userInfo = await this.getUserInfoWithJwt(sessionToken ?? "");
        await upsertUser({
          openId: userInfo.openId,
          name: userInfo.name || null,
          email: userInfo.email ?? null,
          loginMethod: userInfo.loginMethod ?? userInfo.platform ?? null,
          lastSignedIn: signedInAt
        });
        user = await getUserByOpenId(userInfo.openId);
      } catch (error) {
        console.error("[Auth] Failed to sync user from OAuth:", error);
        throw ForbiddenError("Failed to sync user info");
      }
    }
    if (!user) {
      throw ForbiddenError("User not found");
    }
    await upsertUser({
      openId: user.openId,
      lastSignedIn: signedInAt
    });
    return user;
  }
};
var CRON_OPEN_ID_PREFIX = "cron_";
function buildCronUser(userInfo) {
  const now = /* @__PURE__ */ new Date();
  return {
    id: -1,
    openId: userInfo.openId,
    name: userInfo.name || "Manus Scheduled Task",
    email: null,
    loginMethod: null,
    role: "user",
    createdAt: now,
    updatedAt: now,
    lastSignedIn: now,
    taskUid: userInfo.taskUid ?? void 0,
    isCron: true
  };
}
var sdk = new SDKServer();

// server/_core/oauth.ts
function getQueryParam(req, key) {
  const value = req.query[key];
  return typeof value === "string" ? value : void 0;
}
function registerOAuthRoutes(app) {
  app.get("/api/oauth/callback", async (req, res) => {
    const code = getQueryParam(req, "code");
    const state = getQueryParam(req, "state");
    if (!code || !state) {
      res.status(400).json({ error: "code and state are required" });
      return;
    }
    const { nonce } = decodeOAuthState(state);
    const expectedNonce = parseCookieHeader2(req.headers.cookie ?? "")[OAUTH_STATE_COOKIE];
    if (!nonce || nonce !== expectedNonce) {
      res.status(403).json({ error: "invalid oauth state" });
      return;
    }
    res.clearCookie(OAUTH_STATE_COOKIE, { path: "/", secure: true, sameSite: "none" });
    try {
      const tokenResponse = await sdk.exchangeCodeForToken(code, state);
      const userInfo = await sdk.getUserInfo(tokenResponse.accessToken);
      if (!userInfo.openId) {
        res.status(400).json({ error: "openId missing from user info" });
        return;
      }
      await upsertUser({
        openId: userInfo.openId,
        name: userInfo.name || null,
        email: userInfo.email ?? null,
        loginMethod: userInfo.loginMethod ?? userInfo.platform ?? null,
        lastSignedIn: /* @__PURE__ */ new Date()
      });
      const sessionToken = await sdk.createSessionToken(userInfo.openId, {
        name: userInfo.name || "",
        expiresInMs: ONE_YEAR_MS
      });
      const cookieOptions = getSessionCookieOptions(req);
      res.cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge: ONE_YEAR_MS });
      res.redirect(302, "/");
    } catch (error) {
      console.error("[OAuth] Callback failed", error);
      res.status(500).json({ error: "OAuth callback failed" });
    }
  });
}

// server/_core/storageProxy.ts
init_env();
function registerStorageProxy(app) {
  app.get("/manus-storage/*", async (req, res) => {
    const key = req.params[0];
    if (!key) {
      res.status(400).send("Missing storage key");
      return;
    }
    if (!ENV.forgeApiUrl || !ENV.forgeApiKey) {
      res.status(500).send("Storage proxy not configured");
      return;
    }
    try {
      const forgeUrl = new URL(
        "v1/storage/presign/get",
        ENV.forgeApiUrl.replace(/\/+$/, "") + "/"
      );
      forgeUrl.searchParams.set("path", key);
      const forgeResp = await fetch(forgeUrl, {
        headers: { Authorization: `Bearer ${ENV.forgeApiKey}` }
      });
      if (!forgeResp.ok) {
        const body = await forgeResp.text().catch(() => "");
        console.error(`[StorageProxy] forge error: ${forgeResp.status} ${body}`);
        res.status(502).send("Storage backend error");
        return;
      }
      const { url } = await forgeResp.json();
      if (!url) {
        res.status(502).send("Empty signed URL from backend");
        return;
      }
      res.set("Cache-Control", "no-store");
      res.redirect(307, url);
    } catch (err) {
      console.error("[StorageProxy] failed:", err);
      res.status(502).send("Storage proxy error");
    }
  });
}

// server/routers.ts
init_db();
import { eq as eq2 } from "drizzle-orm";
import { TRPCError as TRPCError3 } from "@trpc/server";
import { z as z3 } from "zod";

// server/domainRules.ts
var requestStatuses = ["nouvelle", "qualification", "preselection", "confirmee", "cloturee"];
function canTransitionRequestStatus(current, next) {
  const currentIndex = requestStatuses.indexOf(current);
  const nextIndex = requestStatuses.indexOf(next);
  return nextIndex === currentIndex || nextIndex === currentIndex + 1;
}
function partnerStateFor(accessPath) {
  return accessPath === "accompagne" ? "en_attente" : "non_requis";
}
function missionSheetStatusFor(input) {
  const allConsents = input.organizerConsent && input.talentConsent && input.partnerConsentStatus !== "attendu";
  return allConsents && input.hasLegalGodmother ? "en_relecture_juridique" : "consentements_attendus";
}

// server/inputSchemas.ts
import { z } from "zod";
var eventRequestInputSchema = z.object({
  eventType: z.enum(["mariage", "prive", "entreprise", "culture", "autre"]),
  eventDate: z.string().min(4).max(32),
  city: z.string().trim().min(2).max(160),
  venue: z.string().trim().max(240).optional(),
  guestCount: z.number().int().positive().max(1e4).optional(),
  budgetCents: z.number().int().min(0).max(1e8),
  needs: z.string().trim().min(20).max(5e3),
  contactName: z.string().trim().min(2).max(160),
  contactEmail: z.string().email().max(320),
  contactPhone: z.string().trim().max(48).optional(),
  coordinationFeeCents: z.number().int().min(0).max(1e7),
  solidarityContributionCents: z.number().int().min(0).max(1e7)
});

// server/routers.ts
init_schema();

// server/_core/systemRouter.ts
import { z as z2 } from "zod";

// server/_core/notification.ts
init_env();
import { TRPCError } from "@trpc/server";
var TITLE_MAX_LENGTH = 1200;
var CONTENT_MAX_LENGTH = 2e4;
var trimValue = (value) => value.trim();
var isNonEmptyString2 = (value) => typeof value === "string" && value.trim().length > 0;
var buildEndpointUrl = (baseUrl) => {
  const normalizedBase = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
  return new URL(
    "webdevtoken.v1.WebDevService/SendNotification",
    normalizedBase
  ).toString();
};
var validatePayload = (input) => {
  if (!isNonEmptyString2(input.title)) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Notification title is required."
    });
  }
  if (!isNonEmptyString2(input.content)) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Notification content is required."
    });
  }
  const title = trimValue(input.title);
  const content = trimValue(input.content);
  if (title.length > TITLE_MAX_LENGTH) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: `Notification title must be at most ${TITLE_MAX_LENGTH} characters.`
    });
  }
  if (content.length > CONTENT_MAX_LENGTH) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: `Notification content must be at most ${CONTENT_MAX_LENGTH} characters.`
    });
  }
  return { title, content };
};
async function notifyOwner(payload) {
  const { title, content } = validatePayload(payload);
  if (!ENV.forgeApiUrl) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Notification service URL is not configured."
    });
  }
  if (!ENV.forgeApiKey) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Notification service API key is not configured."
    });
  }
  const endpoint = buildEndpointUrl(ENV.forgeApiUrl);
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        accept: "application/json",
        authorization: `Bearer ${ENV.forgeApiKey}`,
        "content-type": "application/json",
        "connect-protocol-version": "1"
      },
      body: JSON.stringify({ title, content })
    });
    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.warn(
        `[Notification] Failed to notify owner (${response.status} ${response.statusText})${detail ? `: ${detail}` : ""}`
      );
      return false;
    }
    return true;
  } catch (error) {
    console.warn("[Notification] Error calling notification service:", error);
    return false;
  }
}

// server/_core/trpc.ts
import { initTRPC, TRPCError as TRPCError2 } from "@trpc/server";
import superjson from "superjson";
var t = initTRPC.context().create({
  transformer: superjson
});
var router = t.router;
var publicProcedure = t.procedure;
var requireUser = t.middleware(async (opts) => {
  const { ctx, next } = opts;
  if (!ctx.user) {
    throw new TRPCError2({ code: "UNAUTHORIZED", message: UNAUTHED_ERR_MSG });
  }
  return next({
    ctx: {
      ...ctx,
      user: ctx.user
    }
  });
});
var protectedProcedure = t.procedure.use(requireUser);
var adminProcedure = t.procedure.use(
  t.middleware(async (opts) => {
    const { ctx, next } = opts;
    if (!ctx.user || ctx.user.role !== "admin") {
      throw new TRPCError2({ code: "FORBIDDEN", message: NOT_ADMIN_ERR_MSG });
    }
    return next({
      ctx: {
        ...ctx,
        user: ctx.user
      }
    });
  })
);

// server/_core/systemRouter.ts
var systemRouter = router({
  health: publicProcedure.input(
    z2.object({
      timestamp: z2.number().min(0, "timestamp cannot be negative")
    })
  ).query(() => ({
    ok: true
  })),
  notifyOwner: adminProcedure.input(
    z2.object({
      title: z2.string().min(1, "title is required"),
      content: z2.string().min(1, "content is required")
    })
  ).mutation(async ({ input }) => {
    const delivered = await notifyOwner(input);
    return {
      success: delivered
    };
  })
});

// server/routers.ts
var categorySchema = z3.enum(["accueil", "service", "animation", "technique", "art", "logistique"]);
var requestStatusSchema = z3.enum(["nouvelle", "qualification", "preselection", "confirmee", "cloturee"]);
var missionSheetStatusSchema = z3.enum(["brouillon", "consentements_attendus", "en_relecture_juridique", "validee", "annulee"]);
var legalReviewStatusSchema = z3.enum(["non_soumis", "en_attente", "valide", "a_revoir"]);
var documentTypeSchema = z3.enum(["devis", "fiche_mission", "facture"]);
var documentStatusSchema = z3.enum(["brouillon", "emis", "valide", "annule"]);
var paymentTypeSchema = z3.enum(["coordination", "talent", "remboursement", "autre"]);
var paymentStatusSchema = z3.enum(["a_preparer", "a_valider", "autorise", "envoye", "rapproche", "echoue", "annule"]);
var appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      ctx.res.clearCookie(COOKIE_NAME, { ...getSessionCookieOptions(ctx.req), maxAge: -1 });
      return { success: true };
    })
  }),
  requests: router({
    create: protectedProcedure.input(eventRequestInputSchema).mutation(async ({ ctx, input }) => {
      const id = await createEventRequest({ organizerId: ctx.user.id, ...input, venue: input.venue || null, contactPhone: input.contactPhone || null });
      return { id };
    }),
    mine: protectedProcedure.query(({ ctx }) => getRequestsForUser(ctx.user.id, ctx.user.role === "admin")),
    updateStatus: adminProcedure.input(z3.object({ id: z3.number().int().positive(), status: requestStatusSchema })).mutation(async ({ input }) => {
      const request = await getRequestById(input.id);
      if (!request) throw new TRPCError3({ code: "NOT_FOUND", message: "Demande introuvable." });
      if (!canTransitionRequestStatus(request.status, input.status)) {
        throw new TRPCError3({ code: "BAD_REQUEST", message: "La mission doit suivre les \xE9tapes de coordination dans l\u2019ordre." });
      }
      await updateRequestStatus(input.id, input.status);
      return { success: true };
    })
  }),
  talents: router({
    publicList: publicProcedure.input(z3.object({ category: categorySchema.optional(), search: z3.string().max(120).optional() })).query(({ input }) => getPublicTalentProfiles(input)),
    mine: protectedProcedure.query(({ ctx }) => getProfileForUser(ctx.user.id)),
    save: protectedProcedure.input(z3.object({
      professionalName: z3.string().trim().min(2).max(160),
      headline: z3.string().trim().min(8).max(220),
      city: z3.string().trim().min(2).max(160),
      region: z3.string().trim().min(2).max(160),
      category: categorySchema,
      skills: z3.string().trim().min(3).max(1200),
      bio: z3.string().trim().min(30).max(3e3),
      accessPath: z3.enum(["independant", "accompagne"]),
      consentPublic: z3.literal(true),
      isOpenToMissions: z3.boolean(),
      availableFrom: z3.string().max(32).optional(),
      availableTo: z3.string().max(32).optional(),
      availabilityNote: z3.string().trim().max(320).optional()
    })).mutation(async ({ ctx, input }) => {
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
        consentedAt: /* @__PURE__ */ new Date(),
        isOpenToMissions: input.isOpenToMissions
      }, {
        availableFrom: input.availableFrom,
        availableTo: input.availableTo,
        note: input.availabilityNote
      });
      return { profileId, approvalStatus: "en_attente" };
    }),
    approve: adminProcedure.input(z3.object({ id: z3.number().int().positive(), approvalStatus: z3.enum(["approuve", "suspendu"]) })).mutation(async ({ input }) => {
      await setTalentApproval(input.id, input.approvalStatus);
      return { success: true };
    }),
    adminList: adminProcedure.query(() => getTalentProfilesForAdmin()),
    setPartnerStatus: adminProcedure.input(z3.object({ id: z3.number().int().positive(), partnerStatus: z3.enum(["non_requis", "en_attente", "valide"]) })).mutation(async ({ input }) => {
      await setTalentPartnerStatus(input.id, input.partnerStatus);
      return { success: true };
    })
  }),
  coordination: router({
    shortlistsForRequest: protectedProcedure.input(z3.object({ eventRequestId: z3.number().int().positive() })).query(async ({ ctx, input }) => {
      const request = await getRequestById(input.eventRequestId);
      if (!request || request.organizerId !== ctx.user.id && ctx.user.role !== "admin") {
        throw new TRPCError3({ code: "FORBIDDEN", message: "Cette mission n\u2019est pas accessible." });
      }
      return getShortlistsForRequest(input.eventRequestId);
    }),
    addShortlist: adminProcedure.input(z3.object({ eventRequestId: z3.number().int().positive(), talentProfileId: z3.number().int().positive(), coordinationNote: z3.string().max(1e3).optional() })).mutation(async ({ input }) => {
      const id = await addShortlist({ ...input, coordinationNote: input.coordinationNote || null });
      return { id };
    }),
    updateShortlist: adminProcedure.input(z3.object({ id: z3.number().int().positive(), status: z3.enum(["propose", "contacte", "preselectionne", "confirme", "retire"]) })).mutation(async ({ input }) => {
      await updateShortlistStatus(input.id, input.status);
      return { success: true };
    })
  }),
  legal: router({
    adminList: adminProcedure.query(() => getLegalGodmothersForAdmin()),
    create: adminProcedure.input(z3.object({
      displayName: z3.string().trim().min(2).max(180),
      professionalTitle: z3.string().trim().min(2).max(220),
      contactEmail: z3.string().email().max(320).optional().or(z3.literal("")),
      profileUrl: z3.string().url().max(500).optional().or(z3.literal("")),
      scope: z3.string().trim().min(20).max(3e3)
    })).mutation(async ({ input }) => {
      const id = await createLegalGodmother({
        ...input,
        contactEmail: input.contactEmail || null,
        profileUrl: input.profileUrl || null,
        status: "proposee"
      });
      return { id, status: "proposee" };
    }),
    updateStatus: adminProcedure.input(z3.object({
      id: z3.number().int().positive(),
      status: z3.enum(["proposee", "en_discussion", "validation_demandee", "validee", "suspendue"]),
      writtenValidationReference: z3.string().trim().max(500).optional().or(z3.literal(""))
    })).mutation(async ({ input }) => {
      if (input.status === "validee" && !input.writtenValidationReference?.trim()) {
        throw new TRPCError3({ code: "BAD_REQUEST", message: "Une r\xE9f\xE9rence de validation \xE9crite est requise avant de d\xE9clarer la marraine valid\xE9e." });
      }
      await updateLegalGodmotherStatus(input.id, input.status, input.writtenValidationReference || null);
      return { success: true };
    })
  }),
  missionSheets: router({
    forRequest: protectedProcedure.input(z3.object({ eventRequestId: z3.number().int().positive() })).query(async ({ ctx, input }) => {
      const request = await getRequestById(input.eventRequestId);
      if (!request || request.organizerId !== ctx.user.id && ctx.user.role !== "admin") {
        throw new TRPCError3({ code: "FORBIDDEN", message: "Cette mission n\u2019est pas accessible." });
      }
      return getMissionSheetsForRequest(input.eventRequestId);
    }),
    create: adminProcedure.input(z3.object({
      eventRequestId: z3.number().int().positive(),
      talentProfileId: z3.number().int().positive(),
      legalGodmotherId: z3.number().int().positive().optional().nullable(),
      title: z3.string().trim().min(5).max(240),
      missionDescription: z3.string().trim().min(20).max(5e3),
      workDate: z3.string().trim().min(2).max(32),
      location: z3.string().trim().min(2).max(240),
      schedule: z3.string().trim().max(160).optional(),
      remunerationCents: z3.number().int().positive().max(1e8),
      organizerConsent: z3.boolean().default(false),
      talentConsent: z3.boolean().default(false)
    })).mutation(async ({ ctx, input }) => {
      const request = await getRequestById(input.eventRequestId);
      if (!request) throw new TRPCError3({ code: "NOT_FOUND", message: "Demande introuvable." });
      const talent = await getTalentProfileById(input.talentProfileId);
      if (!talent) throw new TRPCError3({ code: "NOT_FOUND", message: "Talent introuvable." });
      const partnerConsentStatus = talent.accessPath === "independant" ? "non_requis" : "attendu";
      const generatedStatus = missionSheetStatusFor({
        organizerConsent: input.organizerConsent,
        talentConsent: input.talentConsent,
        partnerConsentStatus,
        hasLegalGodmother: Boolean(input.legalGodmotherId)
      });
      const missionSheetId = await createMissionSheet({
        ...input,
        schedule: input.schedule || null,
        legalGodmotherId: input.legalGodmotherId ?? null,
        status: generatedStatus,
        partnerConsentStatus,
        partnerConsent: false,
        consentedAt: generatedStatus === "en_relecture_juridique" ? /* @__PURE__ */ new Date() : null,
        legalReviewStatus: input.legalGodmotherId ? "en_attente" : "non_soumis",
        createdBy: ctx.user.id
      });
      const documentId = await createMissionDocument({
        eventRequestId: input.eventRequestId,
        missionSheetId,
        type: "fiche_mission",
        reference: `FM-${(/* @__PURE__ */ new Date()).getFullYear()}-${String(missionSheetId).padStart(5, "0")}`,
        status: "brouillon",
        amountCents: input.remunerationCents,
        createdBy: ctx.user.id
      });
      return { missionSheetId, documentId, status: generatedStatus };
    }),
    update: adminProcedure.input(z3.object({
      id: z3.number().int().positive(),
      status: missionSheetStatusSchema.optional(),
      legalReviewStatus: legalReviewStatusSchema.optional(),
      talentConsent: z3.boolean().optional(),
      organizerConsent: z3.boolean().optional(),
      partnerConsentStatus: z3.enum(["non_requis", "attendu", "recu"]).optional()
    })).mutation(async ({ input }) => {
      const { id, ...values } = input;
      const existing = await getMissionSheetById(id);
      if (!existing) throw new TRPCError3({ code: "NOT_FOUND", message: "Fiche de mission introuvable." });
      const talent = await getTalentProfileById(existing.talentProfileId);
      if (!talent) throw new TRPCError3({ code: "NOT_FOUND", message: "Talent de la fiche introuvable." });
      const partnerConsentStatus = talent.accessPath === "independant" ? "non_requis" : values.partnerConsentStatus ?? existing.partnerConsentStatus;
      if (talent.accessPath === "accompagne" && partnerConsentStatus === "non_requis") {
        throw new TRPCError3({ code: "BAD_REQUEST", message: "Une structure accompagnante doit \xEAtre consult\xE9e et son accord doit \xEAtre trac\xE9." });
      }
      const consented = (values.talentConsent ?? existing.talentConsent) && (values.organizerConsent ?? existing.organizerConsent) && partnerConsentStatus !== "attendu";
      const computedStatus = missionSheetStatusFor({
        organizerConsent: Boolean(values.organizerConsent ?? existing.organizerConsent),
        talentConsent: Boolean(values.talentConsent ?? existing.talentConsent),
        partnerConsentStatus,
        hasLegalGodmother: Boolean(existing.legalGodmotherId)
      });
      if (values.status === "en_relecture_juridique" && computedStatus !== "en_relecture_juridique") {
        throw new TRPCError3({ code: "BAD_REQUEST", message: "La fiche doit avoir les consentements document\xE9s et une marraine juridique associ\xE9e avant relecture." });
      }
      await updateMissionSheet(id, { ...values, partnerConsentStatus, partnerConsent: partnerConsentStatus === "recu", ...consented ? { consentedAt: /* @__PURE__ */ new Date() } : { consentedAt: null }, ...values.status ? {} : { status: computedStatus } });
      return { success: true };
    })
  }),
  documents: router({
    forRequest: protectedProcedure.input(z3.object({ eventRequestId: z3.number().int().positive() })).query(async ({ ctx, input }) => {
      const request = await getRequestById(input.eventRequestId);
      if (!request || request.organizerId !== ctx.user.id && ctx.user.role !== "admin") {
        throw new TRPCError3({ code: "FORBIDDEN", message: "Ces documents ne sont pas accessibles." });
      }
      return getDocumentsForRequest(input.eventRequestId);
    }),
    create: adminProcedure.input(z3.object({
      eventRequestId: z3.number().int().positive(),
      missionSheetId: z3.number().int().positive().optional().nullable(),
      type: documentTypeSchema,
      reference: z3.string().trim().min(3).max(80),
      amountCents: z3.number().int().positive().max(1e8),
      status: documentStatusSchema.default("brouillon")
    })).mutation(async ({ ctx, input }) => {
      const id = await createMissionDocument({ ...input, missionSheetId: input.missionSheetId ?? null, createdBy: ctx.user.id, issuedAt: input.status === "emis" ? /* @__PURE__ */ new Date() : null });
      return { id };
    }),
    updateStatus: adminProcedure.input(z3.object({ id: z3.number().int().positive(), status: documentStatusSchema })).mutation(async ({ input }) => {
      const { getDb: getDb2 } = await Promise.resolve().then(() => (init_db(), db_exports));
      const database = await getDb2();
      if (!database) throw new TRPCError3({ code: "INTERNAL_SERVER_ERROR", message: "La base de donn\xE9es est indisponible." });
      await database.update(missionDocuments).set({ status: input.status, issuedAt: input.status === "emis" ? /* @__PURE__ */ new Date() : void 0 }).where(eq2(missionDocuments.id, input.id));
      return { success: true };
    })
  }),
  payments: router({
    forRequest: protectedProcedure.input(z3.object({ eventRequestId: z3.number().int().positive() })).query(async ({ ctx, input }) => {
      const request = await getRequestById(input.eventRequestId);
      if (!request || request.organizerId !== ctx.user.id && ctx.user.role !== "admin") {
        throw new TRPCError3({ code: "FORBIDDEN", message: "Ces informations de paiement ne sont pas accessibles." });
      }
      return getPaymentRecordsForRequest(input.eventRequestId);
    }),
    adminList: adminProcedure.query(() => getPaymentRecordsForAdmin()),
    create: adminProcedure.input(z3.object({
      eventRequestId: z3.number().int().positive(),
      missionSheetId: z3.number().int().positive().optional().nullable(),
      documentId: z3.number().int().positive().optional().nullable(),
      paymentType: paymentTypeSchema,
      amountCents: z3.number().int().positive().max(1e8),
      notes: z3.string().trim().max(2e3).optional()
    })).mutation(async ({ ctx, input }) => {
      const id = await createPaymentRecord({ ...input, missionSheetId: input.missionSheetId ?? null, documentId: input.documentId ?? null, notes: input.notes || null, createdBy: ctx.user.id });
      return { id, status: "a_preparer", provider: "revolut_business" };
    }),
    updateStatus: adminProcedure.input(z3.object({
      id: z3.number().int().positive(),
      status: paymentStatusSchema,
      externalReference: z3.string().trim().max(180).optional(),
      notes: z3.string().trim().max(2e3).optional()
    })).mutation(async ({ ctx, input }) => {
      await updatePaymentRecord(input.id, { status: input.status, externalReference: input.externalReference || null, notes: input.notes || null, approvedBy: ["autorise", "envoye", "rapproche"].includes(input.status) ? ctx.user.id : void 0, paidAt: input.status === "rapproche" ? /* @__PURE__ */ new Date() : void 0 });
      return { success: true };
    })
  }),
  partners: router({
    submit: publicProcedure.input(z3.object({
      organisationName: z3.string().trim().min(2).max(220),
      contactName: z3.string().trim().min(2).max(160),
      contactEmail: z3.string().email().max(320),
      website: z3.string().url().max(500).optional().or(z3.literal("")),
      supportFramework: z3.string().trim().min(30).max(4e3)
    })).mutation(async ({ input }) => {
      const id = await createPartnerApplication({ ...input, website: input.website || null });
      return { id, status: "en_echange" };
    }),
    adminList: adminProcedure.query(() => getPartnerApplicationsForAdmin()),
    updateStatus: adminProcedure.input(z3.object({ id: z3.number().int().positive(), status: z3.enum(["en_echange", "valide", "suspendu"]) })).mutation(async ({ input }) => {
      await updatePartnerApplicationStatus(input.id, input.status);
      return { success: true };
    })
  }),
  reports: router({
    create: publicProcedure.input(z3.object({
      category: z3.enum(["securite", "remuneration", "confidentialite", "comportement", "autre"]),
      relatedRequestId: z3.number().int().positive().optional(),
      contactEmail: z3.string().email().max(320).optional().or(z3.literal("")),
      message: z3.string().trim().min(20).max(5e3)
    })).mutation(async ({ ctx, input }) => {
      const id = await createIssueReport({
        reporterId: ctx.user?.id ?? null,
        category: input.category,
        relatedRequestId: input.relatedRequestId ?? null,
        contactEmail: input.contactEmail || null,
        message: input.message
      });
      return { id, status: "recu" };
    }),
    adminList: adminProcedure.query(() => getIssueReportsForAdmin()),
    updateStatus: adminProcedure.input(z3.object({ id: z3.number().int().positive(), status: z3.enum(["recu", "en_cours", "clos"]) })).mutation(async ({ input }) => {
      await updateIssueReportStatus(input.id, input.status);
      return { success: true };
    })
  })
});

// server/_core/context.ts
async function createContext(opts) {
  let user = null;
  try {
    user = await sdk.authenticateRequest(opts.req);
  } catch (error) {
    user = null;
  }
  return {
    req: opts.req,
    res: opts.res,
    user
  };
}

// server/_core/vite.ts
import express from "express";
import fs2 from "fs";
import { nanoid } from "nanoid";
import path2 from "path";
import { createServer as createViteServer } from "vite";

// vite.config.ts
import { jsxLocPlugin } from "@builder.io/vite-plugin-jsx-loc";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "node:path";
import { defineConfig } from "vite";
import { vitePluginManusRuntime } from "vite-plugin-manus-runtime";
var PROJECT_ROOT = import.meta.dirname;
var LOG_DIR = path.join(PROJECT_ROOT, ".manus-logs");
var MAX_LOG_SIZE_BYTES = 1 * 1024 * 1024;
var TRIM_TARGET_BYTES = Math.floor(MAX_LOG_SIZE_BYTES * 0.6);
function ensureLogDir() {
  if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR, { recursive: true });
  }
}
function trimLogFile(logPath, maxSize) {
  try {
    if (!fs.existsSync(logPath) || fs.statSync(logPath).size <= maxSize) {
      return;
    }
    const lines = fs.readFileSync(logPath, "utf-8").split("\n");
    const keptLines = [];
    let keptBytes = 0;
    const targetSize = TRIM_TARGET_BYTES;
    for (let i = lines.length - 1; i >= 0; i--) {
      const lineBytes = Buffer.byteLength(`${lines[i]}
`, "utf-8");
      if (keptBytes + lineBytes > targetSize) break;
      keptLines.unshift(lines[i]);
      keptBytes += lineBytes;
    }
    fs.writeFileSync(logPath, keptLines.join("\n"), "utf-8");
  } catch {
  }
}
function writeToLogFile(source, entries) {
  if (entries.length === 0) return;
  ensureLogDir();
  const logPath = path.join(LOG_DIR, `${source}.log`);
  const lines = entries.map((entry) => {
    const ts = (/* @__PURE__ */ new Date()).toISOString();
    return `[${ts}] ${JSON.stringify(entry)}`;
  });
  fs.appendFileSync(logPath, `${lines.join("\n")}
`, "utf-8");
  trimLogFile(logPath, MAX_LOG_SIZE_BYTES);
}
function vitePluginManusDebugCollector() {
  return {
    name: "manus-debug-collector",
    transformIndexHtml(html) {
      if (process.env.NODE_ENV === "production") {
        return html;
      }
      return {
        html,
        tags: [
          {
            tag: "script",
            attrs: {
              src: "/__manus__/debug-collector.js",
              defer: true
            },
            injectTo: "head"
          }
        ]
      };
    },
    configureServer(server) {
      server.middlewares.use("/__manus__/logs", (req, res, next) => {
        if (req.method !== "POST") {
          return next();
        }
        const handlePayload = (payload) => {
          if (payload.consoleLogs?.length > 0) {
            writeToLogFile("browserConsole", payload.consoleLogs);
          }
          if (payload.networkRequests?.length > 0) {
            writeToLogFile("networkRequests", payload.networkRequests);
          }
          if (payload.sessionEvents?.length > 0) {
            writeToLogFile("sessionReplay", payload.sessionEvents);
          }
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ success: true }));
        };
        const reqBody = req.body;
        if (reqBody && typeof reqBody === "object") {
          try {
            handlePayload(reqBody);
          } catch (e) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: false, error: String(e) }));
          }
          return;
        }
        let body = "";
        req.on("data", (chunk) => {
          body += chunk.toString();
        });
        req.on("end", () => {
          try {
            const payload = JSON.parse(body);
            handlePayload(payload);
          } catch (e) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: false, error: String(e) }));
          }
        });
      });
    }
  };
}
var plugins = [react(), tailwindcss(), jsxLocPlugin(), vitePluginManusRuntime(), vitePluginManusDebugCollector()];
var vite_config_default = defineConfig({
  plugins,
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  envDir: path.resolve(import.meta.dirname),
  root: path.resolve(import.meta.dirname, "client"),
  publicDir: path.resolve(import.meta.dirname, "client", "public"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    host: true,
    allowedHosts: [
      ".manuspre.computer",
      ".manus.computer",
      ".manus-asia.computer",
      ".manuscomputer.ai",
      ".manusvm.computer",
      "localhost",
      "127.0.0.1"
    ],
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/_core/vite.ts
async function setupVite(app, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    server: serverOptions,
    appType: "custom"
  });
  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "../..",
        "client",
        "index.html"
      );
      let template = await fs2.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app) {
  const distPath = process.env.NODE_ENV === "development" ? path2.resolve(import.meta.dirname, "../..", "dist", "public") : path2.resolve(import.meta.dirname, "public");
  if (!fs2.existsSync(distPath)) {
    console.error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app.use(express.static(distPath));
  app.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/_core/index.ts
function isPortAvailable(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}
async function findAvailablePort(startPort = 3e3) {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}
async function startServer() {
  const app = express2();
  const server = createServer(app);
  app.use(express2.json({ limit: "50mb" }));
  app.use(express2.urlencoded({ limit: "50mb", extended: true }));
  registerStorageProxy(app);
  registerOAuthRoutes(app);
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext
    })
  );
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);
  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }
  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}
startServer().catch(console.error);
