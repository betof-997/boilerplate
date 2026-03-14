import type { InsertOrganizationForm } from '@/schemas/organizationSchemas';
import { useUser } from '../../-lib/hooks/use-user';

export const useCreateOrganizationDefaultValues =
	(): InsertOrganizationForm => {
		const user = useUser();

		return {
			name: '',
			email: user.email,
			address: {
				addressLine1: '',
				addressLine2: '',
				city: '',
				state: '',
				country: '',
				zip: '',
			},
		};
	};
