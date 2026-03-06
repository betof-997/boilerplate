import * as s from 'drizzle-orm/sqlite-core';
import * as u from './utils';
import { organizationIdColumn } from './organizationTable';

export const clientTable = s.sqliteTable('client', {
	id: u.idColumn(),

	name: s.text().notNull(),
	email: s.text().notNull().unique(),

	organizationId: organizationIdColumn(),
	createdAt: u.createdAtColumn(),
	updatedAt: u.updatedAtColumn(),
});
