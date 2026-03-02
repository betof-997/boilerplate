import { Button } from '@/components/button';
import { Dialog } from '@/components/dialog';
import { useUser } from '@/hooks/use-user';
import { deleteClientMutationOptions } from '@/query-options/clientQueryOptions';
import { useMutation } from '@tanstack/react-query';
import { getRouteApi } from '@tanstack/react-router';

const clientsRouteApi = getRouteApi('/_authenticated/clients/');

export const ClientDeleteDialog = () => {
	const user = useUser();

	const { deleteId } = clientsRouteApi.useSearch();
	const navigate = clientsRouteApi.useNavigate();
	const isOpen = !!deleteId;

	const { mutateAsync: deleteClient, isPending } = useMutation(
		deleteClientMutationOptions({
			userId: user.id,
		}),
	);

	const handleClose = () => {
		navigate({
			to: '/clients',
			search: { deleteId: undefined },
		});
	};

	const handleDelete = async () => {
		await deleteClient({
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
					<Dialog.Title>Delete Client</Dialog.Title>
				</Dialog.Header>
				<Dialog.Description>
					Are you sure you want to delete this client?
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
						disabled={isPending}
					>
						Delete
					</Button>
				</Dialog.Footer>
			</Dialog.Content>
		</Dialog.Root>
	);
};
