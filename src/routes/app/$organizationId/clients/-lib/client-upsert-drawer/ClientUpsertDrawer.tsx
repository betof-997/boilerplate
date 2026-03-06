import { Drawer } from '@/components/drawer';
import { getRouteApi } from '@tanstack/react-router';
import { ClientUpsertForm } from '../client-upsert-form';

const clientsRouteApi = getRouteApi('/app/$organizationId/clients/');

export const ClientUpsertDrawer = () => {
	const { isCreating, editId } = clientsRouteApi.useSearch();
	const navigate = clientsRouteApi.useNavigate();

	const isOpen = isCreating || !!editId;
	const title = isCreating ? 'Create Client' : 'Edit Client';

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

				<ClientUpsertForm />
			</Drawer.Content>
		</Drawer.Root>
	);
};
