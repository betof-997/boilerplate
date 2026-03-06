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

export const getAllProductsQueryOptions = ({
	organizationId,
}: GetProductsParams) => {
	return queryOptions({
		queryKey: productQueryKeys.getAll({ organizationId }),
		queryFn: () =>
			handleQueryFn(() => getProductsServerFn({ data: { organizationId } })),
	});
};

export const getProductByIdQueryOptions = ({
	id,
	organizationId,
}: GetProductByIdParams) => {
	return queryOptions({
		queryKey: productQueryKeys.getById({ id, organizationId }),
		queryFn: () =>
			handleQueryFn(() =>
				getProductByIdServerFn({ data: { id, organizationId } }),
			),
	});
};

export const createProductMutationOptions = ({
	organizationId,
}: QueryKeyBase) => {
	return mutationOptions({
		mutationFn: (params: InsertProductParams) =>
			handleMutationFn(() => createProductServerFn({ data: params })),
		onSuccess: invalidateOnSuccess(productQueryKeys.base({ organizationId })),
	});
};

export const updateProductMutationOptions = ({
	organizationId,
}: QueryKeyBase) => {
	return mutationOptions({
		mutationFn: (params: UpdateProductParams) =>
			handleMutationFn(() => updateProductServerFn({ data: params })),
		onSuccess: invalidateOnSuccess(productQueryKeys.base({ organizationId })),
	});
};

export const deleteProductMutationOptions = ({
	organizationId,
}: QueryKeyBase) => {
	return mutationOptions({
		mutationFn: (params: DeleteProductParams) =>
			handleMutationFn(() => deleteProductServerFn({ data: params })),
		onSuccess: invalidateOnSuccess(productQueryKeys.base({ organizationId })),
	});
};
