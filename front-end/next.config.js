const env = require('./env');
const i18n = require('./i18n');

module.exports = {
	serverRuntimeConfig: env.serverRuntimeConfig,
	publicRuntimeConfig: env.publicRuntimeConfig,
	useFileSystemPublicRoutes: true,
	pageExtensions: ['jsx'],
	webpack: (config) => config,
	webpackDevMiddleware: (config) => {
		// eslint-disable-next-line no-param-reassign
		config.watchOptions = {
			poll: 1000,
			aggregateTimeout: 300,
		};

		return config;
	},
	i18n: {
		locales: i18n.locales,
		defaultLocale: i18n.defaultLocale,
		localeDetection: false,
	},
	async redirects() {
		return [
			{
				source: '/home',
				destination: '/',
				permanent: true,
			},
		];
	},
};
