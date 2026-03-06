import { useAppForm } from '@/hooks/use-app-form';
import { upsertClientFormSchema } from '@/schemas/clientSchemas';
import { useClientUpsertFormDefaultValues } from './utils';
import { Drawer } from '@/components/drawer';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
	createClientMutationOptions,
	getClientByIdQueryOptions,
	updateClientMutationOptions,
} from '@/query-options/clientQueryOptions';
import { getRouteApi } from '@tanstack/react-router';
import { useSelectedOrganization } from '../../../-lib/hooks/use-selected-organization';

const clientsRouteApi = getRouteApi('/app/$organizationId/clients/');

export const ClientUpsertForm = () => {
	const selectedOrganization = useSelectedOrganization();
	const { editId } = clientsRouteApi.useSearch();
	const navigate = clientsRouteApi.useNavigate();
	const isCreating = !editId;

	const { data: client, isFetching: isLoadingClient } = useQuery({
		...getClientByIdQueryOptions({
			id: editId ?? '',
			organizationId: selectedOrganization.id,
		}),
		enabled: !!editId,
	});

	const defaultValues = useClientUpsertFormDefaultValues(client);

	const form = useAppForm({
		defaultValues,
		validators: {
			onChange: upsertClientFormSchema,
		},
		onSubmit: async (values) => {
			if (isCreating) {
				await createClient({
					name: values.value.name,
					email: values.value.email,
					organizationId: selectedOrganization.id,
				});
			} else {
				await updateClient({
					id: editId,
					name: values.value.name,
					email: values.value.email,
					organizationId: selectedOrganization.id,
				});
			}

			navigate({
				to: '.',
				search: { isCreating: undefined, editId: undefined },
			});
		},
	});

	const { mutateAsync: createClient } = useMutation(
		createClientMutationOptions({
			organizationId: selectedOrganization.id,
		}),
	);

	const { mutateAsync: updateClient } = useMutation(
		updateClientMutationOptions({
			organizationId: selectedOrganization.id,
		}),
	);

	return (
		<form.Root
			form={form}
			isLoading={isLoadingClient}
		>
			<Drawer.Body>
				<form.Group>
					<form.AppField
						name='name'
						children={(field) => <field.TextInput label='Name' />}
					/>
					<form.AppField
						name='email'
						children={(field) => <field.TextInput label='Email' />}
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
