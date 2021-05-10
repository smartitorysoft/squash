import React from 'react';

import pageRedirect from 'lib/pageRedirect';
import Page from 'views/TimeSheet';
import { loadLocaleFromCtx } from 'lib/loadLocaleFromCtx';


const TimeSheetPage = (props) => <Page {...props} />;

TimeSheetPage.getInitialProps = async (ctx) => {
	try {
		await pageRedirect({ auth: true, url: '/sign-in' }, ctx);
	} catch (error) {
		throw error;
	}
	return {
		defaultNamespace: 'timesheet',
		...(await loadLocaleFromCtx(ctx))
	};
};

export default TimeSheetPage;
