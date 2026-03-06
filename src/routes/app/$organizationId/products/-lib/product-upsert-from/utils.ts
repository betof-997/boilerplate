import type {
	SelectProduct,
	UpsertProductForm,
} from '@/schemas/productSchemas';

export const useProductUpsertFormDefaultValues = (
	product?: SelectProduct,
): UpsertProductForm => {
	return {
		name: product?.name ?? '',
		description: product?.description ?? '',
		price: product?.price ?? 0,
	};
};
