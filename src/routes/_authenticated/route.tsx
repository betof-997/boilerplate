import { Sidebar } from '@/components/sidebar';
import { authSessionQueryOptions } from '@/lib/auth/authServer';
import { Outlet, createFileRoute, redirect } from '@tanstack/react-router';
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

			<section className='flex min-w-0 flex-1 flex-col'>
				<div className='p-2 w-min'>
					<Sidebar.Trigger />
				</div>

				<Outlet />
			</section>
		</Sidebar.Root>
	);
}
