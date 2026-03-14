import { authSessionQueryOptions } from '@/lib/auth/authServer';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useUser = () => {
	const { data: session } = useSuspenseQuery(authSessionQueryOptions);

	if (!session?.user) {
		throw new Error('User not found in useUser hook');
	}

	return session.user;
};
