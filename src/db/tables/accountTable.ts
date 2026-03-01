import { index, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { userIdColumn } from './userTable';
import { createdAtColumn, idColumn, updatedAtColumn } from './utils';

export const accountTable = sqliteTable(
	'account',
	{
		id: idColumn(),
		accountId: text('account_id').notNull(),
		providerId: text('provider_id').notNull(),
		userId: userIdColumn(),
		accessToken: text('access_token'),
		refreshToken: text('refresh_token'),
		idToken: text('id_token'),
		accessTokenExpiresAt: integer('access_token_expires_at', {
			mode: 'timestamp_ms',
		}),
		refreshTokenExpiresAt: integer('refresh_token_expires_at', {
			mode: 'timestamp_ms',
		}),
		scope: text('scope'),
		password: text('password'),
		createdAt: createdAtColumn(),
		updatedAt: updatedAtColumn(),
	},
	(table) => [index('account_userId_idx').on(table.userId)],
);
