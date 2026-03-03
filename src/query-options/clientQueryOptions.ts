import {
  createClientServerFn,
  deleteClientServerFn,
  getClientByIdServerFn,
  getClientsServerFn,
  updateClientServerFn,
} from "@/server-fns/clientServerFns";
import { mutationOptions, queryOptions } from "@tanstack/react-query";
import type {
  InsertClientParams,
  UpdateClientParams,
  GetClientByIdParams,
  GetClientsParams,
  DeleteClientParams,
} from "@/schemas/clientSchemas";
import type { QueryKeyGetAll } from "@/utils/queryOptionsUtils";
import {
  createQueryKeys,
  handleMutationFn,
  handleQueryFn,
  invalidateOnSuccess,
} from "@/utils/queryOptionsUtils";

export const clientQueryKeys = createQueryKeys({ baseKey: "clients" });

export const getAllClientsQueryOptions = ({ userId }: GetClientsParams) => {
  return queryOptions({
    queryKey: clientQueryKeys.getAll({
      userId,
    }),
    queryFn: () =>
      handleQueryFn(() => getClientsServerFn({ data: { userId } })),
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

export const createClientMutationOptions = ({ userId }: QueryKeyGetAll) =>
  mutationOptions({
    mutationFn: (params: InsertClientParams) =>
      handleMutationFn(() => createClientServerFn({ data: params })),
    onSuccess: invalidateOnSuccess(clientQueryKeys.getAll({ userId })),
  });

export const updateClientMutationOptions = ({ userId }: QueryKeyGetAll) =>
  mutationOptions({
    mutationFn: (params: UpdateClientParams) =>
      handleMutationFn(() => updateClientServerFn({ data: params })),
    onSuccess: invalidateOnSuccess(clientQueryKeys.getAll({ userId })),
  });

export const deleteClientMutationOptions = ({ userId }: QueryKeyGetAll) =>
  mutationOptions({
    mutationFn: (params: DeleteClientParams) =>
      handleMutationFn(() => deleteClientServerFn({ data: params })),
    onSuccess: invalidateOnSuccess(clientQueryKeys.base({ userId })),
  });
