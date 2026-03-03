import { TanStackDevtools } from '@tanstack/react-devtools';
import type { QueryClient } from '@tanstack/react-query';
import {
	HeadContent,
	Scripts,
	createRootRouteWithContext,
} from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { getRootRouteHead } from './-lib/getRootRouteHead';
import { Toaster } from '@/components/toaster';
import { tanstackQueryDevtoolsConfig } from '../components/tanstack-query';
import { themeFOUCScript } from '@/hooks/use-theme/useTheme';
import { Tooltip } from '@/components/tooltip';

export type AppRouterContext = {
	queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<AppRouterContext>()({
	head: () => getRootRouteHead(),
	notFoundComponent: () => <div>Not Found</div>,
	errorComponent: () => <div>Error</div>,
	shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en'>
			<head>
				<HeadContent />

				{/** biome-ignore lint/security/noDangerouslySetInnerHtml: this is a script that is used to set the theme and prevent FOUC */}
				<script dangerouslySetInnerHTML={{ __html: themeFOUCScript }} />
			</head>
			<body suppressHydrationWarning={true}>
				<Tooltip.Provider>
					{children}
					<Toaster />
				</Tooltip.Provider>

				<TanStackDevtools
					config={{
						position: 'bottom-right',
					}}
					plugins={[
						{
							name: 'Tanstack Router',
							render: <TanStackRouterDevtoolsPanel />,
						},
						tanstackQueryDevtoolsConfig,
					]}
				/>
				<Scripts />
			</body>
		</html>
	);
}
