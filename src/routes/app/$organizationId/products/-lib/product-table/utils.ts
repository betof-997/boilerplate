import type {
	DataTableColumn,
	DataTableRowAction,
	DataTableToolbarAction,
} from '@/components/data-table';
import type { SelectProduct } from '@/schemas/productSchemas';
import { getRouteApi } from '@tanstack/react-router';
import {
	getTableDeleteRowAction,
	getTableEditRowAction,
} from '@/components/data-table/use-data-table/baseTableRowActions';
import { getTableAddRowAction } from '@/components/data-table/data-table-toolbar/baseTableToolbarActions';

const productsRouteApi = getRouteApi('/app/$organizationId/products/');

export const useProductTableColumns = (): DataTableColumn<SelectProduct>[] => {
	const columns: DataTableColumn<SelectProduct>[] = [
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
			accessorKey: 'description',
		},
		{
			accessorKey: 'price',
			format: {
				kind: 'number',
				style: 'currency',
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

export const useProductTableToolbarActions = () => {
	const navigate = productsRouteApi.useNavigate();

	const toolbarActions: DataTableToolbarAction<SelectProduct>[] = [
		getTableAddRowAction({
			label: 'Add Product',
			onClick: () => navigate({ to: '.', search: { isCreating: true } }),
		}),
	];
	return toolbarActions;
};

export const useProductTableRowActions = () => {
	const navigate = productsRouteApi.useNavigate();

	const rowActions: DataTableRowAction<SelectProduct>[] = [
		getTableEditRowAction({
			onClick: (rowData) =>
				navigate({ to: '.', search: { editId: rowData.id } }),
		}),
		getTableDeleteRowAction({
			onClick: (rowData) =>
				navigate({ to: '.', search: { deleteId: rowData.id } }),
		}),
	];
	return rowActions;
};
