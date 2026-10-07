CREATE TABLE `legalGodmothers` (
	`id` int AUTO_INCREMENT NOT NULL,
	`displayName` varchar(180) NOT NULL,
	`professionalTitle` varchar(220) NOT NULL,
	`contactEmail` varchar(320),
	`profileUrl` varchar(500),
	`scope` text NOT NULL,
	`status` enum('proposee','en_discussion','validation_demandee','validee','suspendue') NOT NULL DEFAULT 'proposee',
	`writtenValidationReference` varchar(500),
	`validatedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `legalGodmothers_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `missionDocuments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`eventRequestId` int NOT NULL,
	`missionSheetId` int,
	`type` enum('devis','fiche_mission','facture') NOT NULL,
	`reference` varchar(80) NOT NULL,
	`status` enum('brouillon','emis','valide','annule') NOT NULL DEFAULT 'brouillon',
	`amountCents` int NOT NULL,
	`fileUrl` varchar(700),
	`issuedAt` timestamp,
	`createdBy` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `missionDocuments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `missionSheets` (
	`id` int AUTO_INCREMENT NOT NULL,
	`eventRequestId` int NOT NULL,
	`talentProfileId` int NOT NULL,
	`legalGodmotherId` int,
	`title` varchar(240) NOT NULL,
	`missionDescription` text NOT NULL,
	`workDate` varchar(32) NOT NULL,
	`location` varchar(240) NOT NULL,
	`schedule` varchar(160),
	`remunerationCents` int NOT NULL,
	`status` enum('brouillon','consentements_attendus','en_relecture_juridique','validee','annulee') NOT NULL DEFAULT 'brouillon',
	`talentConsent` boolean NOT NULL DEFAULT false,
	`organizerConsent` boolean NOT NULL DEFAULT false,
	`partnerConsent` boolean NOT NULL DEFAULT false,
	`consentedAt` timestamp,
	`legalReviewStatus` enum('non_soumis','en_attente','valide','a_revoir') NOT NULL DEFAULT 'non_soumis',
	`createdBy` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `missionSheets_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `paymentRecords` (
	`id` int AUTO_INCREMENT NOT NULL,
	`eventRequestId` int NOT NULL,
	`missionSheetId` int,
	`documentId` int,
	`provider` enum('revolut_business') NOT NULL DEFAULT 'revolut_business',
	`paymentType` enum('coordination','talent','remboursement','autre') NOT NULL,
	`amountCents` int NOT NULL,
	`status` enum('a_preparer','a_valider','autorise','envoye','rapproche','echoue','annule') NOT NULL DEFAULT 'a_preparer',
	`externalReference` varchar(180),
	`notes` text,
	`approvedBy` int,
	`paidAt` timestamp,
	`createdBy` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `paymentRecords_id` PRIMARY KEY(`id`)
);
