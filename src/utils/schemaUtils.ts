import {
	dataTableOrderByStateSchema,
	dataTablePaginationStateSchema,
} from '@/components/data-table/schemas';
import z from 'zod';

export const getPaginatedQueryOptionsSchema = z.object({
	organizationId: z.string(),
	pagination: dataTablePaginationStateSchema,
	orderBy: dataTableOrderByStateSchema,
});
export type GetPaginatedQueryOptions = z.infer<
	typeof getPaginatedQueryOptionsSchema
>;
