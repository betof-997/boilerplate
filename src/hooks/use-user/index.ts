import { getRouteApi } from '@tanstack/react-router';

const authenticatedRouteApi = getRouteApi('/_authenticated');

/**
 * Hook to get the user from the route context
 *
 * IMPORTANT: This hook should only be used in the _authenticated route and its children
 */
export const useUser = () => {
	const { user } = authenticatedRouteApi.useRouteContext();

	return user;
};
