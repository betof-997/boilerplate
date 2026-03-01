import { clientTable } from '@/db/tables';
import { createInsertSchema, createSelectSchema } from 'drizzle-orm/zod';
import z from 'zod';

export const clientSelectSchema = createSelectSchema(clientTable);
export type ClientSelect = z.infer<typeof clientSelectSchema>;

export const clientInsertSchema = createInsertSchema(clientTable);
export type ClientInsert = z.infer<typeof clientInsertSchema>;

export const getClientsParamsSchema = z.object(
	clientSelectSchema.pick({ userId: true }).shape,
);
export type GetClientsParams = z.infer<typeof getClientsParamsSchema>;

export const createClientParamsSchema = z.object(
	clientInsertSchema.omit({ id: true, createdAt: true, updatedAt: true }).shape,
);
export type CreateClientParams = z.infer<typeof createClientParamsSchema>;
