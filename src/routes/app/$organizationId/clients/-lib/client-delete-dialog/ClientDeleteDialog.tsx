import { Button } from '@/components/button';
import { Dialog } from '@/components/dialog';
import { deleteClientMutationOptions } from '@/query-options/clientQueryOptions';
import { useMutation } from '@tanstack/react-query';
import { getRouteApi } from '@tanstack/react-router';
import { useSelectedOrganization } from '../../../-lib/hooks/use-selected-organization';

const clientsRouteApi = getRouteApi('/app/$organizationId/clients/');

export const ClientDeleteDialog = () => {
	const selectedOrganization = useSelectedOrganization();

	const { deleteId } = clientsRouteApi.useSearch();
	const navigate = clientsRouteApi.useNavigate();
	const isOpen = !!deleteId;

	const { mutateAsync: deleteClient, isPending } = useMutation(
		deleteClientMutationOptions({
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
		await deleteClient({
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
						isLoading={isPending}
					>
						Delete
					</Button>
				</Dialog.Footer>
			</Dialog.Content>
		</Dialog.Root>
	);
};
