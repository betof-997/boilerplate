import * as s from 'drizzle-orm/sqlite-core';
import * as u from './utils';

export const addressTypes = ['organization'] as const;
export const addressType = s.text({
	enum: addressTypes,
});

export const addressTable = s.sqliteTable('address', {
	id: u.idColumn(),

	type: addressType.notNull(),
	addressLine1: s.text().notNull(),
	addressLine2: s.text().notNull(),
	city: s.text().notNull(),
	state: s.text().notNull(),
	country: s.text().notNull(),
	zip: s.text().notNull(),

	organizationId: s.text(),

	createdAt: u.createdAtColumn(),
	updatedAt: u.updatedAtColumn(),
});
