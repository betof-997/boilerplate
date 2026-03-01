import { createFileRoute, redirect } from '@tanstack/react-router';
import { ShieldCheck } from 'lucide-react';
import { Badge } from '@/components/badge';
import { Button } from '@/components/button';
import { authClient } from '@/lib/auth/authClient';
import { authSessionQueryOptions } from '@/lib/auth/authServer';
import { appConfig } from '@/utils/appConfig';

export const Route = createFileRoute('/')({
	beforeLoad: async ({ context }) => {
		const session = await context.queryClient.ensureQueryData(
			authSessionQueryOptions,
		);

		if (session) {
			throw redirect({ to: '/dashboard' });
		}
	},
	component: RouteComponent,
});

function RouteComponent() {
	const handleGoogleSignIn = async () => {
		await authClient.signIn.social({
			provider: 'google',
			callbackURL: '/dashboard',
		});
	};

	return (
		<main className='relative min-h-screen overflow-hidden bg-background'>
			<div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,hsl(var(--primary)/0.2),transparent_45%),radial-gradient(circle_at_bottom_right,hsl(var(--primary)/0.15),transparent_35%)]' />

			<section className='relative mx-auto grid min-h-screen w-full max-w-6xl items-center gap-8 px-4 py-10 sm:px-8 lg:grid-cols-2 lg:px-12'>
				<div className='hidden rounded-3xl border border-border/70 bg-primary p-10 text-primary-foreground shadow-2xl lg:block'>
					<Badge
						variant='secondary'
						className='mb-6 bg-primary-foreground/15 text-primary-foreground'
					>
						{appConfig.appDisplayName}
					</Badge>

					<h1 className='text-4xl font-semibold leading-tight'>
						{appConfig.appTagline}
					</h1>
					<p className='mt-4 max-w-md text-sm text-primary-foreground/80'>
						Authentication, routing, and core structure are already set up. Sign
						in and continue building your next product.
					</p>

					<div className='mt-12 flex items-center gap-3 rounded-xl border border-primary-foreground/20 bg-primary-foreground/10 p-4'>
						<div className='rounded-full bg-primary-foreground/15 p-2'>
							<ShieldCheck className='size-4' />
						</div>
						<div>
							<p className='text-sm font-medium'>Secure sign-in flow</p>
							<p className='text-xs text-primary-foreground/75'>
								Trusted OAuth provider with minimal setup.
							</p>
						</div>
					</div>
				</div>

				<div className='mx-auto w-full max-w-md rounded-3xl border border-border/70 bg-card p-8 shadow-lg sm:p-10'>
					<Badge
						variant='default'
						className='mb-5'
					>
						Welcome
					</Badge>
					<h2 className='text-2xl font-semibold tracking-tight text-foreground'>
						Sign in to continue
					</h2>
					<p className='mt-2 text-sm text-muted-foreground'>
						Use your Google account to access the {appConfig.appName} app.
					</p>

					<Button
						onClick={handleGoogleSignIn}
						size='lg'
						className='mt-8 h-11 w-full font-semibold'
					>
						Sign in with Google
					</Button>

					<p className='mt-4 text-center text-xs text-muted-foreground'>
						By continuing, you agree to your app&apos;s terms and privacy
						policy.
					</p>
				</div>
			</section>
		</main>
	);
}
