import { createFileRoute } from '@tanstack/react-router';
import { Page } from '@/components/page';
import { useUser } from '@/hooks/use-user';

export const Route = createFileRoute('/_authenticated/dashboard/')({
	component: DashboardPage,
});

function DashboardPage() {
	const user = useUser();

	return (
		<Page.Root>
			<Page.Header>
				<Page.Title>Dashboard</Page.Title>
			</Page.Header>

			<Page.Content>
				<div className='flex flex-col gap-2 mt-5'>
					<h2>Welcome back, {user.name}.</h2>
				</div>
			</Page.Content>
		</Page.Root>
	);
}
