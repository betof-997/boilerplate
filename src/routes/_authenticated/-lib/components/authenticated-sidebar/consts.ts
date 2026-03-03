import { LayoutDashboardIcon, PackageIcon, UsersIcon } from 'lucide-react';
import type { AuthenticatedSidebarNavItem } from './types';

export const authenticatedSidebarNavItems: AuthenticatedSidebarNavItem[] = [
	{
		type: 'link',
		label: 'Dashboard',
		to: '/dashboard',
		icon: LayoutDashboardIcon,
	},
	{
		type: 'group',
		label: 'Management',
		subItems: [
			{
				label: 'Products',
				to: '/products',
				icon: PackageIcon,
			},
			{
				label: 'Clients',
				to: '/clients',
				icon: UsersIcon,
			},
		],
	},
];
