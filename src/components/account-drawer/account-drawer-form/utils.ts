import { useUser } from '@/routes/app/-lib/hooks/use-user/useUser';

export const useAccountDrawerFormDefaultValues = () => {
	const user = useUser();

	return {
		name: user.name,
	};
};
