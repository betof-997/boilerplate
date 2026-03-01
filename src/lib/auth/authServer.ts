import { createServerFn } from '@tanstack/react-start';
import { getRequestHeaders } from '@tanstack/react-start/server';
import { auth } from './auth';

export const getSession = createServerFn({ method: 'GET' }).handler(
	async () => {
		const headers = getRequestHeaders();
		return auth.api.getSession({ headers });
	},
);

const authSessionQueryKey = ['auth', 'session'] as const;
export const authSessionQueryOptions = {
	queryKey: authSessionQueryKey,
	queryFn: () => getSession(),
	staleTime: 30_000, // 30 seconds
	gcTime: 5 * 60_000, // 5 minutes
};

export const ensureSession = createServerFn({ method: 'GET' }).handler(
	async () => {
		const headers = getRequestHeaders();
		const session = await auth.api.getSession({ headers });

		if (!session) {
			throw new Error('Unauthorized');
		}

		return session;
	},
);
