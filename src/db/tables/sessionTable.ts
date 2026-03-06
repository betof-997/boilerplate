import * as s from 'drizzle-orm/sqlite-core';
import * as u from './utils';
import { userIdColumn } from './userTable';

export const sessionTable = s.sqliteTable(
	'session',
	{
		id: u.idColumn(),

		expiresAt: s.integer('expires_at', { mode: 'timestamp_ms' }).notNull(),
		token: s.text('token').notNull().unique(),
		ipAddress: s.text('ip_address'),
		userAgent: s.text('user_agent'),

		userId: userIdColumn(),
		createdAt: u.createdAtColumn(),
		updatedAt: u.updatedAtColumn(),
	},
	(table) => [s.index('session_userId_idx').on(table.userId)],
);
