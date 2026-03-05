import { useUser } from '@/hooks/use-user';
import {
	createProductMutationOptions,
	getProductByIdQueryOptions,
	updateProductMutationOptions,
} from '@/query-options/productQueryOptions';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getRouteApi } from '@tanstack/react-router';
import { useProductUpsertFormDefaultValues } from './utils';
import { useAppForm } from '@/hooks/use-app-form';
import { upsertProductFormSchema } from '@/schemas/productSchemas';
import { Drawer } from '@/components/drawer';

const productsRouteApi = getRouteApi('/_authenticated/products/');

export const ProductUpsertForm = () => {
	const user = useUser();
	const navigate = productsRouteApi.useNavigate();
	const { editId } = productsRouteApi.useSearch();
	const isCreating = !editId;

	const { data: product, isFetching: isLoadingProduct } = useQuery({
		...getProductByIdQueryOptions({
			id: editId ?? '',
			userId: user.id,
		}),
		enabled: !!editId,
	});

	const { mutateAsync: createProduct } = useMutation(
		createProductMutationOptions({
			userId: user.id,
		}),
	);
	const { mutateAsync: updateProduct } = useMutation(
		updateProductMutationOptions({
			userId: user.id,
		}),
	);

	const defaultValues = useProductUpsertFormDefaultValues(product);
	const form = useAppForm({
		defaultValues,
		validators: {
			onChange: upsertProductFormSchema,
		},
		onSubmit: async ({ value }) => {
			if (isCreating) {
				await createProduct({
					...value,
					userId: user.id,
				});
			} else {
				await updateProduct({
					id: editId,
					...value,
					userId: user.id,
				});
			}
			navigate({
				to: '/products',
				search: { isCreating: undefined, editId: undefined },
			});
		},
	});

	return (
		<form.Root
			form={form}
			isLoading={isLoadingProduct}
		>
			<Drawer.Body>
				<form.Group>
					<form.AppField
						name='name'
						children={(field) => <field.TextInput label='Name' />}
					/>
					<form.AppField
						name='description'
						children={(field) => <field.TextInput label='Description' />}
					/>
					<form.AppField
						name='price'
						children={(field) => (
							<field.NumberInput
								mode='currency'
								label='Price'
							/>
						)}
					/>
				</form.Group>

				<Drawer.Footer className='justify-end'>
					<Drawer.Close asChild>
						<form.CancelButton />
					</Drawer.Close>
					<form.SubmitButton>
						{isCreating ? 'Create' : 'Update'}
					</form.SubmitButton>
				</Drawer.Footer>
			</Drawer.Body>
		</form.Root>
	);
};
