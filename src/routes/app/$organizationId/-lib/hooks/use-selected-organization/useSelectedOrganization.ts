import { getUserOrganizationsQueryOptions } from '@/query-options/organizationMemberQueryOptions';
import { useUser } from '@/routes/app/-lib/hooks/use-user';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getRouteApi } from '@tanstack/react-router';

const organizationIdRouteApi = getRouteApi('/app/$organizationId');

export const useSelectedOrganization = () => {
	const user = useUser();
	const params = organizationIdRouteApi.useParams();
	const { data: organizations } = useSuspenseQuery(
		getUserOrganizationsQueryOptions({
			userId: user.id,
		}),
	);

	const selectedOrganization = organizations.find(
		(organization) => organization.id === params.organizationId,
	);

	return selectedOrganization ?? organizations[0];
};
