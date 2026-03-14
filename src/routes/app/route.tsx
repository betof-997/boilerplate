import { authSessionQueryOptions } from '@/lib/auth/authServer';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { getUserOrganizationsQueryOptions } from '@/query-options/organizationMemberQueryOptions';

export const Route = createFileRoute('/app')({
	beforeLoad: async ({ context }) => {
		const session = await context.queryClient.ensureQueryData(
			authSessionQueryOptions,
		);

		if (!session) {
			throw redirect({ to: '/' });
		}

		context.queryClient.prefetchQuery(
			getUserOrganizationsQueryOptions({
				userId: session.user.id,
			}),
		);
	},
});
