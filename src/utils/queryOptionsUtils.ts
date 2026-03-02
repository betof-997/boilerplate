import type { MutationOptions } from '@tanstack/react-query';
import type { SuccessResponse } from './serverFnsUtils';

export type WithUserId = {
	userId: string;
};

export type QueryKeyBase = WithUserId;

export type QueryKeyGetAll = WithUserId;

export type QueryKeyGetById = WithUserId & {
	id: string;
};

type CreateQueryKeysParams = {
	baseKey: string;
};
export const createQueryKeys = ({ baseKey }: CreateQueryKeysParams) => {
	return {
		base: ({ userId }: QueryKeyBase) => [baseKey, userId],
		getAll: ({ userId }: QueryKeyGetAll) => [baseKey, userId, 'getAll'],
		getById: ({ id, userId }: QueryKeyGetById) => [
			baseKey,
			userId,
			id,
			'getById',
		],
	};
};

export const invalidateOnSuccess = (
	queryKey: unknown[],
): MutationOptions<unknown, unknown, unknown, unknown>['onSuccess'] => {
	return (_, __, ___, context) => {
		context.client.invalidateQueries({ queryKey });
	};
};

export const handleQueryFn = async <TData>(
	queryFn: () => Promise<SuccessResponse<TData>>,
): Promise<TData> => {
	const result = await queryFn();

	return result.data;
};

export const handleMutationFn = async <TData>(
	mutationFn: () => Promise<SuccessResponse<TData>>,
): Promise<TData> => {
	const result = await mutationFn();

	return result.data;
};
