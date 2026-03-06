import { Drawer } from '@/components/drawer';
import { AccountFormDangerZone } from './AccountFormDangerZone';
import { useAppForm } from '@/hooks/use-app-form';
import { updateUserFormSchema } from '@/schemas/userSchemas';
import { useAccountDrawerFormDefaultValues } from './utils';
import { TextInput } from '@/components/text-input';
import { useUser } from '@/routes/app/-lib/hooks/use-user/useUser';

export const AccountDrawerForm = () => {
	const user = useUser();
	const defaultValues = useAccountDrawerFormDefaultValues();

	const form = useAppForm({
		defaultValues,
		validators: {
			onChange: updateUserFormSchema,
		},
	});

	return (
		<Drawer.Body>
			<form.Root form={form}>
				<form.Group>
					<form.AppField
						name='name'
						children={(field) => <field.TextInput label='Name' />}
					/>
					<TextInput
						label='Email'
						readOnly
						value={user.email}
						description='Managed by your Google account'
					/>
				</form.Group>

				<div className='py-4'>
					<AccountFormDangerZone />
				</div>

				<Drawer.Footer className='justify-end'>
					<form.Subscribe
						selector={(state) => ({
							isDefaultValue: state.isDefaultValue,
						})}
						children={({ isDefaultValue }) => (
							<form.SubmitButton disabled={isDefaultValue}>
								Save Changes
							</form.SubmitButton>
						)}
					/>
				</Drawer.Footer>
			</form.Root>
		</Drawer.Body>
	);
};
