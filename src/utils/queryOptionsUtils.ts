import type { MutationOptions } from '@tanstack/react-query';
import type { SuccessResponse } from './serverFnsUtils';
import { toast } from 'sonner';
import type { DataTableOrderByState, DataTablePaginationState } from '@/components/data-table/schemas';

export type WithUserId = {
	userId: string;
};

export type QueryKeyBase = WithUserId;

export type QueryKeyGetAll = WithUserId;

export type QueryKeyGetById = WithUserId & {
	id: string;
};

export type QueryKeyGetPaginated = WithUserId & {
	pagination: DataTablePaginationState;
	orderBy: DataTableOrderByState;
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
		getPaginated: ({ userId, pagination, orderBy }: QueryKeyGetPaginated) => [
			baseKey,
			userId,
			pagination,
			orderBy,
			'getPaginated',
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
	let message = 'An unknown error occurred';

	if (error instanceof Error) {
		message = error.message;
	} else if (typeof error === 'string') {
		message = error;
	} else if (
		typeof error === 'object' &&
		error !== null &&
		'message' in error
	) {
		message = String(error.message);
	}

	toast.error(message);
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
