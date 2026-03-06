import * as s from 'drizzle-orm/sqlite-core';
import * as u from './utils';
import { userIdColumn } from './userTable';
import { organizationIdColumn } from './organizationTable';

export const organizationMemberRoles = ['admin', 'member'] as const;

export const organizationMemberRole = s.text({
	enum: organizationMemberRoles,
});

export const organizationMemberTable = s.sqliteTable('organization_member', {
	id: u.idColumn(),

	userId: userIdColumn(),
	organizationId: organizationIdColumn(),
	role: organizationMemberRole.notNull(),

	createdAt: u.createdAtColumn(),
	updatedAt: u.updatedAtColumn(),
});
