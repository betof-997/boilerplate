import { db } from '@/db/client';
import { clientTable } from '@/db/tables';
import {
	deleteClientParamsSchema,
	getClientByIdParamsSchema,
	getClientsParamsSchema,
	insertClientParamsSchema,
	updateClientParamsSchema,
} from '@/schemas/clientSchemas';
import { getPaginatedQueryOptionsSchema } from '@/utils/schemaUtils';
import {
	createErrorResponse,
	createPaginatedData,
	createSuccessResponse,
	getPaginatedQueryExtras,
	getPaginatedQueryLimitOffset,
	getPaginatedQueryOrderBy,
	HTTP_STATUS_CODES,
} from '@/utils/serverFnsUtils';
import { createServerFn } from '@tanstack/react-start';
import { and, eq } from 'drizzle-orm';

export const getClientsServerFn = createServerFn()
	.inputValidator(getClientsParamsSchema)
	.handler(async ({ data: { organizationId } }) => {
		try {
			const clients = await db.query.clientTable.findMany({
				where: {
					organizationId,
				},
			});

			return createSuccessResponse({ data: clients });
		} catch (error) {
			throw createErrorResponse({ error });
		}
	});

export const getPaginatedClientsServerFn = createServerFn()
	.inputValidator(getPaginatedQueryOptionsSchema)
	.handler(
		async ({ data: { organizationId, pagination, orderBy: orderByBase } }) => {
			try {
				const { limit, offset } = getPaginatedQueryLimitOffset({ pagination });
				const orderBy = getPaginatedQueryOrderBy({ orderBy: orderByBase });
				const extras = getPaginatedQueryExtras();

				const clients = await db.query.clientTable.findMany({
					where: {
						organizationId,
					},
					offset,
					limit,
					orderBy,
					extras,
				});

				return createSuccessResponse({
					data: createPaginatedData(clients),
				});
			} catch (error) {
				throw createErrorResponse({ error });
			}
		},
	);

export const getClientByIdServerFn = createServerFn()
	.inputValidator(getClientByIdParamsSchema)
	.handler(async ({ data: { id, organizationId } }) => {
		try {
			const client = await db.query.clientTable.findFirst({
				where: {
					id,
					organizationId,
				},
			});

			return createSuccessResponse({ data: client });
		} catch (error) {
			throw createErrorResponse({ error });
		}
	});

type CheckEmailExistsParams = {
	email: string;
	organizationId: string;
};
const checkEmailExists = ({
	email,
	organizationId,
}: CheckEmailExistsParams) => {
	return db.query.clientTable.findFirst({
		where: {
			email,
			organizationId,
		},
	});
};

export const createClientServerFn = createServerFn()
	.inputValidator(insertClientParamsSchema)
	.handler(async ({ data: { name, email, organizationId } }) => {
		try {
			const emailExists = await checkEmailExists({ email, organizationId });
			if (emailExists) {
				throw createErrorResponse({
					statusCode: HTTP_STATUS_CODES.BAD_REQUEST,
					error: 'Email already in use',
				});
			}

			const client = await db
				.insert(clientTable)
				.values({ name, email, organizationId })
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

type CheckEmailExistsForUpdateParams = {
	email: string;
	id: string;
	organizationId: string;
};
const checkEmailExistsForUpdate = ({
	email,
	id,
	organizationId,
}: CheckEmailExistsForUpdateParams) => {
	return db.query.clientTable.findFirst({
		where: {
			email,
			organizationId,
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
	.handler(async ({ data: { id, name, email, organizationId } }) => {
		try {
			const emailExists = await checkEmailExistsForUpdate({
				email,
				id,
				organizationId,
			});
			if (emailExists) {
				throw createErrorResponse({
					statusCode: HTTP_STATUS_CODES.BAD_REQUEST,
					error: 'Email already in use',
				});
			}

			const client = await db
				.update(clientTable)
				.set({ name, email, organizationId })
				.where(
					and(
						eq(clientTable.id, id),
						eq(clientTable.organizationId, organizationId),
					),
				)
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
	.handler(async ({ data: { id, organizationId } }) => {
		try {
			const client = await db
				.delete(clientTable)
				.where(
					and(
						eq(clientTable.id, id),
						eq(clientTable.organizationId, organizationId),
					),
				)
				.returning();

			return createSuccessResponse({
				data: client[0],
				message: 'Client deleted successfully',
			});
		} catch (error) {
			throw createErrorResponse({ error });
		}
	});
