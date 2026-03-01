import { index, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createdAtColumn, idColumn, updatedAtColumn } from './utils';

export const verificationTable = sqliteTable(
	'verification',
	{
		id: idColumn(),
		identifier: text('identifier').notNull(),
		value: text('value').notNull(),
		expiresAt: integer('expires_at', { mode: 'timestamp_ms' }).notNull(),
		createdAt: createdAtColumn(),
		updatedAt: updatedAtColumn(),
	},
	(table) => [index('verification_identifier_idx').on(table.identifier)],
);
