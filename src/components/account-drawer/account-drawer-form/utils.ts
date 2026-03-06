import { useUser } from '@/hooks/use-user';

export const useAccountDrawerFormDefaultValues = () => {
	const user = useUser();

	return {
		name: user.name,
	};
};
