import type { SelectClient, UpsertClientForm } from '@/schemas/clientSchemas';

export const useClientUpsertFormDefaultValues = (
	client?: SelectClient,
): UpsertClientForm => {
	return {
		name: client?.name ?? '',
		email: client?.email ?? '',
	};
};
