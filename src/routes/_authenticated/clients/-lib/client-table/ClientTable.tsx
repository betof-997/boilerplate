import { DataTable } from '@/components/data-table';
import { getPaginatedClientsQueryOptions } from '@/query-options/clientQueryOptions';
import { useQuery } from '@tanstack/react-query';
import {
	useClientTableColumns,
	useClientTableRowActions,
	useClientTableToolbarActions,
} from './utils';
import { usePaginatedTable } from '@/components/data-table/use-paginated-table';
import type { SelectClient } from '@/schemas/clientSchemas';

export const ClientTable = () => {
	const { getQueryOptions, getTableOptions } =
		usePaginatedTable<SelectClient>();

	const { data, isFetching } = useQuery(
		getPaginatedClientsQueryOptions(getQueryOptions()),
	);
	const columns = useClientTableColumns();
	const toolbarActions = useClientTableToolbarActions();
	const rowActions = useClientTableRowActions();

	return (
		<DataTable
			columns={columns}
			isLoading={isFetching}
			toolbarActions={toolbarActions}
			rowActions={rowActions}
			{...getTableOptions({ data })}
		/>
	);
};
