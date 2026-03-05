import { Page } from '@/components/page';
import { createFileRoute } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';
import z from 'zod';
import { ClientDeleteDialog } from './-lib/client-delete-dialog';
import { ClientTable } from './-lib/client-table';
import { ClientUpsertDrawer } from './-lib/client-upsert-drawer';

const clientSearchSchema = z.object({
	isCreating: z.boolean().optional(),
	editId: z.string().optional(),
	deleteId: z.string().optional(),
});

export const Route = createFileRoute('/_authenticated/clients/')({
	validateSearch: zodValidator(clientSearchSchema),
	component: ClientsPage,
});

function ClientsPage() {
	return (
		<Page.Root>
			<Page.Header>
				<Page.Title>Clients</Page.Title>
				<Page.Description>Manage your clients</Page.Description>
			</Page.Header>

			<Page.Content>
				<ClientTable />
			</Page.Content>

			<ClientUpsertDrawer />
			<ClientDeleteDialog />
		</Page.Root>
	);
}
