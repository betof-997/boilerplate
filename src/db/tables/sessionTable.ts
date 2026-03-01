import { index, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { userIdColumn } from './userTable';
import { createdAtColumn, idColumn, updatedAtColumn } from './utils';

export const sessionTable = sqliteTable(
	'session',
	{
		id: idColumn(),
		expiresAt: integer('expires_at', { mode: 'timestamp_ms' }).notNull(),
		token: text('token').notNull().unique(),
		ipAddress: text('ip_address'),
		userAgent: text('user_agent'),
		userId: userIdColumn(),
		createdAt: createdAtColumn(),
		updatedAt: updatedAtColumn(),
	},
	(table) => [index('session_userId_idx').on(table.userId)],
);
