import { Link } from '@tanstack/react-router';
import { Sidebar } from '@/components/sidebar';
import { appConfig } from '@/utils/appConfig';
import { SidebarUserMenu } from '../sidebar-user-menu';
import { authenticatedSidebarNavItems } from './consts';
import type { SidebarNavLinkItem } from './types';

export const AuthenticatedSidebar = () => {
	return (
		<Sidebar.Panel
			data-slot='authenticated-sidebar'
			collapsible='icon'
		>
			<div
				data-slot='authenticated-sidebar-header'
				className='flex items-center border-b border-sidebar-border p-2'
			>
				<p className='truncate px-2 text-sm font-semibold text-sidebar-foreground'>
					{appConfig.appName}
				</p>
			</div>

			<Sidebar.Content data-slot='authenticated-sidebar-content'>
				{authenticatedSidebarNavItems.map((item) => {
					if (item.type === 'link') {
						return (
							<Sidebar.Group
								data-slot='authenticated-sidebar-group'
								key={item.label}
							>
								<Sidebar.GroupContent>
									<Sidebar.Menu>
										<SidebarLinkItem
											item={item}
											key={item.label}
										/>
									</Sidebar.Menu>
								</Sidebar.GroupContent>
							</Sidebar.Group>
						);
					}

					return (
						<Sidebar.Group
							data-slot='authenticated-sidebar-group'
							key={item.label}
						>
							<Sidebar.GroupLabel>{item.label}</Sidebar.GroupLabel>
							<Sidebar.GroupContent>
								<Sidebar.Menu>
									{item.subItems.map((subItem) => (
										<SidebarLinkItem
											item={{ ...subItem, type: 'link' }}
											key={`${item.label}-${subItem.label}`}
										/>
									))}
								</Sidebar.Menu>
							</Sidebar.GroupContent>
						</Sidebar.Group>
					);
				})}
			</Sidebar.Content>

			<div
				data-slot='authenticated-sidebar-footer'
				className='border-t border-sidebar-border p-2'
			>
				<Sidebar.Menu>
					<Sidebar.MenuItem>
						<SidebarUserMenu />
					</Sidebar.MenuItem>
				</Sidebar.Menu>
			</div>
		</Sidebar.Panel>
	);
};

type SidebarLinkItemProps = {
	item: SidebarNavLinkItem;
};
const SidebarLinkItem = ({ item }: SidebarLinkItemProps) => {
	return (
		<Sidebar.MenuItem>
			<Sidebar.MenuButton asChild>
				<Link
					to={item.to}
					activeProps={{
						'data-active': true,
					}}
				>
					{item.icon ? <item.icon /> : null}
					<span>{item.label}</span>
				</Link>
			</Sidebar.MenuButton>
		</Sidebar.MenuItem>
	);
};
