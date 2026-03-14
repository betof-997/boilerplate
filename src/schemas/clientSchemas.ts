import { clientTable } from '@/db/tables';
import { createInsertSchema, createSelectSchema } from 'drizzle-orm/zod';
import z from 'zod';

export const selectClientSchema = createSelectSchema(clientTable);
export type SelectClient = z.infer<typeof selectClientSchema>;

export const InsertClientSchema = createInsertSchema(clientTable);
export type InsertClient = z.infer<typeof InsertClientSchema>;

export const getClientsParamsSchema = selectClientSchema.pick({
	organizationId: true,
});
export type GetClientsParams = z.infer<typeof getClientsParamsSchema>;

export const getClientByIdParamsSchema = selectClientSchema.pick({
	id: true,
	organizationId: true,
});
export type GetClientByIdParams = z.infer<typeof getClientByIdParamsSchema>;

export const upsertClientFormSchema = z.object({
	name: z.string().min(1),
	email: z.email(),
});
export type UpsertClientForm = z.infer<typeof upsertClientFormSchema>;

export const insertClientParamsSchema = z.object({
	...upsertClientFormSchema.shape,
	...selectClientSchema.pick({ organizationId: true }).shape,
});
export type InsertClientParams = z.infer<typeof insertClientParamsSchema>;

export const updateClientParamsSchema = z.object({
	...upsertClientFormSchema.shape,
	...selectClientSchema.pick({ id: true, organizationId: true }).shape,
});
export type UpdateClientParams = z.infer<typeof updateClientParamsSchema>;

export const deleteClientParamsSchema = selectClientSchema.pick({
	id: true,
	organizationId: true,
});
export type DeleteClientParams = z.infer<typeof deleteClientParamsSchema>;
