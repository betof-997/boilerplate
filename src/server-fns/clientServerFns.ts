import { db } from '@/db/client';
import { clientTable } from '@/db/tables';
import {
	createSuccessResponse,
	HTTP_STATUS_CODES,
	createErrorResponse,
} from '@/utils/serverFnsUtils';
import {
	insertClientParamsSchema,
	updateClientParamsSchema,
	getClientByIdParamsSchema,
	getClientsParamsSchema,
	deleteClientParamsSchema,
} from '@/schemas/clientSchemas';
import { createServerFn } from '@tanstack/react-start';
import { and, eq } from 'drizzle-orm';

export const getClientsServerFn = createServerFn()
	.inputValidator(getClientsParamsSchema)
	.handler(async ({ data: { userId } }) => {
		try {
			const clients = await db.query.clientTable.findMany({
				where: {
					userId,
				},
			});

			return createSuccessResponse({ data: clients });
		} catch (error) {
			throw createErrorResponse({ error });
		}
	});

const checkEmailExists = (email: string) => {
	return db.query.clientTable.findFirst({
		where: {
			email,
		},
	});
};

export const getClientByIdServerFn = createServerFn()
	.inputValidator(getClientByIdParamsSchema)
	.handler(async ({ data: { id } }) => {
		try {
			const client = await db.query.clientTable.findFirst({
				where: { id },
			});

			return createSuccessResponse({ data: client });
		} catch (error) {
			throw createErrorResponse({ error });
		}
	});

export const createClientServerFn = createServerFn()
	.inputValidator(insertClientParamsSchema)
	.handler(async ({ data: { name, email, userId } }) => {
		try {
			const emailExists = await checkEmailExists(email);
			if (emailExists) {
				throw createErrorResponse({
					statusCode: HTTP_STATUS_CODES.BAD_REQUEST,
					error: 'Email already in use',
				});
			}

			const client = await db
				.insert(clientTable)
				.values({ name, email, userId })
				.returning();

			return createSuccessResponse({
				data: client[0],
				statusCode: HTTP_STATUS_CODES.CREATED,
				message: 'Client created successfully',
			});
		} catch (error) {
			throw createErrorResponse({ error });
		}
	});

const checkEmailExistsForUpdate = (email: string, id: string) => {
	return db.query.clientTable.findFirst({
		where: {
			email,
			id: {
				NOT: {
					eq: id,
				},
			},
		},
	});
};

export const updateClientServerFn = createServerFn()
	.inputValidator(updateClientParamsSchema)
	.handler(async ({ data: { id, name, email, userId } }) => {
		try {
			const emailExists = await checkEmailExistsForUpdate(email, id);
			if (emailExists) {
				throw createErrorResponse({
					statusCode: HTTP_STATUS_CODES.BAD_REQUEST,
					error: 'Email already in use',
				});
			}

			const client = await db
				.update(clientTable)
				.set({ name, email, userId })
				.where(and(eq(clientTable.id, id), eq(clientTable.userId, userId)))
				.returning();

			return createSuccessResponse({
				data: client[0],
				message: 'Client updated successfully',
			});
		} catch (error) {
			throw createErrorResponse({ error });
		}
	});

export const deleteClientServerFn = createServerFn()
	.inputValidator(deleteClientParamsSchema)
	.handler(async ({ data: { id, userId } }) => {
		try {
			const client = await db
				.delete(clientTable)
				.where(and(eq(clientTable.id, id), eq(clientTable.userId, userId)))
				.returning();

			return createSuccessResponse({
				data: client[0],
				message: 'Client deleted successfully',
			});
		} catch (error) {
			throw createErrorResponse({ error });
		}
	});
