import React from 'react';

import pageRedirect from 'lib/pageRedirect';
import Page from 'views/CreditHistory';
import { loadLocaleFromCtx } from 'lib/loadLocaleFromCtx';

const CreditHistory = (props) => <Page {...props} />;

CreditHistory.getInitialProps = async (ctx) => {
	const { store } = ctx;

	await pageRedirect({ auth: true, url: '/sign-in' }, ctx);

	return {
		defaultNamespace: 'credit-history',
		...(await loadLocaleFromCtx(ctx)),
	};
};

export default CreditHistory;
