import { createServerFn } from '@tanstack/react-start';
import { insertOrganizationParamsSchema } from '@/schemas/organizationSchemas';
import { db } from '@/db/client';
import {
	addressTable,
	organizationMemberTable,
	organizationTable,
} from '@/db/tables';
import {
	createSuccessResponse,
	createErrorResponse,
} from '@/utils/serverFnsUtils';
import { HTTP_STATUS_CODES } from '@/utils/serverFnsUtils';

export const createOrganizationServerFn = createServerFn()
	.inputValidator(insertOrganizationParamsSchema)
	.handler(async ({ data: { name, email, address, userId } }) => {
		try {
			const organization = await db.transaction(async (tx) => {
				const [organization] = await tx
					.insert(organizationTable)
					.values({ name, email })
					.returning();

				const [organizationMember] = await tx
					.insert(organizationMemberTable)
					.values({ userId, organizationId: organization.id, role: 'admin' })
					.returning();

				const [organizationAddress] = await tx
					.insert(addressTable)
					.values({
						type: 'organization',
						addressLine1: address.addressLine1,
						addressLine2: address.addressLine2,
						city: address.city,
						state: address.state,
						zip: address.zip,
						country: address.country,
						organizationId: organization.id,
					})
					.returning();

				return {
					...organization,
					address: organizationAddress,
					organizationMember,
				};
			});

			return createSuccessResponse({
				data: organization,
				statusCode: HTTP_STATUS_CODES.CREATED,
				message: 'Organization created successfully',
			});
		} catch (error) {
			throw createErrorResponse({ error });
		}
	});
