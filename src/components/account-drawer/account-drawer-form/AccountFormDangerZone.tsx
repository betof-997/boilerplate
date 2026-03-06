import { Button } from '@/components/button';
import { ToggleSection } from '@/components/toggle-section';
import { AccountConfirmDeleteDialog } from '../account-confirm-delete-dialog';
import { useState } from 'react';

export const AccountFormDangerZone = () => {
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

	const handleDeleteClick = () => {
		setIsDeleteDialogOpen(true);
	};

	return (
		<>
			<ToggleSection.Root variant='destructive'>
				<ToggleSection.Header>
					<ToggleSection.Title>Danger Zone</ToggleSection.Title>
					<ToggleSection.Description>
						Delete account permanently
					</ToggleSection.Description>
				</ToggleSection.Header>

				<ToggleSection.Content>
					<div className='flex flex-col gap-4 pt-1'>
						<div>
							<p className=''>
								Before deleting your account, review what happens next:
							</p>

							<ul className='list-disc space-y-0.5 pl-4'>
								<li>
									All your profile data and saved preferences are removed.
								</li>
								<li>Connected sessions are signed out immediately.</li>
								<li>This action cannot be undone after confirmation.</li>
							</ul>
						</div>

						<Button
							variant='destructive'
							onClick={handleDeleteClick}
						>
							Delete Account
						</Button>
					</div>
				</ToggleSection.Content>
			</ToggleSection.Root>

			<AccountConfirmDeleteDialog
				open={isDeleteDialogOpen}
				onOpenChange={setIsDeleteDialogOpen}
			/>
		</>
	);
};
