import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/app/')({
	beforeLoad: async ({ context: { organizations } }) => {
		if (organizations.length === 0) {
			throw redirect({ to: '/app/create-organization' });
		}

		throw redirect({
			to: '/app/$organizationId',
			params: { organizationId: organizations[0].id },
		});
	},
});
