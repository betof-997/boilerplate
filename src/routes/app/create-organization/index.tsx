import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/app/create-organization/')({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/_authenticated/create-organization/"!</div>;
}
