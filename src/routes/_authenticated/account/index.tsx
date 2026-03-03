import { createFileRoute } from '@tanstack/react-router';
import { Route as AuthenticatedRoute } from '../route';

export const Route = createFileRoute('/_authenticated/account/')({
	component: AccountPage,
});

function AccountPage() {
	const { user } = AuthenticatedRoute.useRouteContext();

	return (
		<main className='p-8'>
			<h1 className='text-2xl font-semibold'>Account</h1>
			<p className='mt-2 text-muted-foreground'>{user.email}</p>
		</main>
	);
}
