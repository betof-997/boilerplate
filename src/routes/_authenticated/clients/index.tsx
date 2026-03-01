import { DataTable } from '@/components/data-table';
import type { DataTableColumn } from '@/components/data-table/types';
import { getAllClientsQueryOptions } from '@/query-options/clientQueryOptions';
import type { ClientSelect } from '@/schemas/clientSchemas';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/clients/')({
	component: ClientsPage,
});

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

function ClientsPage() {
	const { user } = Route.useRouteContext();

	const { data, isFetching } = useQuery(
		getAllClientsQueryOptions({ userId: user.id }),
	);

	return (
		<main className='p-8'>
			<h1 className='text-2xl font-semibold'>Clients</h1>

			<DataTable
				columns={columns}
				data={data?.data || []}
				isLoading={isFetching}
			/>
		</main>
	);
}
