import { DataTable } from '@/components/data-table';
import { useUser } from '@/hooks/use-user';
import { getAllProductsQueryOptions } from '@/query-options/productQueryOptions';
import { useQuery } from '@tanstack/react-query';
import {
	useProductTableColumns,
	useProductTableRowActions,
	useProductTableToolbarActions,
} from './utils';

export const ProductTable = () => {
	const user = useUser();

	const { data, isFetching } = useQuery(
		getAllProductsQueryOptions({ userId: user.id }),
	);
	const columns = useProductTableColumns();
	const toolbarActions = useProductTableToolbarActions();
	const rowActions = useProductTableRowActions();

	return (
		<DataTable
			columns={columns}
			data={data}
			isLoading={isFetching}
			toolbarActions={toolbarActions}
			rowActions={rowActions}
			defaultSort={{
				id: 'createdAt',
				desc: true,
			}}
		/>
	);
};
