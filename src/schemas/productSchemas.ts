import { productTable } from '@/db/tables';
import { createInsertSchema, createSelectSchema } from 'drizzle-orm/zod';
import z from 'zod';

export const selectProductSchema = createSelectSchema(productTable);
export type SelectProduct = z.infer<typeof selectProductSchema>;

export const insertProductSchema = createInsertSchema(productTable);
export type InsertProduct = z.infer<typeof insertProductSchema>;

export const getProductsParamsSchema = z.object(
	selectProductSchema.pick({ userId: true }).shape,
);
export type GetProductsParams = z.infer<typeof getProductsParamsSchema>;

export const getProductByIdParamsSchema = z.object(
	selectProductSchema.pick({ id: true, userId: true }).shape,
);
export type GetProductByIdParams = z.infer<typeof getProductByIdParamsSchema>;

export const productUpsertFormSchema = z.object({
	name: z.string().min(1),
	description: z.string().min(1),
	price: z.number().min(0),
});
export type UpsertProductForm = z.infer<typeof productUpsertFormSchema>;

export const insertProductParamsSchema = z
	.object(productUpsertFormSchema.shape)
	.extend(selectProductSchema.pick({ userId: true }).shape);
export type InsertProductParams = z.infer<typeof insertProductParamsSchema>;

export const updateProductParamsSchema = z
	.object(productUpsertFormSchema.shape)
	.extend(selectProductSchema.pick({ id: true, userId: true }).shape);
export type UpdateProductParams = z.infer<typeof updateProductParamsSchema>;

export const deleteProductParamsSchema = z.object(
	selectProductSchema.pick({ id: true, userId: true }).shape,
);
export type DeleteProductParams = z.infer<typeof deleteProductParamsSchema>;
