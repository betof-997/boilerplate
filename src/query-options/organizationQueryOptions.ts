import type { InsertOrganizationParams } from '@/schemas/organizationSchemas';
import { createOrganizationServerFn } from '@/server-fns/organizationServerFns';
import {
	handleMutationFn,
	invalidateOnSuccess,
} from '@/utils/queryOptionsUtils';
import { mutationOptions } from '@tanstack/react-query';
import { organizationMemberQueryKeys } from './organizationMemberQueryOptions';

const baseKey = 'organizations';
export const organizationQueryKeys = {
	base: () => [baseKey],
};

export const createOrganizationMutationOptions = () =>
	mutationOptions({
		mutationFn: (params: InsertOrganizationParams) =>
			handleMutationFn(() => createOrganizationServerFn({ data: params })),
		onSuccess: invalidateOnSuccess(organizationMemberQueryKeys.all()),
	});
