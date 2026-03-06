import * as s from 'drizzle-orm/sqlite-core';
import * as u from './utils';
import { userIdColumn } from './userTable';
import { organizationIdColumn } from './organizationTable';

export const organizationUserTable = s.sqliteTable('organization_user', {
	id: u.idColumn(),

	userId: userIdColumn(),
	organizationId: organizationIdColumn(),
	createdAt: u.createdAtColumn(),
	updatedAt: u.updatedAtColumn(),
});
