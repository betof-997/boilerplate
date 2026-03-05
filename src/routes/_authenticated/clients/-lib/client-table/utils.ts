import { getTableAddRowAction } from '@/components/data-table/data-table-toolbar/baseTableToolbarActions';
import type {
	DataTableColumn,
	DataTableRowAction,
	DataTableToolbarAction,
} from '@/components/data-table/types';
import {
	getTableDeleteRowAction,
	getTableEditRowAction,
} from '@/components/data-table/use-data-table/baseTableRowActions';
import type { SelectClient } from '@/schemas/clientSchemas';
import { getRouteApi } from '@tanstack/react-router';

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
		{
			accessorKey: 'createdAt',
			format: {
				kind: 'date',
				style: 'datetime',
			},
		},
	];

	return columns;
};

export const useClientTableToolbarActions = () => {
	const navigate = clientsRouteApi.useNavigate();

	const actions: DataTableToolbarAction<SelectClient>[] = [
		getTableAddRowAction({
			label: 'Add Client',
			onClick: () => navigate({ to: '/clients', search: { isCreating: true } }),
		}),
	];

	return actions;
};

export const useClientTableRowActions = () => {
	const navigate = clientsRouteApi.useNavigate();

	const actions: DataTableRowAction<SelectClient>[] = [
		getTableEditRowAction({
			onClick: (rowData) =>
				navigate({ to: '/clients', search: { editId: rowData.id } }),
		}),
		getTableDeleteRowAction({
			onClick: (rowData) =>
				navigate({ to: '/clients', search: { deleteId: rowData.id } }),
		}),
	];

	return actions;
};
