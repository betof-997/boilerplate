import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { betterAuth } from 'better-auth';
import { tanstackStartCookies } from 'better-auth/tanstack-start';
import { db } from '@/db/client';
import {
	accountTable,
	sessionTable,
	userTable,
	verificationTable,
} from '@/db/tables';
import { envServer } from '@/lib/env/envServer';

export const auth = betterAuth({
	baseURL: envServer.BETTER_AUTH_URL,
	secret: envServer.BETTER_AUTH_SECRET,
	database: drizzleAdapter(db, {
		provider: 'sqlite',
		schema: {
			user: userTable,
			account: accountTable,
			session: sessionTable,
			verification: verificationTable,
		},
	}),
	socialProviders: {
		google: {
			clientId: envServer.GOOGLE_CLIENT_ID,
			clientSecret: envServer.GOOGLE_CLIENT_SECRET,
		},
	},
	plugins: [tanstackStartCookies()],
	user: {
		deleteUser: {
			enabled: true,
		},
	},
});
