import { addressTable } from '@/db/tables';
import { createSelectSchema } from 'drizzle-orm/zod';
import z from 'zod';

export const selectAddressSchema = createSelectSchema(addressTable);
export type SelectAddress = z.infer<typeof selectAddressSchema>;

export const insertAddressFormSchema = z.object({
	addressLine1: z.string().min(1),
	addressLine2: z.string(),
	city: z.string().min(1),
	state: z.string().min(1),
	country: z.string().min(1),
	zip: z.string().min(1),
});
export type InsertAddressForm = z.infer<typeof insertAddressFormSchema>;
