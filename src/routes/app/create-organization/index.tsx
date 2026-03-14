import { createFileRoute, getRouteApi } from '@tanstack/react-router';
import { useCreateOrganizationDefaultValues } from './-lib/utils';
import { useAppForm } from '@/hooks/use-app-form';
import { insertOrganizationFormSchema } from '@/schemas/organizationSchemas';
import { Button } from '@/components/button';
import { ChevronLeftIcon } from 'lucide-react';
import { useLogOut } from '@/hooks/use-log-out/useLogOut';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { createOrganizationMutationOptions } from '@/query-options/organizationQueryOptions';
import { getUserOrganizationsQueryOptions } from '@/query-options/organizationMemberQueryOptions';
import { useUser } from '../-lib/hooks/use-user';

export const Route = createFileRoute('/app/create-organization/')({
	component: RouteComponent,
});

const appRouteApi = getRouteApi('/app');

function RouteComponent() {
	const user = useUser();
	const navigate = appRouteApi.useNavigate();

	const { data: organizations } = useSuspenseQuery(
		getUserOrganizationsQueryOptions({
			userId: user.id,
		}),
	);
	const { handleLogOut } = useLogOut();

	const { mutateAsync: createOrganization } = useMutation(
		createOrganizationMutationOptions(),
	);

	const defaultValues = useCreateOrganizationDefaultValues();
	const form = useAppForm({
		defaultValues,
		validators: {
			onChange: insertOrganizationFormSchema,
		},
		onSubmit: async ({ value }) => {
			const organization = await createOrganization({
				...value,
				userId: user.id,
			});

			navigate({
				to: '/app/$organizationId',
				params: { organizationId: organization.id },
			});
		},
	});

	const handleGoBack = () => {
		const firstOrganization = organizations[0];

		if (firstOrganization) {
			navigate({
				to: '/app/$organizationId',
				params: { organizationId: firstOrganization.id },
			});
			return;
		}

		handleLogOut();
	};

	return (
		<div className='h-screen w-full overflow-hidden flex items-center justify-center'>
			<div
				className='absolute inset-0 bg-cover bg-center blur-md -z-10'
				style={{ backgroundImage: "url('/soft-green-bg.png')" }}
			/>

			<div className='h-min w-[80%] flex p-3 rounded-2xl bg-background/90 shadow-xl'>
				<section className='hidden w-5/12 bg-muted md:block lg:w-5/8'>
					<img
						src='/soft-green-bg.png'
						alt='Soft green abstract background'
						className='h-full w-full object-cover rounded-xl'
					/>
				</section>

				<section className='flex w-full flex-col justify-center px-12 py-6 items-center'>
					<div className='max-w-lg w-full flex flex-col items-center gap-10'>
						<div className='w-full'>
							<Button
								variant='secondary'
								size='sm'
								className='w-fit'
								isGhost={true}
								onClick={handleGoBack}
							>
								<ChevronLeftIcon className='size-4' />
								<span>Go back</span>
							</Button>
						</div>

						<header className='text-center flex flex-col items-center'>
							<img
								src='/logo.png'
								alt='Organization logo'
								className='size-20'
							/>
							<h1 className='text-2xl font-semibold text-foreground'>
								Create new Organization
							</h1>
							<p className='text-sm text-muted-foreground'>
								Complete your organization details to create a new organization.
							</p>
						</header>

						<form.Root form={form}>
							<form.Group>
								<form.Group>
									<form.AppField
										name='name'
										children={(field) => (
											<field.TextInput
												label='Company Name'
												placeholder='Acme Inc.'
												description='Use your business name'
											/>
										)}
									/>
									<form.AppField
										name='email'
										children={(field) => (
											<field.TextInput
												label='Email'
												placeholder='john@acmeinc.com'
											/>
										)}
									/>
								</form.Group>

								<form.Group className='grid grid-cols-2'>
									<form.AppField
										name='address.addressLine1'
										children={(field) => (
											<field.TextInput
												label='Address Line 1'
												placeholder='123 Main St.'
											/>
										)}
									/>
									<form.AppField
										name='address.addressLine2'
										children={(field) => (
											<field.TextInput
												label='Address Line 2'
												placeholder='Apt. 100'
											/>
										)}
									/>
									<form.AppField
										name='address.city'
										children={(field) => (
											<field.TextInput
												label='City'
												placeholder='Anytown'
											/>
										)}
									/>
									<form.AppField
										name='address.state'
										children={(field) => (
											<field.TextInput
												label='State'
												placeholder='CA'
											/>
										)}
									/>
									<form.AppField
										name='address.country'
										children={(field) => (
											<field.TextInput
												label='Country'
												placeholder='United States'
											/>
										)}
									/>
									<form.AppField
										name='address.zip'
										children={(field) => (
											<field.TextInput
												label='Zip'
												placeholder='12345'
											/>
										)}
									/>
								</form.Group>

								<form.SubmitButton className='w-full'>
									Create Organization
								</form.SubmitButton>
							</form.Group>
						</form.Root>
					</div>
				</section>
			</div>
		</div>
	);
}
