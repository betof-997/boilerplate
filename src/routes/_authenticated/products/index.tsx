import { createFileRoute } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';
import z from 'zod';
import { ProductTable } from './-lib/product-table';
import { ProductUpsertDrawer } from './-lib/product-upsert-drawer';
import { ProductDeleteDialog } from './-lib/product-delete-dialog';

const productSearchSchema = z.object({
	isCreating: z.boolean().optional(),
	editId: z.string().optional(),
	deleteId: z.string().optional(),
});

export const Route = createFileRoute('/_authenticated/products/')({
	validateSearch: zodValidator(productSearchSchema),
	component: ProductsPage,
});

function ProductsPage() {
	return (
		<section>
			<h1 className='text-2xl font-semibold'>Products</h1>

			<ProductTable />
			<ProductUpsertDrawer />
			<ProductDeleteDialog />
		</section>
	);
}
