import { useQueryClient } from '@tanstack/react-query';
import { BadgeCheckIcon, ChevronsUpDownIcon, LogOutIcon } from 'lucide-react';
import { DropdownMenu } from '@/components/dropdown-menu';
import { Sidebar } from '@/components/sidebar';
import { authClient } from '@/lib/auth/authClient';
import { Route as AuthenticatedRoute } from '../../../route';
import { useAccountDrawer } from '@/hooks/use-account-drawer/useAccountDrawer';

export const SidebarUserMenu = () => {
	const queryClient = useQueryClient();
	const { user } = AuthenticatedRoute.useRouteContext();
	const setIsAccountDrawerOpen = useAccountDrawer((state) => state.setIsOpen);

	const displayName = user.name ?? user.email;
	const initials = displayName
		.split(' ')
		.filter(Boolean)
		.slice(0, 2)
		.map((part) => part[0]?.toUpperCase() ?? '')
		.join('');

	const handleLogout = async () => {
		await authClient.signOut({
			fetchOptions: {
				onSuccess: () => {
					queryClient.clear();
					window.location.href = '/';
				},
			},
		});
	};

	return (
		<DropdownMenu.Root>
			<DropdownMenu.Trigger asChild>
				<Sidebar.MenuButton
					className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
					size='lg'
				>
					<span
						data-size='default'
						data-slot='avatar'
						className='relative flex size-8 shrink-0 select-none items-center justify-center overflow-hidden rounded-lg bg-sidebar-accent text-sidebar-accent-foreground'
					>
						{user.image ? (
							<img
								alt={displayName}
								className='aspect-square size-full object-cover'
								data-slot='avatar-image'
								src={user.image}
							/>
						) : (
							<span className='text-xs font-medium'>{initials}</span>
						)}
					</span>

					<div className='grid flex-1 text-left text-sm leading-tight'>
						<span className='truncate font-medium'>{displayName}</span>
						<span className='truncate text-xs'>{user.email}</span>
					</div>

					<ChevronsUpDownIcon className='ml-auto size-4' />
				</Sidebar.MenuButton>
			</DropdownMenu.Trigger>

			<DropdownMenu.Content
				align='end'
				className='min-w-56 rounded-lg'
				side='right'
			>
				<DropdownMenu.Label className='p-0 font-normal'>
					<div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
						<span
							data-size='default'
							data-slot='avatar'
							className='relative flex size-8 shrink-0 select-none items-center justify-center overflow-hidden rounded-lg bg-sidebar-accent text-sidebar-accent-foreground'
						>
							{user.image ? (
								<img
									alt={displayName}
									className='aspect-square size-full object-cover'
									data-slot='avatar-image'
									src={user.image}
								/>
							) : (
								<span className='text-xs font-medium'>{initials}</span>
							)}
						</span>

						<div className='grid flex-1 text-left text-sm leading-tight'>
							<span className='truncate font-medium'>{displayName}</span>
							<span className='truncate text-xs'>{user.email}</span>
						</div>
					</div>
				</DropdownMenu.Label>

				<DropdownMenu.Separator />

				<DropdownMenu.Item onSelect={() => setIsAccountDrawerOpen(true)}>
					<BadgeCheckIcon />
					Account
				</DropdownMenu.Item>

				<DropdownMenu.Separator />

				<DropdownMenu.Item onSelect={() => void handleLogout()}>
					<LogOutIcon />
					Log out
				</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	);
};
