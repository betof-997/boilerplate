import { sql } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';
import { integer, text } from 'drizzle-orm/sqlite-core';

export const idColumn = () =>
	text('id')
		.primaryKey()
		.$defaultFn(() => uuidv4())
		.notNull();

export const createdAtColumn = () =>
	integer('created_at', { mode: 'timestamp_ms' })
		.notNull()
		.default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`);

export const updatedAtColumn = () =>
	integer('updated_at', { mode: 'timestamp_ms' })
		.notNull()
		.default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
		.$onUpdate(() => new Date());
