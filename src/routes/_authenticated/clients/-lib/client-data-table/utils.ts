import type {
	DataTableColumn,
	DataTableToolbarAction,
} from '@/components/data-table/types';
import type { ClientSelect } from '@/schemas/clientSchemas';
import { getRouteApi } from '@tanstack/react-router';
import { PlusIcon } from 'lucide-react';

const clientsRouteApi = getRouteApi('/_authenticated/clients/');

export const useClientTableColumns = (): DataTableColumn<ClientSelect>[] => {
	const columns: DataTableColumn<ClientSelect>[] = [
		{
			accessorKey: 'id',
			format: {
				kind: 'text',
				style: 'id',
			},
		},
		{
			accessorKey: 'name',
		},
		{
			accessorKey: 'email',
			format: {
				kind: 'text',
				style: 'email',
			},
		},
	];

	return columns;
};

export const useClientTableToolbarActions = () => {
	const navigate = clientsRouteApi.useNavigate();

	const actions: DataTableToolbarAction<ClientSelect>[] = [
		{
			type: 'button',
			label: 'Add Client',
			icon: PlusIcon,
			onClick: () => navigate({ to: '/clients', search: { isCreating: true } }),
		},
	];

	return actions;
};
