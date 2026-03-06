import { getRouteApi } from '@tanstack/react-router';

const organizationIdRouteApi = getRouteApi('/app/$organizationId');

export const useSelectedOrganization = () => {
	const { selectedOrganization } = organizationIdRouteApi.useRouteContext();

	return selectedOrganization;
};
