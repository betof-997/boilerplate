import type {
	DataTableRowAction,
	DataTableSort,
	DataTableToolbarAction,
} from '@/components/data-table';
import { DataTable } from '@/components/data-table';
import type {
	DataTableColumn,
	DataTableFilterItem,
} from '@/components/data-table/types';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { PencilIcon, PlusIcon, Trash2Icon } from 'lucide-react';
import { useState } from 'react';
import { createServerFn } from '@tanstack/react-start';

export const Route = createFileRoute('/_authenticated/products/')({
	component: ProductsPage,
});

const data = Array.from({ length: 1000 }, (_, index) => ({
	id: index,
	name: `Product ${index}`,
	description: `Description for product ${index}`,
	price: 100,
}));

const columns: DataTableColumn<Product>[] = [
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
];

type Product = (typeof data)[number];

const rowActions: DataTableRowAction<Product>[] = [
	{
		type: 'button',
		icon: PencilIcon,
		tooltip: 'Edit',
		onClick: () => undefined,
	},
	{
		type: 'button',
		icon: Trash2Icon,
		tooltip: 'Delete',
		variant: 'destructive',
		onClick: () => undefined,
	},
];

const toolbarActions: DataTableToolbarAction<Product>[] = [
	{
		type: 'button',
		label: 'New product',
		icon: PlusIcon,
		onClick: () => undefined,
	},
];

const getPaginatedProducts = createServerFn()
	.inputValidator(
		(d: {
			pageIndex: number;
			pageSize: number;
			sort: DataTableSort<Product>;
			filters: { id: keyof Product; value: string }[];
		}) => d,
	)
	.handler(async ({ data: { pageIndex, pageSize, sort, filters } }) => {
		const start = pageIndex * pageSize;
		const end = start + pageSize;

		const filteredData = [...data].filter((item) => {
			return filters.every((filter) => {
				if (filter.id === 'name') {
					return item.name.includes(filter.value);
				}
				if (filter.id === 'description') {
					return item.description.includes(filter.value);
				}
				if (filter.id === 'price') {
					return item.price.toString().includes(filter.value);
				}
				if (filter.id === 'id') {
					return item.id.toString().includes(filter.value);
				}
				return true;
			});
		});

		const paginatedData = filteredData
			.sort((a, b) => {
				if (sort.id === 'name') {
					return sort.desc
						? b.name.localeCompare(a.name)
						: a.name.localeCompare(b.name);
				}
				if (sort.id === 'description') {
					return sort.desc
						? b.description.localeCompare(a.description)
						: a.description.localeCompare(b.description);
				}
				if (sort.id === 'price') {
					return sort.desc ? b.price - a.price : a.price - b.price;
				}
				return 0;
			})
			.slice(start, end);

		await new Promise((resolve) => setTimeout(resolve, 1000));

		return { items: paginatedData, totalItems: filteredData.length };
	});

function ProductsPage() {
	const [pagination, setPagination] = useState({
		pageIndex: 0,
		pageSize: 10,
	});
	const [sort, setSort] = useState<DataTableSort<Product>>({
		id: 'name',
		desc: false,
	});
	const [filters, setFilters] = useState<DataTableFilterItem<Product>[]>([]);

	const { data: paginatedProducts, isFetching } = useQuery({
		queryKey: [
			'products',
			pagination.pageIndex,
			pagination.pageSize,
			sort.id,
			sort.desc,
			...filters.map((filter) => `${filter.id}:${filter.value}`),
		],
		queryFn: () =>
			getPaginatedProducts({
				data: {
					pageIndex: pagination.pageIndex,
					pageSize: pagination.pageSize,
					sort,
					filters,
				},
			}),
		placeholderData: keepPreviousData,
	});

	return (
		<main className='p-8'>
			<h1 className='text-2xl font-semibold'>Products</h1>

			<DataTable
				columns={columns}
				data={paginatedProducts?.items ?? []}
				isLoading={isFetching}
				toolbarActions={toolbarActions}
				rowActions={rowActions}
				pagination={{
					isServerSide: true,
					state: pagination,
					setState: setPagination,
					totalItems: paginatedProducts?.totalItems ?? 0,
				}}
				sort={{
					state: sort,
					setState: setSort,
				}}
				filter={{
					state: filters,
					setState: setFilters,
				}}
			/>
		</main>
	);
}
