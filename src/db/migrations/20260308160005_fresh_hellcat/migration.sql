CREATE TABLE `address` (
	`id` text PRIMARY KEY,
	`type` text NOT NULL,
	`addressLine1` text NOT NULL,
	`addressLine2` text NOT NULL,
	`city` text NOT NULL,
	`state` text NOT NULL,
	`country` text NOT NULL,
	`zip` text NOT NULL,
	`organizationId` text,
	`createdAt` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updatedAt` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL
);
--> statement-breakpoint
ALTER TABLE `organization` ADD `email` text NOT NULL;--> statement-breakpoint
ALTER TABLE `organization` ADD `currentInvoiceNumber` integer NOT NULL;