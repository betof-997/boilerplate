import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createdAtColumn, idColumn, updatedAtColumn } from './utils';
import { userIdColumn } from './userTable';

export const productTable = sqliteTable('product', {
	id: idColumn(),
	name: text('name').notNull(),
	description: text('description').notNull(),
	price: integer('price').notNull(),
	userId: userIdColumn(),
	createdAt: createdAtColumn(),
	updatedAt: updatedAtColumn(),
});
