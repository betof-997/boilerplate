import { Button } from '@/components/button';
import { Dialog } from '@/components/dialog';
import type { AccountConfirmDeleteDialogProps } from './types';
import { useMutation } from '@tanstack/react-query';
import { deleteAccountServerFn } from '@/lib/auth/authServer';
import { getRouteApi } from '@tanstack/react-router';
import { handleMutationFn } from '@/utils/queryOptionsUtils';

const loginRouteApi = getRouteApi('/');

export const AccountConfirmDeleteDialog = ({
	open,
	onOpenChange,
}: AccountConfirmDeleteDialogProps) => {
	const navigate = loginRouteApi.useNavigate();

	const { mutateAsync: deleteAccount, isPending } = useMutation({
		mutationFn: () => handleMutationFn(() => deleteAccountServerFn()),
		onSuccess: () => {
			navigate({ to: '/' });
		},
	});

	const handleDelete = async () => {
		await deleteAccount();
		onOpenChange(false);
	};

	return (
		<Dialog.Root
			open={open}
			onOpenChange={onOpenChange}
		>
			<Dialog.Content>
				<Dialog.Header>
					<Dialog.Title>Delete Account</Dialog.Title>
				</Dialog.Header>
				<Dialog.Description>
					Are you sure you want to delete your account?
				</Dialog.Description>
				<Dialog.Footer>
					<Button
						variant='destructive'
						onClick={handleDelete}
						isLoading={isPending}
					>
						Delete Account
					</Button>
				</Dialog.Footer>
			</Dialog.Content>
		</Dialog.Root>
	);
};
