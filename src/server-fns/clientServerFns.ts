import { db } from '@/db/client';
import { clientTable } from '@/db/tables';
import {
	createSuccessResponse,
	HTTP_STATUS_CODES,
	createErrorResponse,
} from '@/utils/serverFnsUtils';
import {
	createClientParamsSchema,
	getClientsParamsSchema,
} from '@/schemas/clientSchemas';
import { createServerFn } from '@tanstack/react-start';

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

export const createClientServerFn = createServerFn()
	.inputValidator(createClientParamsSchema)
	.handler(async ({ data: { name, email, userId } }) => {
		try {
			const emailExists = await checkEmailExists(email);
			if (emailExists) {
				throw createErrorResponse({
					statusCode: HTTP_STATUS_CODES.BAD_REQUEST,
					error: new Error('Email already in use'),
				});
			}

			const client = await db
				.insert(clientTable)
				.values({ name, email, userId })
				.returning();

			return createSuccessResponse({
				data: client[0],
				statusCode: HTTP_STATUS_CODES.CREATED,
			});
		} catch (error) {
			throw createErrorResponse({ error });
		}
	});
