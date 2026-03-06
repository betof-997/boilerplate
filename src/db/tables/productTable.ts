import * as s from 'drizzle-orm/sqlite-core';
import * as u from './utils';
import { organizationIdColumn } from './organizationTable';

export const productTable = s.sqliteTable('product', {
	id: u.idColumn(),

	name: s.text().notNull(),
	description: s.text().notNull(),
	price: s.integer().notNull(),

	organizationId: organizationIdColumn(),
	createdAt: u.createdAtColumn(),
	updatedAt: u.updatedAtColumn(),
});
