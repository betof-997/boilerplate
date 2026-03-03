const appName = 'My App';

export const appConfig = {
	appName,
	appDisplayName: appName,
	appTagline: 'Ship faster with this incredible app!',
	seo: {
		title: appName,
		description: 'Be the best in your field with this incredible solution!',
	},
} as const;
