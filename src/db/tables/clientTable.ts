import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createdAtColumn, idColumn, updatedAtColumn } from './utils';
import { userIdColumn } from './userTable';

export const clientTable = sqliteTable('client', {
	id: idColumn(),
	name: text('name').notNull(),
	email: text('email').notNull().unique(),
	userId: userIdColumn(),
	createdAt: createdAtColumn(),
	updatedAt: updatedAtColumn(),
});
