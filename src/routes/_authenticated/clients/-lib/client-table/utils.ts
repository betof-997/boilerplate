import type {
	DataTableColumn,
	DataTableRowAction,
	DataTableToolbarAction,
} from '@/components/data-table/types';
import type { SelectClient } from '@/schemas/clientSchemas';
import { getRouteApi } from '@tanstack/react-router';
import { PencilIcon, PlusIcon, TrashIcon } from 'lucide-react';

const clientsRouteApi = getRouteApi('/_authenticated/clients/');

export const useClientTableColumns = (): DataTableColumn<SelectClient>[] => {
	const columns: DataTableColumn<SelectClient>[] = [
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

	const actions: DataTableToolbarAction<SelectClient>[] = [
		{
			type: 'button',
			label: 'Add Client',
			icon: PlusIcon,
			onClick: () => navigate({ to: '/clients', search: { isCreating: true } }),
		},
	];

	return actions;
};

export const useClientTableRowActions = () => {
	const navigate = clientsRouteApi.useNavigate();

	const actions: DataTableRowAction<SelectClient>[] = [
		{
			type: 'button',
			icon: PencilIcon,
			tooltip: 'Edit Client',
			onClick: (rowData) =>
				navigate({ to: '/clients', search: { editId: rowData.id } }),
		},
		{
			type: 'button',
			icon: TrashIcon,
			variant: 'destructive',
			tooltip: 'Delete Client',
			onClick: (rowData) =>
				navigate({ to: '/clients', search: { deleteId: rowData.id } }),
		},
	];

	return actions;
};
