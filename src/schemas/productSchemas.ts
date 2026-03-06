import { productTable } from '@/db/tables';
import { createInsertSchema, createSelectSchema } from 'drizzle-orm/zod';
import z from 'zod';

export const selectProductSchema = createSelectSchema(productTable);
export type SelectProduct = z.infer<typeof selectProductSchema>;

export const insertProductSchema = createInsertSchema(productTable);
export type InsertProduct = z.infer<typeof insertProductSchema>;

export const getProductsParamsSchema = selectProductSchema.pick({
	organizationId: true,
});
export type GetProductsParams = z.infer<typeof getProductsParamsSchema>;

export const getProductByIdParamsSchema = selectProductSchema.pick({
	id: true,
	organizationId: true,
});
export type GetProductByIdParams = z.infer<typeof getProductByIdParamsSchema>;

export const upsertProductFormSchema = z.object({
	name: z.string().min(1),
	description: z.string().min(1),
	price: z.number().min(0),
});
export type UpsertProductForm = z.infer<typeof upsertProductFormSchema>;

export const insertProductParamsSchema = z.object({
	...selectProductSchema.pick({ organizationId: true }).shape,
	...upsertProductFormSchema.shape,
});
export type InsertProductParams = z.infer<typeof insertProductParamsSchema>;

export const updateProductParamsSchema = z.object({
	...selectProductSchema.pick({ id: true, organizationId: true }).shape,
	...upsertProductFormSchema.shape,
});
export type UpdateProductParams = z.infer<typeof updateProductParamsSchema>;

export const deleteProductParamsSchema = selectProductSchema.pick({
	id: true,
	organizationId: true,
});
export type DeleteProductParams = z.infer<typeof deleteProductParamsSchema>;
