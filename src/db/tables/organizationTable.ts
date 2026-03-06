import * as s from 'drizzle-orm/sqlite-core';
import * as u from './utils';

export const organizationTable = s.sqliteTable('organization', {
	id: u.idColumn(),

	name: s.text('name').notNull(),

	createdAt: u.createdAtColumn(),
	updatedAt: u.updatedAtColumn(),
});
