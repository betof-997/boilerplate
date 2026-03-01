import { drizzle } from 'drizzle-orm/libsql';
import { envServer } from '@/lib/env/envServer';
import { relations } from './relations';

export const db = drizzle({
	connection: {
		url: envServer.TURSO_DATABASE_URL,
		authToken: envServer.TURSO_AUTH_TOKEN,
	},
	relations,
});
