import { defineRelations } from 'drizzle-orm';
import * as tables from './tables';

export const relations = defineRelations(tables, (r) => ({
	organizationTable: {
		clients: r.many.clientTable({
			from: r.organizationTable.id,
			to: r.clientTable.id,
		}),
		products: r.many.productTable({
			from: r.organizationTable.id,
			to: r.productTable.id,
		}),
		organizationMembers: r.many.organizationMemberTable({
			from: r.organizationTable.id.through(
				r.organizationMemberTable.organizationId,
			),
			to: r.organizationMemberTable.id.through(
				r.organizationMemberTable.userId,
			),
		}),
		members: r.many.userTable({
			from: r.organizationTable.id,
			to: r.userTable.id,
		}),
	},
	userTable: {
		organizationMembers: r.many.organizationMemberTable(),
		organizations: r.many.organizationTable(),
	},
	organizationMemberTable: {
		user: r.one.userTable({
			from: r.organizationMemberTable.userId,
			to: r.userTable.id,
		}),
		organization: r.one.organizationTable({
			from: r.organizationMemberTable.organizationId,
			to: r.organizationTable.id,
		}),
	},
}));
