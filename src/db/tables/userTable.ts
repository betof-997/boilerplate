import * as s from 'drizzle-orm/sqlite-core';
import * as u from './utils';

export const userTable = s.sqliteTable('user', {
	id: u.idColumn(),

	name: s.text('name').notNull(),
	email: s.text('email').notNull().unique(),
	emailVerified: s
		.integer('email_verified', { mode: 'boolean' })
		.notNull()
		.default(false),
	image: s.text('image'),

	createdAt: u.createdAtColumn(),
	updatedAt: u.updatedAtColumn(),
});

export const userIdColumn = () =>
	s
		.text('user_id')
		.notNull()
		.references(() => userTable.id, { onDelete: 'cascade' });
