import { Button } from '@/components/button';
import { ChevronsUpDownIcon } from 'lucide-react';
import { useSelectedOrganization } from '../../hooks/use-selected-organization';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getUserOrganizationsQueryOptions } from '@/query-options/organizationMemberQueryOptions';
import { useUser } from '@/routes/app/-lib/hooks/use-user';

export const SidebarOrganizationSelector = () => {
	const user = useUser();

	const selectedOrganization = useSelectedOrganization();
	const { data: organizations } = useSuspenseQuery(
		getUserOrganizationsQueryOptions({
			userId: user.id,
		}),
	);

	const hasMultipleOrganizations = organizations.length > 1;

	return (
		<section className='flex items-center truncate'>
			<span className='truncate pl-1 text-sm font-semibold text-sidebar-foreground transition-opacity'>
				{selectedOrganization?.name}
			</span>

			{hasMultipleOrganizations && (
				<Button
					variant='secondary'
					isGhost={true}
					size='xxs'
					isIcon={true}
				>
					<ChevronsUpDownIcon className='size-4' />
				</Button>
			)}
		</section>
	);
};
