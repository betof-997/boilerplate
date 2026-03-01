import type { MutationOptions } from '@tanstack/react-query';

export type WithUserId = {
	userId: string;
};

export type QueryKeyGetAll = WithUserId;

export type QueryKeyGetById = WithUserId & {
	id: string;
};

type CreateQueryKeysParams = {
	baseKey: string;
};
export const createQueryKeys = ({ baseKey }: CreateQueryKeysParams) => {
	return {
		getAll: ({ userId }: QueryKeyGetAll) => [baseKey, userId],
		getById: ({ id, userId }: QueryKeyGetById) => [baseKey, userId, id],
	};
};

export const invalidateOnSuccess = (
	queryKey: unknown[],
): MutationOptions<unknown, unknown, unknown, unknown>['onSuccess'] => {
	return (_, __, ___, context) => {
		context.client.invalidateQueries({ queryKey });
	};
};
