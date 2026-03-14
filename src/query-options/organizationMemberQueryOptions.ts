import type { GetUserOrganizationsParams } from '@/schemas/organizationMemberSchemas';
import { getUserOrganizationsServerFn } from '@/server-fns/organizationMemberServerFns';
import type { WithUserId } from '@/utils/queryOptionsUtils';
import { createQueryKeys, handleQueryFn } from '@/utils/queryOptionsUtils';
import { queryOptions } from '@tanstack/react-query';

const baseKey = 'organizationMembers';
export const organizationMemberQueryKeys = {
	...createQueryKeys({
		baseKey,
	}),
	getUserOrganizations: ({ userId }: WithUserId) => [
		baseKey,
		userId,
		'getUserOrganizations',
	],
};

export const getUserOrganizationsQueryOptions = ({
	userId,
}: GetUserOrganizationsParams) =>
	queryOptions({
		queryKey: organizationMemberQueryKeys.getUserOrganizations({
			userId,
		}),
		queryFn: () =>
			handleQueryFn(() => getUserOrganizationsServerFn({ data: { userId } })),
	});
