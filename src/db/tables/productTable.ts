import * as s from 'drizzle-orm/sqlite-core';
import * as u from './utils';
import { userIdColumn } from './userTable';

export const productTable = s.sqliteTable('product', {
	id: u.idColumn(),

	name: s.text('name').notNull(),
	description: s.text('description').notNull(),
	price: s.integer('price').notNull(),

	userId: userIdColumn(),
	createdAt: u.createdAtColumn(),
	updatedAt: u.updatedAtColumn(),
});
