import type {
	DataTableColumn,
	DataTableRowAction,
	DataTableToolbarAction,
} from '@/components/data-table';
import type { SelectProduct } from '@/schemas/productSchemas';
import { PencilIcon, PlusIcon, TrashIcon } from 'lucide-react';
import { getRouteApi } from '@tanstack/react-router';

const productsRouteApi = getRouteApi('/_authenticated/products/');

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
		{
			type: 'button',
			label: 'Add Product',
			icon: PlusIcon,
			onClick: () =>
				navigate({ to: '/products', search: { isCreating: true } }),
		},
	];
	return toolbarActions;
};

export const useProductTableRowActions = () => {
	const navigate = productsRouteApi.useNavigate();

	const rowActions: DataTableRowAction<SelectProduct>[] = [
		{
			type: 'button',
			icon: PencilIcon,
			tooltip: 'Edit Product',
			onClick: (rowData) =>
				navigate({ to: '/products', search: { editId: rowData.id } }),
		},
		{
			type: 'button',
			icon: TrashIcon,
			variant: 'destructive',
			tooltip: 'Delete Product',
			onClick: (rowData) =>
				navigate({ to: '/products', search: { deleteId: rowData.id } }),
		},
	];
	return rowActions;
};
