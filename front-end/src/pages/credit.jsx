import React from 'react';

import pageRedirect from 'lib/pageRedirect';
import Page from 'views/Credit';
import { loadLocaleFromCtx } from 'lib/loadLocaleFromCtx';

const Credit = (props) => <Page {...props} />;

Credit.getInitialProps = async (ctx) => {
	// ide fog kelleni a try-catch
	// eslint-disable-next-line no-useless-catch
	try {
		await pageRedirect({ auth: true, url: '/sign-in' }, ctx);
	} catch (error) {
		throw error;
	}
	return {
		defaultNamespace: 'credit',
		...(await loadLocaleFromCtx(ctx)),
	};
};

export default Credit;
