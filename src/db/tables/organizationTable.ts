import * as s from 'drizzle-orm/sqlite-core';
import * as u from './utils';

export const organizationTable = s.sqliteTable('organization', {
	id: u.idColumn(),

	name: s.text().notNull(),

	createdAt: u.createdAtColumn(),
	updatedAt: u.updatedAtColumn(),
});

export const organizationIdColumn = () =>
	s
		.text()
		.notNull()
		.references(() => organizationTable.id, { onDelete: 'cascade' });
