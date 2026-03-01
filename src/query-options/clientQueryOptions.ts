import {
	createClientServerFn,
	getClientsServerFn,
} from '@/server-fns/clientServerFns';
import { mutationOptions, queryOptions } from '@tanstack/react-query';
import type {
	CreateClientParams,
	GetClientsParams,
} from '@/schemas/clientSchemas';
import type { QueryKeyGetAll } from '@/utils/queryOptionsUtils';
import {
	createQueryKeys,
	handleQueryFn,
	invalidateOnSuccess,
} from '@/utils/queryOptionsUtils';

export const clientQueryKeys = createQueryKeys({ baseKey: 'clients' });

export const getAllClientsQueryOptions = ({ userId }: GetClientsParams) => {
	return queryOptions({
		queryKey: clientQueryKeys.getAll({
			userId,
		}),
		queryFn: () =>
			handleQueryFn(() => getClientsServerFn({ data: { userId } })),
	});
};

export const createClientMutationOptions = ({ userId }: QueryKeyGetAll) =>
	mutationOptions({
		mutationFn: (params: CreateClientParams) =>
			createClientServerFn({ data: params }),
		onSuccess: invalidateOnSuccess(clientQueryKeys.getAll({ userId })),
	});
