import { db } from '@/db/client';
import { getUserOrganizationsParamsSchema } from '@/schemas/organizationMemberSchemas';
import {
	createErrorResponse,
	createSuccessResponse,
} from '@/utils/serverFnsUtils';
import { createServerFn } from '@tanstack/react-start';

export const getUserOrganizationsServerFn = createServerFn()
	.inputValidator(getUserOrganizationsParamsSchema)
	.handler(async ({ data: { userId } }) => {
		try {
			const organizations = await db.query.organizationTable.findMany({
				where: {
					members: {
						userId,
					},
				},
				with: {
					members: {
						where: {
							userId,
						},
					},
				},
			});
			return createSuccessResponse({ data: organizations });
		} catch (error) {
			throw createErrorResponse({ error });
		}
	});
