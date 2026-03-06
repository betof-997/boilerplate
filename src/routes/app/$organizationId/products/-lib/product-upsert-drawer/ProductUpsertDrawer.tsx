import { Drawer } from '@/components/drawer';
import { getRouteApi } from '@tanstack/react-router';
import { ProductUpsertForm } from '../product-upsert-from';

const productsRouteApi = getRouteApi('/app/$organizationId/products/');

export const ProductUpsertDrawer = () => {
	const { isCreating, editId } = productsRouteApi.useSearch();
	const navigate = productsRouteApi.useNavigate();

	const isOpen = isCreating || !!editId;
	const title = isCreating ? 'Create Product' : 'Edit Product';

	const handleClose = () => {
		navigate({
			to: '.',
			search: { isCreating: undefined, editId: undefined },
		});
	};

	return (
		<Drawer.Root
			open={isOpen}
			onOpenChange={handleClose}
		>
			<Drawer.Content>
				<Drawer.Header>
					<Drawer.Title>{title}</Drawer.Title>
				</Drawer.Header>

				<ProductUpsertForm />
			</Drawer.Content>
		</Drawer.Root>
	);
};
