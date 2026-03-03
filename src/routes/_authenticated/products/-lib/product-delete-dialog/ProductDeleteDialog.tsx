import { Button } from '@/components/button';
import { Dialog } from '@/components/dialog';
import { useUser } from '@/hooks/use-user';
import { deleteProductMutationOptions } from '@/query-options/productQueryOptions';
import { useMutation } from '@tanstack/react-query';
import { getRouteApi } from '@tanstack/react-router';

const productsRouteApi = getRouteApi('/_authenticated/products/');

export const ProductDeleteDialog = () => {
	const user = useUser();
	const { deleteId } = productsRouteApi.useSearch();
	const navigate = productsRouteApi.useNavigate();
	const isOpen = !!deleteId;

	const { mutateAsync: deleteProduct, isPending } = useMutation(
		deleteProductMutationOptions({
			userId: user.id,
		}),
	);

	const handleClose = () => {
		navigate({
			to: '/products',
			search: { deleteId: undefined },
		});
	};

	const handleDelete = async () => {
		await deleteProduct({
			id: deleteId ?? '',
			userId: user.id,
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
