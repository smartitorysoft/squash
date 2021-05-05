exports.publicRuntimeConfig = {
	// -- Page url --//
	WEB_URL: 'http://localhost:3200',
	ADMIN_URL: 'http://localhost:3210',
	// -- Google Tag Manager id or false --//
	GTM_TRACKING_ID: false,
	// -- Backend API --//
	BACKEND_API: {
		KEY: process.env.API_KEY,
		API: process.env.API_URL,
		VERSION: process.env.API_VERSION,
	},
	// -- Facebook key or false --//
	FACEBOOK_KEY: process.env.FACEBOOK_KEY,
	// -- Google key or false --//
	GOOGLE_KEY: process.env.GOOGLE_KEY,
};

exports.serverRuntimeConfig = {
	// -- Node server port --//
	NODE_PORT: 3300,
};
