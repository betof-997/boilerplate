import type {
	DeleteProductParams,
	GetProductByIdParams,
	GetProductsParams,
	InsertProductParams,
	UpdateProductParams,
} from '@/schemas/productSchemas';
import {
	createProductServerFn,
	deleteProductServerFn,
	getProductByIdServerFn,
	getProductsServerFn,
	updateProductServerFn,
} from '@/server-fns/productServerFns';
import type { QueryKeyBase } from '@/utils/queryOptionsUtils';
import {
	createQueryKeys,
	handleMutationFn,
	handleQueryFn,
	invalidateOnSuccess,
} from '@/utils/queryOptionsUtils';
import { mutationOptions, queryOptions } from '@tanstack/react-query';

export const productQueryKeys = createQueryKeys({ baseKey: 'products' });

export const getAllProductsQueryOptions = ({ userId }: GetProductsParams) => {
	return queryOptions({
		queryKey: productQueryKeys.getAll({ userId }),
		queryFn: () =>
			handleQueryFn(() => getProductsServerFn({ data: { userId } })),
	});
};

export const getProductByIdQueryOptions = ({
	id,
	userId,
}: GetProductByIdParams) => {
	return queryOptions({
		queryKey: productQueryKeys.getById({ id, userId }),
		queryFn: () =>
			handleQueryFn(() => getProductByIdServerFn({ data: { id, userId } })),
	});
};

export const createProductMutationOptions = ({ userId }: QueryKeyBase) => {
	return mutationOptions({
		mutationFn: (params: InsertProductParams) =>
			handleMutationFn(() => createProductServerFn({ data: params })),
		onSuccess: invalidateOnSuccess(productQueryKeys.base({ userId })),
	});
};

export const updateProductMutationOptions = ({ userId }: QueryKeyBase) => {
	return mutationOptions({
		mutationFn: (params: UpdateProductParams) =>
			handleMutationFn(() => updateProductServerFn({ data: params })),
		onSuccess: invalidateOnSuccess(productQueryKeys.base({ userId })),
	});
};

export const deleteProductMutationOptions = ({ userId }: QueryKeyBase) => {
	return mutationOptions({
		mutationFn: (params: DeleteProductParams) =>
			handleMutationFn(() => deleteProductServerFn({ data: params })),
		onSuccess: invalidateOnSuccess(productQueryKeys.base({ userId })),
	});
};
