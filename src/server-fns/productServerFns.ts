import { db } from '@/db/client';
import { productTable } from '@/db/tables';
import {
	deleteProductParamsSchema,
	getProductByIdParamsSchema,
	getProductsParamsSchema,
	insertProductParamsSchema,
	updateProductParamsSchema,
} from '@/schemas/productSchemas';
import {
	createErrorResponse,
	createSuccessResponse,
	HTTP_STATUS_CODES,
} from '@/utils/serverFnsUtils';
import { createServerFn } from '@tanstack/react-start';
import { and, eq } from 'drizzle-orm';

export const getProductsServerFn = createServerFn()
	.inputValidator(getProductsParamsSchema)
	.handler(async ({ data: { userId } }) => {
		try {
			const products = await db.query.productTable.findMany({
				where: { userId },
			});
			return createSuccessResponse({ data: products });
		} catch (error) {
			throw createErrorResponse({ error });
		}
	});

export const getProductByIdServerFn = createServerFn()
	.inputValidator(getProductByIdParamsSchema)
	.handler(async ({ data: { id } }) => {
		try {
			const product = await db.query.productTable.findFirst({
				where: { id },
			});
			return createSuccessResponse({ data: product });
		} catch (error) {
			throw createErrorResponse({ error });
		}
	});

export const createProductServerFn = createServerFn()
	.inputValidator(insertProductParamsSchema)
	.handler(async ({ data: { name, description, price, userId } }) => {
		try {
			const product = await db
				.insert(productTable)
				.values({ name, description, price, userId })
				.returning();
			return createSuccessResponse({
				data: product[0],
				statusCode: HTTP_STATUS_CODES.CREATED,
				message: 'Product created successfully',
			});
		} catch (error) {
			throw createErrorResponse({ error });
		}
	});

export const updateProductServerFn = createServerFn()
	.inputValidator(updateProductParamsSchema)
	.handler(async ({ data: { id, name, description, price, userId } }) => {
		try {
			const product = await db
				.update(productTable)
				.set({ name, description, price, userId })
				.where(and(eq(productTable.id, id), eq(productTable.userId, userId)))
				.returning();
			return createSuccessResponse({
				data: product[0],
				message: 'Product updated successfully',
			});
		} catch (error) {
			throw createErrorResponse({ error });
		}
	});

export const deleteProductServerFn = createServerFn()
	.inputValidator(deleteProductParamsSchema)
	.handler(async ({ data: { id, userId } }) => {
		try {
			const product = await db
				.delete(productTable)
				.where(and(eq(productTable.id, id), eq(productTable.userId, userId)))
				.returning();
			return createSuccessResponse({
				data: product[0],
				message: 'Product deleted successfully',
			});
		} catch (error) {
			throw createErrorResponse({ error });
		}
	});
