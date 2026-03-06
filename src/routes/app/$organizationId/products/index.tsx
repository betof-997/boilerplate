import { Page } from '@/components/page';
import { createFileRoute } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';
import z from 'zod';
import { ProductDeleteDialog } from './-lib/product-delete-dialog';
import { ProductTable } from './-lib/product-table';
import { ProductUpsertDrawer } from './-lib/product-upsert-drawer';

const productSearchSchema = z.object({
	isCreating: z.boolean().optional(),
	editId: z.string().optional(),
	deleteId: z.string().optional(),
});

export const Route = createFileRoute('/app/$organizationId/products/')({
	validateSearch: zodValidator(productSearchSchema),
	component: ProductsPage,
});

function ProductsPage() {
	return (
		<Page.Root>
			<Page.Header>
				<Page.Title>Products</Page.Title>
				<Page.Description>Manage your products</Page.Description>
			</Page.Header>

			<Page.Content>
				<ProductTable />
			</Page.Content>

			<ProductUpsertDrawer />
			<ProductDeleteDialog />
		</Page.Root>
	)
}
