import { Sidebar } from '@/components/sidebar';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { AuthenticatedSidebar } from './-lib/components/authenticated-sidebar';
import { AccountDrawer } from '@/components/account-drawer';

export const Route = createFileRoute('/app/$organizationId')({
	beforeLoad: async ({ context: { organizations }, params }) => {
		if (organizations.length === 0) {
			throw redirect({ to: '/app/create-organization' });
		}

		const selectedOrganization = organizations.find(
			(organization) => organization.id === params.organizationId,
		);

		if (!selectedOrganization) {
			throw redirect({
				to: '/app/$organizationId',
				params: {
					organizationId: organizations[0].id,
				},
			});
		}

		return {
			selectedOrganization,
		};
	},
	component: OrganizationLayout,
});

function OrganizationLayout() {
	return (
		<Sidebar.Root>
			<AuthenticatedSidebar />

			<Outlet />
			<AccountDrawer />
		</Sidebar.Root>
	);
}
