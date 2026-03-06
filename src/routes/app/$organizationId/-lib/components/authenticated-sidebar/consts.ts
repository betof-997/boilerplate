import { LayoutDashboardIcon, PackageIcon, UsersIcon } from 'lucide-react';
import type { AuthenticatedSidebarNavItem } from './types';

export const authenticatedSidebarNavItems: AuthenticatedSidebarNavItem[] = [
	{
		type: 'link',
		label: 'Dashboard',
		to: '/app/$organizationId/dashboard',
		icon: LayoutDashboardIcon,
	},
	{
		type: 'group',
		label: 'Management',
		subItems: [
			{
				label: 'Products',
				to: '/app/$organizationId/products',
				icon: PackageIcon,
			},
			{
				label: 'Clients',
				to: '/app/$organizationId/clients',
				icon: UsersIcon,
			},
		],
	},
];
