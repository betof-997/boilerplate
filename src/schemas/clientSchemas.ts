import { clientTable } from '@/db/tables';
import { createInsertSchema, createSelectSchema } from 'drizzle-orm/zod';
import z from 'zod';

export const selectClientSchema = createSelectSchema(clientTable);
export type SelectClient = z.infer<typeof selectClientSchema>;

export const InsertClientSchema = createInsertSchema(clientTable);
export type InsertClient = z.infer<typeof InsertClientSchema>;

export const getClientsParamsSchema = z.object(
	selectClientSchema.pick({ userId: true }).shape,
);
export type GetClientsParams = z.infer<typeof getClientsParamsSchema>;

export const getClientByIdParamsSchema = z.object(
	selectClientSchema.pick({ id: true, userId: true }).shape,
);
export type GetClientByIdParams = z.infer<typeof getClientByIdParamsSchema>;

export const clientUpsertFormSchema = z.object({
	name: z.string().min(1),
	email: z.email(),
});
export type UpsertClientForm = z.infer<typeof clientUpsertFormSchema>;

export const insertClientParamsSchema = z
	.object(clientUpsertFormSchema.shape)
	.extend(selectClientSchema.pick({ userId: true }).shape);
export type InsertClientParams = z.infer<typeof insertClientParamsSchema>;

export const updateClientParamsSchema = z
	.object(clientUpsertFormSchema.shape)
	.extend(selectClientSchema.pick({ id: true, userId: true }).shape);
export type UpdateClientParams = z.infer<typeof updateClientParamsSchema>;

export const deleteClientParamsSchema = z.object(
	selectClientSchema.pick({ id: true, userId: true }).shape,
);
export type DeleteClientParams = z.infer<typeof deleteClientParamsSchema>;
