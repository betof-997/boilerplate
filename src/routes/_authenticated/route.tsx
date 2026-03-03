import { Outlet, createFileRoute, redirect } from '@tanstack/react-router';
import { Sidebar } from '@/components/sidebar';
import { authSessionQueryOptions } from '@/lib/auth/authServer';
import { AuthenticatedSidebar } from './-lib/components/authenticated-sidebar';

export const Route = createFileRoute('/_authenticated')({
	beforeLoad: async ({ context }) => {
		const session = await context.queryClient.ensureQueryData(
			authSessionQueryOptions,
		);

		if (!session) {
			throw redirect({ to: '/' });
		}

		return { user: session.user };
	},
	component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
	return (
		<Sidebar.Root>
			<AuthenticatedSidebar />

			<main
				data-slot='authenticated-layout-content'
				className='flex min-w-0 flex-1 flex-col'
			>
				<div className='p-2 w-min'>
					<Sidebar.Trigger />
				</div>

				<div className='min-h-0 flex-1'>
					<Outlet />
				</div>
			</main>
		</Sidebar.Root>
	);
}
