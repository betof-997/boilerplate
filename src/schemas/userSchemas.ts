import { userTable } from '@/db/tables';
import { createSelectSchema } from 'drizzle-orm/zod';
import z from 'zod';

export const selectUserSchema = createSelectSchema(userTable);
export type SelectUser = z.infer<typeof selectUserSchema>;

export const updateUserFormSchema = z.object({
	name: z.string().min(1),
});
export type UpdateUserForm = z.infer<typeof updateUserFormSchema>;

export const updateUserParamsSchema = z.object({
	...updateUserFormSchema.shape,
	...selectUserSchema.pick({ id: true }).shape,
});
export type UpdateUserParams = z.infer<typeof updateUserParamsSchema>;
