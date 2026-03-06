import * as s from 'drizzle-orm/sqlite-core';
import * as u from './utils';

export const verificationTable = s.sqliteTable(
	'verification',
	{
		id: u.idColumn(),

		identifier: s.text('identifier').notNull(),
		value: s.text('value').notNull(),
		expiresAt: s.integer('expires_at', { mode: 'timestamp_ms' }).notNull(),

		createdAt: u.createdAtColumn(),
		updatedAt: u.updatedAtColumn(),
	},
	(table) => [s.index('verification_identifier_idx').on(table.identifier)],
);
