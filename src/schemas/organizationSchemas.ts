import { organizationTable } from '@/db/tables';
import { createInsertSchema, createSelectSchema } from 'drizzle-orm/zod';
import type z from 'zod';

export const selectOrganizationSchema = createSelectSchema(organizationTable);
export type SelectOrganization = z.infer<typeof selectOrganizationSchema>;

export const insertOrganizationSchema = createInsertSchema(organizationTable);
export type InsertOrganization = z.infer<typeof insertOrganizationSchema>;
