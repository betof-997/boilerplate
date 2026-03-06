import { organizationMemberTable } from '@/db/tables';
import { organizationMemberRoles } from '@/db/tables/organizationMemberTable';
import { createInsertSchema, createSelectSchema } from 'drizzle-orm/zod';
import z from 'zod';

export const selectOrganizationMemberSchema = createSelectSchema(
	organizationMemberTable,
);
export type SelectOrganizationMember = z.infer<
	typeof selectOrganizationMemberSchema
>;

export const organizationMemberRoleSchema = z.enum(organizationMemberRoles);
export type OrganizationMemberRole = z.infer<
	typeof organizationMemberRoleSchema
>;

export const insertOrganizationMemberSchema = createInsertSchema(
	organizationMemberTable,
);
export type InsertOrganizationMember = z.infer<
	typeof insertOrganizationMemberSchema
>;

export const getUserOrganizationsParamsSchema =
	selectOrganizationMemberSchema.pick({
		userId: true,
	});
export type GetUserOrganizationsParams = z.infer<
	typeof getUserOrganizationsParamsSchema
>;
