import { defineRelations } from 'drizzle-orm';
import * as tables from './tables';

export const relations = defineRelations(tables, (r) => ({
	userTable: {
		clients: r.many.clientTable({
			from: r.userTable.id,
			to: r.clientTable.id,
		}),
		products: r.many.productTable({
			from: r.userTable.id,
			to: r.productTable.id,
		}),
	},
}));
