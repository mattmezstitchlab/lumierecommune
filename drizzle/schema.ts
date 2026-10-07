import {
  boolean,
  int,
  mysqlEnum,
  mysqlTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

/** Core user table backing the Manus OAuth flow. */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export const eventRequests = mysqlTable("eventRequests", {
  id: int("id").autoincrement().primaryKey(),
  organizerId: int("organizerId").notNull(),
  eventType: mysqlEnum("eventType", ["mariage", "prive", "entreprise", "culture", "autre"])
    .notNull(),
  eventDate: varchar("eventDate", { length: 32 }).notNull(),
  city: varchar("city", { length: 160 }).notNull(),
  venue: varchar("venue", { length: 240 }),
  guestCount: int("guestCount"),
  budgetCents: int("budgetCents").notNull(),
  needs: text("needs").notNull(),
  contactName: varchar("contactName", { length: 160 }).notNull(),
  contactEmail: varchar("contactEmail", { length: 320 }).notNull(),
  contactPhone: varchar("contactPhone", { length: 48 }),
  status: mysqlEnum("status", ["nouvelle", "qualification", "preselection", "confirmee", "cloturee"])
    .default("nouvelle")
    .notNull(),
  coordinationFeeCents: int("coordinationFeeCents").default(18000).notNull(),
  solidarityContributionCents: int("solidarityContributionCents").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const talentProfiles = mysqlTable("talentProfiles", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().unique(),
  professionalName: varchar("professionalName", { length: 160 }).notNull(),
  headline: varchar("headline", { length: 220 }).notNull(),
  city: varchar("city", { length: 160 }).notNull(),
  region: varchar("region", { length: 160 }).notNull(),
  category: mysqlEnum("category", ["accueil", "service", "animation", "technique", "art", "logistique"])
    .notNull(),
  skills: text("skills").notNull(),
  bio: text("bio").notNull(),
  accessPath: mysqlEnum("accessPath", ["independant", "accompagne"]).default("independant").notNull(),
  partnerStatus: mysqlEnum("partnerStatus", ["non_requis", "en_attente", "valide"])
    .default("non_requis")
    .notNull(),
  approvalStatus: mysqlEnum("approvalStatus", ["en_attente", "approuve", "suspendu"])
    .default("en_attente")
    .notNull(),
  consentPublic: boolean("consentPublic").default(false).notNull(),
  consentedAt: timestamp("consentedAt"),
  isOpenToMissions: boolean("isOpenToMissions").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const talentAvailabilities = mysqlTable("talentAvailabilities", {
  id: int("id").autoincrement().primaryKey(),
  talentProfileId: int("talentProfileId").notNull(),
  availableFrom: varchar("availableFrom", { length: 32 }),
  availableTo: varchar("availableTo", { length: 32 }),
  note: varchar("note", { length: 320 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const requestShortlists = mysqlTable("requestShortlists", {
  id: int("id").autoincrement().primaryKey(),
  eventRequestId: int("eventRequestId").notNull(),
  talentProfileId: int("talentProfileId").notNull(),
  status: mysqlEnum("status", ["propose", "contacte", "preselectionne", "confirme", "retire"])
    .default("propose")
    .notNull(),
  coordinationNote: text("coordinationNote"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const partnerApplications = mysqlTable("partnerApplications", {
  id: int("id").autoincrement().primaryKey(),
  organisationName: varchar("organisationName", { length: 220 }).notNull(),
  contactName: varchar("contactName", { length: 160 }).notNull(),
  contactEmail: varchar("contactEmail", { length: 320 }).notNull(),
  website: varchar("website", { length: 500 }),
  supportFramework: text("supportFramework").notNull(),
  status: mysqlEnum("status", ["en_echange", "valide", "suspendu"]).default("en_echange").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const issueReports = mysqlTable("issueReports", {
  id: int("id").autoincrement().primaryKey(),
  reporterId: int("reporterId"),
  category: mysqlEnum("category", ["securite", "remuneration", "confidentialite", "comportement", "autre"])
    .notNull(),
  relatedRequestId: int("relatedRequestId"),
  contactEmail: varchar("contactEmail", { length: 320 }),
  message: text("message").notNull(),
  status: mysqlEnum("status", ["recu", "en_cours", "clos"]).default("recu").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

/** Legal oversight is explicit and remains non-public until written validation. */
export const legalGodmothers = mysqlTable("legalGodmothers", {
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
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const missionSheets = mysqlTable("missionSheets", {
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
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const missionDocuments = mysqlTable("missionDocuments", {
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
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const paymentRecords = mysqlTable("paymentRecords", {
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
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
