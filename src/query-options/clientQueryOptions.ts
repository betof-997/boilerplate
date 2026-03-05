import {
	createClientServerFn,
	deleteClientServerFn,
	getClientByIdServerFn,
	getClientsServerFn,
	getPaginatedClientsServerFn,
	updateClientServerFn,
} from '@/server-fns/clientServerFns';
import { mutationOptions, queryOptions } from '@tanstack/react-query';
import type {
	InsertClientParams,
	UpdateClientParams,
	GetClientByIdParams,
	GetClientsParams,
	DeleteClientParams,
} from '@/schemas/clientSchemas';
import type { QueryKeyBase } from '@/utils/queryOptionsUtils';
import {
	createQueryKeys,
	handleMutationFn,
	handleQueryFn,
	invalidateOnSuccess,
} from '@/utils/queryOptionsUtils';
import type { GetPaginatedQueryOptions } from '@/utils/schemaUtils';

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

export const getPaginatedClientsQueryOptions = ({
	userId,
	pagination,
	orderBy,
}: GetPaginatedQueryOptions) => {
	return queryOptions({
		queryKey: clientQueryKeys.getPaginated({ userId, orderBy, pagination }),
		queryFn: () =>
			handleQueryFn(() =>
				getPaginatedClientsServerFn({ data: { userId, pagination, orderBy } }),
			),
	});
};

export const getClientByIdQueryOptions = ({
	id,
	userId,
}: GetClientByIdParams) => {
	return queryOptions({
		queryKey: clientQueryKeys.getById({ id, userId }),
		queryFn: () =>
			handleQueryFn(() => getClientByIdServerFn({ data: { id, userId } })),
	});
};

export const createClientMutationOptions = ({ userId }: QueryKeyBase) =>
	mutationOptions({
		mutationFn: (params: InsertClientParams) =>
			handleMutationFn(() => createClientServerFn({ data: params })),
		onSuccess: invalidateOnSuccess(clientQueryKeys.base({ userId })),
	});

export const updateClientMutationOptions = ({ userId }: QueryKeyBase) =>
	mutationOptions({
		mutationFn: (params: UpdateClientParams) =>
			handleMutationFn(() => updateClientServerFn({ data: params })),
		onSuccess: invalidateOnSuccess(clientQueryKeys.base({ userId })),
	});

export const deleteClientMutationOptions = ({ userId }: QueryKeyBase) =>
	mutationOptions({
		mutationFn: (params: DeleteClientParams) =>
			handleMutationFn(() => deleteClientServerFn({ data: params })),
		onSuccess: invalidateOnSuccess(clientQueryKeys.base({ userId })),
	});
