import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createdAtColumn, idColumn, updatedAtColumn } from './utils';

export const userTable = sqliteTable('user', {
	id: idColumn(),
	name: text('name').notNull(),
	email: text('email').notNull().unique(),
	emailVerified: integer('email_verified', { mode: 'boolean' })
		.notNull()
		.default(false),
	image: text('image'),
	createdAt: createdAtColumn(),
	updatedAt: updatedAtColumn(),
});

export const userIdColumn = () =>
	text('user_id')
		.notNull()
		.references(() => userTable.id, { onDelete: 'cascade' });
