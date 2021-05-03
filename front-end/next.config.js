/* eslint-disable no-param-reassign */
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

const env = require('./env');
const { i18n } = require('./next-i18n.config');

const nextConfig = {
	serverRuntimeConfig: env.serverRuntimeConfig,
	publicRuntimeConfig: env.publicRuntimeConfig,
	useFileSystemPublicRoutes: true,
	pageExtensions: ['jsx'],
	webpack: (config) => {
		config.plugins.push(
			new MomentLocalesPlugin({
				localesToKeep: ['hu'],
			}),
		);

		return config;
	},
	webpackDevMiddleware: (config) => {
		config.watchOptions = {
			poll: 1000,
			aggregateTimeout: 300,
		};

		return config;
	},
	i18n,
};

module.exports = nextConfig;
