import { Button } from '@/components/button';
import { Dialog } from '@/components/dialog';
import { deleteProductMutationOptions } from '@/query-options/productQueryOptions';
import { useMutation } from '@tanstack/react-query';
import { getRouteApi } from '@tanstack/react-router';
import { useSelectedOrganization } from '../../../-lib/hooks/use-selected-organization';

const productsRouteApi = getRouteApi('/app/$organizationId/products/');

export const ProductDeleteDialog = () => {
	const selectedOrganization = useSelectedOrganization();
	const { deleteId } = productsRouteApi.useSearch();
	const navigate = productsRouteApi.useNavigate();
	const isOpen = !!deleteId;

	const { mutateAsync: deleteProduct, isPending } = useMutation(
		deleteProductMutationOptions({
			organizationId: selectedOrganization.id,
		}),
	);

	const handleClose = () => {
		navigate({
			to: '.',
			search: { deleteId: undefined },
		});
	};

	const handleDelete = async () => {
		await deleteProduct({
			id: deleteId ?? '',
			organizationId: selectedOrganization.id,
		});
		handleClose();
	};
	return (
		<Dialog.Root
			open={isOpen}
			onOpenChange={handleClose}
		>
			<Dialog.Content>
				<Dialog.Header>
					<Dialog.Title>Delete Product</Dialog.Title>
				</Dialog.Header>
				<Dialog.Description>
					Are you sure you want to delete this product?
				</Dialog.Description>

				<Dialog.Footer>
					<Button
						variant='secondary'
						onClick={handleClose}
					>
						Cancel
					</Button>
					<Button
						variant='destructive'
						onClick={handleDelete}
						isLoading={isPending}
					>
						Delete
					</Button>
				</Dialog.Footer>
			</Dialog.Content>
		</Dialog.Root>
	);
};
