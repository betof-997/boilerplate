import { organizationTable } from '@/db/tables';
import { createInsertSchema, createSelectSchema } from 'drizzle-orm/zod';
import z from 'zod';
import { insertAddressFormSchema } from './addressSchemas';

export const selectOrganizationSchema = createSelectSchema(organizationTable);
export type SelectOrganization = z.infer<typeof selectOrganizationSchema>;

export const insertOrganizationSchema = createInsertSchema(organizationTable);
export type InsertOrganization = z.infer<typeof insertOrganizationSchema>;

export const insertOrganizationFormSchema = z.object({
	name: z.string().min(1),
	email: z.email(),
	address: insertAddressFormSchema,
});
export type InsertOrganizationForm = z.infer<
	typeof insertOrganizationFormSchema
>;

export const insertOrganizationParamsSchema = z.object({
	...insertOrganizationFormSchema.shape,
	userId: z.string(),
});
export type InsertOrganizationParams = z.infer<
	typeof insertOrganizationParamsSchema
>;
