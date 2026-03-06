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

export const getAllClientsQueryOptions = ({
	organizationId,
}: GetClientsParams) => {
	return queryOptions({
		queryKey: clientQueryKeys.getAll({
			organizationId,
		}),
		queryFn: () =>
			handleQueryFn(() => getClientsServerFn({ data: { organizationId } })),
	});
};

export const getPaginatedClientsQueryOptions = ({
	organizationId,
	pagination,
	orderBy,
}: GetPaginatedQueryOptions) => {
	return queryOptions({
		queryKey: clientQueryKeys.getPaginated({
			organizationId,
			orderBy,
			pagination,
		}),
		queryFn: () =>
			handleQueryFn(() =>
				getPaginatedClientsServerFn({
					data: { organizationId, pagination, orderBy },
				}),
			),
	});
};

export const getClientByIdQueryOptions = ({
	id,
	organizationId,
}: GetClientByIdParams) => {
	return queryOptions({
		queryKey: clientQueryKeys.getById({ id, organizationId }),
		queryFn: () =>
			handleQueryFn(() =>
				getClientByIdServerFn({ data: { id, organizationId } }),
			),
	});
};

export const createClientMutationOptions = ({ organizationId }: QueryKeyBase) =>
	mutationOptions({
		mutationFn: (params: InsertClientParams) =>
			handleMutationFn(() => createClientServerFn({ data: params })),
		onSuccess: invalidateOnSuccess(clientQueryKeys.base({ organizationId })),
	});

export const updateClientMutationOptions = ({ organizationId }: QueryKeyBase) =>
	mutationOptions({
		mutationFn: (params: UpdateClientParams) =>
			handleMutationFn(() => updateClientServerFn({ data: params })),
		onSuccess: invalidateOnSuccess(clientQueryKeys.base({ organizationId })),
	});

export const deleteClientMutationOptions = ({ organizationId }: QueryKeyBase) =>
	mutationOptions({
		mutationFn: (params: DeleteClientParams) =>
			handleMutationFn(() => deleteClientServerFn({ data: params })),
		onSuccess: invalidateOnSuccess(clientQueryKeys.base({ organizationId })),
	});
