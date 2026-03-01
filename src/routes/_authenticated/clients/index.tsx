import { createFileRoute } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';
import { ClientDataTable } from './-lib/client-data-table';
import z from 'zod';
import { ClientUpsertDrawer } from './-lib/client-upsert-drawer';

const clientSearchSchema = z.object({
	isCreating: z.boolean().optional(),
	editId: z.string().optional(),
});

export const Route = createFileRoute('/_authenticated/clients/')({
	validateSearch: zodValidator(clientSearchSchema),
	component: ClientsPage,
});

function ClientsPage() {
	return (
		<main className='p-8'>
			<h1 className='text-2xl font-semibold'>Clients</h1>

			<ClientDataTable />

			<ClientUpsertDrawer />
		</main>
	);
}
