import { createFileRoute } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';
import { ClientTable } from './-lib/client-table';
import z from 'zod';
import { ClientUpsertDrawer } from './-lib/client-upsert-drawer';
import { ClientDeleteDialog } from './-lib/client-delete-dialog';

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
		<section>
			<h1 className='text-2xl font-semibold'>Clients</h1>

			<ClientTable />
			<ClientUpsertDrawer />
			<ClientDeleteDialog />
		</section>
	);
}
