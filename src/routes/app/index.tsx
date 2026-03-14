import { getUserOrganizationsQueryOptions } from '@/query-options/organizationMemberQueryOptions';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useUser } from './-lib/hooks/use-user';
import { Fragment, useEffect } from 'react';

export const Route = createFileRoute('/app/')({
	component: RouteComponent,
});

function RouteComponent() {
	const user = useUser();
	const navigate = Route.useNavigate();

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

		navigate({
			to: '/app/$organizationId',
			params: { organizationId: organizations[0].id },
		});
	}, [organizations, navigate]);

	// this route is only used for redirects so we don't need to render anything
	// it's done client side so we can have subscribers to the organizations query
	return <Fragment />;
}
