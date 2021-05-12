import React from 'react';

import pageRedirect from 'lib/pageRedirect';
import Page from 'views/Credit';
import { loadLocaleFromCtx } from 'lib/loadLocaleFromCtx';
import { getUsers } from 'store/user/actions';

const Credit = (props) => <Page {...props} />;

Credit.getInitialProps = async (ctx) => {
	const { store } = ctx;
	try {
		await pageRedirect({ auth: true, url: '/sign-in' }, ctx);
		await Promise.all([store.dispatch(getUsers())]);
	} catch (error) {
		throw error;
	}
	return {
		defaultNamespace: 'credit',
		...(await loadLocaleFromCtx(ctx)),
	};
};

export default Credit;
