const { LANGUAGE } = require('./env').publicRuntimeConfig;

module.exports = {
	i18n: {
		debug: false,
		browserLanguageDetection: LANGUAGE.otherLanguages.length > 0,
		serverLanguageDetection: LANGUAGE.otherLanguages.length > 0,
		defaultNS: 'global',
		localeSubpaths: LANGUAGE.localeSubpaths,
		fallbackLng: LANGUAGE.fallbackLng,

		locales: LANGUAGE.otherLanguages,
		defaultLocale: LANGUAGE.defaultLanguage,

		ignoreRoutes: LANGUAGE.ignoreRoutes,
		detection: {
			lookupCookie: LANGUAGE.cookieName,
			order: ['querystring', 'cookie', 'header'],
		},
	},
};
