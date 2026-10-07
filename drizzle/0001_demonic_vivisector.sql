CREATE TABLE `eventRequests` (
	`id` int AUTO_INCREMENT NOT NULL,
	`organizerId` int NOT NULL,
	`eventType` enum('mariage','prive','entreprise','culture','autre') NOT NULL,
	`eventDate` varchar(32) NOT NULL,
	`city` varchar(160) NOT NULL,
	`venue` varchar(240),
	`guestCount` int,
	`budgetCents` int NOT NULL,
	`needs` text NOT NULL,
	`contactName` varchar(160) NOT NULL,
	`contactEmail` varchar(320) NOT NULL,
	`contactPhone` varchar(48),
	`status` enum('nouvelle','qualification','preselection','confirmee','cloturee') NOT NULL DEFAULT 'nouvelle',
	`coordinationFeeCents` int NOT NULL DEFAULT 18000,
	`solidarityContributionCents` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `eventRequests_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `issueReports` (
	`id` int AUTO_INCREMENT NOT NULL,
	`reporterId` int,
	`category` enum('securite','remuneration','confidentialite','comportement','autre') NOT NULL,
	`relatedRequestId` int,
	`contactEmail` varchar(320),
	`message` text NOT NULL,
	`status` enum('recu','en_cours','clos') NOT NULL DEFAULT 'recu',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `issueReports_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `partnerApplications` (
	`id` int AUTO_INCREMENT NOT NULL,
	`organisationName` varchar(220) NOT NULL,
	`contactName` varchar(160) NOT NULL,
	`contactEmail` varchar(320) NOT NULL,
	`website` varchar(500),
	`supportFramework` text NOT NULL,
	`status` enum('en_echange','valide','suspendu') NOT NULL DEFAULT 'en_echange',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `partnerApplications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `requestShortlists` (
	`id` int AUTO_INCREMENT NOT NULL,
	`eventRequestId` int NOT NULL,
	`talentProfileId` int NOT NULL,
	`status` enum('propose','contacte','preselectionne','confirme','retire') NOT NULL DEFAULT 'propose',
	`coordinationNote` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `requestShortlists_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `talentAvailabilities` (
	`id` int AUTO_INCREMENT NOT NULL,
	`talentProfileId` int NOT NULL,
	`availableFrom` varchar(32),
	`availableTo` varchar(32),
	`note` varchar(320),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `talentAvailabilities_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `talentProfiles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`professionalName` varchar(160) NOT NULL,
	`headline` varchar(220) NOT NULL,
	`city` varchar(160) NOT NULL,
	`region` varchar(160) NOT NULL,
	`category` enum('accueil','service','animation','technique','art','logistique') NOT NULL,
	`skills` text NOT NULL,
	`bio` text NOT NULL,
	`accessPath` enum('independant','accompagne') NOT NULL DEFAULT 'independant',
	`partnerStatus` enum('non_requis','en_attente','valide') NOT NULL DEFAULT 'non_requis',
	`approvalStatus` enum('en_attente','approuve','suspendu') NOT NULL DEFAULT 'en_attente',
	`consentPublic` boolean NOT NULL DEFAULT false,
	`consentedAt` timestamp,
	`isOpenToMissions` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `talentProfiles_id` PRIMARY KEY(`id`),
	CONSTRAINT `talentProfiles_userId_unique` UNIQUE(`userId`)
);
