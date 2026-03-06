import { getRouteApi } from '@tanstack/react-router';

const authenticatedRouteApi = getRouteApi('/app');

/**
 * Hook to get the user from the route context
 *
 * IMPORTANT: This hook should only be used in the app route and its children
 */
export const useUser = () => {
	const { user } = authenticatedRouteApi.useRouteContext();

	return user;
};
