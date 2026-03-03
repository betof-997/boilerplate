import type { MutationOptions } from '@tanstack/react-query';
import type { SuccessResponse } from './serverFnsUtils';
import { toast } from 'sonner';

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

const handleError = (error: unknown) => {
	if (error instanceof Error) {
		toast.error(error.message);
	} else {
		toast.error('An unknown error occurred');
	}
};

export const handleQueryFn = async <TData>(
	queryFn: () => Promise<SuccessResponse<TData>>,
): Promise<TData> => {
	try {
		const result = await queryFn();

		if (result.message) {
			toast.success(result.message);
		}

		return result.data;
	} catch (error) {
		handleError(error);
		throw error;
	}
};

export const handleMutationFn = async <TData>(
	mutationFn: () => Promise<SuccessResponse<TData>>,
): Promise<TData> => {
	try {
		const result = await mutationFn();
		if (result.message) {
			toast.success(result.message);
		}

		return result.data;
	} catch (error) {
		handleError(error);
		throw error;
	}
};
