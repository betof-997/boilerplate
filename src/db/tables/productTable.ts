import * as s from 'drizzle-orm/sqlite-core';
import * as u from './utils';
import { userIdColumn } from './userTable';

export const productTable = s.sqliteTable('product', {
	id: u.idColumn(),

	name: s.text().notNull(),
	description: s.text().notNull(),
	price: s.integer().notNull(),

	userId: userIdColumn(),
	createdAt: u.createdAtColumn(),
	updatedAt: u.updatedAtColumn(),
});
