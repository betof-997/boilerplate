import { DataTable } from '@/components/data-table';
import { useUser } from '@/hooks/use-user';
import { getAllClientsQueryOptions } from '@/query-options/clientQueryOptions';
import { useQuery } from '@tanstack/react-query';
import {
	useClientTableColumns,
	useClientTableRowActions,
	useClientTableToolbarActions,
} from './utils';

export const ClientTable = () => {
	const user = useUser();

	const { data, isFetching } = useQuery(
		getAllClientsQueryOptions({ userId: user.id }),
	);
	const columns = useClientTableColumns();
	const toolbarActions = useClientTableToolbarActions();
	const rowActions = useClientTableRowActions();

	return (
		<DataTable
			columns={columns}
			data={data}
			isLoading={isFetching}
			toolbarActions={toolbarActions}
			rowActions={rowActions}
		/>
	);
};
