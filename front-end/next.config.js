module.exports = {
  webpackDevMiddleware: config => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    }

    return config
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    staticFolder: '/static',
    backendApi: process.env.API_URL
  },
	pageExtensions: ['jsx'],
}