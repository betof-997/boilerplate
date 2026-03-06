import { DataTable } from '@/components/data-table';
import { getAllProductsQueryOptions } from '@/query-options/productQueryOptions';
import { useQuery } from '@tanstack/react-query';
import {
	useProductTableColumns,
	useProductTableRowActions,
	useProductTableToolbarActions,
} from './utils';
import { useSelectedOrganization } from '../../../-lib/hooks/use-selected-organization';

export const ProductTable = () => {
	const selectedOrganization = useSelectedOrganization();

	const { data, isFetching } = useQuery(
		getAllProductsQueryOptions({ organizationId: selectedOrganization.id }),
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
