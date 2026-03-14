import { Sidebar } from '@/components/sidebar';
import { createFileRoute, Outlet } from '@tanstack/react-router';
import { AuthenticatedSidebar } from './-lib/components/authenticated-sidebar';
import { AccountDrawer } from '@/components/account-drawer';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getUserOrganizationsQueryOptions } from '@/query-options/organizationMemberQueryOptions';
import { useUser } from '../-lib/hooks/use-user';
import { useEffect } from 'react';

export const Route = createFileRoute('/app/$organizationId')({
	component: OrganizationLayout,
});

function OrganizationLayout() {
	const user = useUser();
	const navigate = Route.useNavigate();
	const params = Route.useParams();

	const { data: organizations } = useSuspenseQuery(
		getUserOrganizationsQueryOptions({
			userId: user.id,
		}),
	);

	useEffect(() => {
		if (organizations.length === 0) {
			navigate({ to: '/app/create-organization' });
			return;
		}

		const selectedOrganization = organizations.find(
			(organization) => organization.id === params.organizationId,
		);
		if (!selectedOrganization) {
			navigate({
				to: '/app/$organizationId',
				params: { organizationId: organizations[0].id },
			});
			return;
		}
	}, [organizations, navigate, params.organizationId]);

	return (
		<Sidebar.Root>
			<AuthenticatedSidebar />

			<Outlet />
			<AccountDrawer />
		</Sidebar.Root>
	);
}
