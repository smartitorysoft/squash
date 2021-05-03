import React from 'react';

import pageRedirect from 'lib/pageRedirect';
import Page from 'views/TimeSheet';

const TimeSheetPage = (props) => <Page {...props} />;

TimeSheetPage.getInitialProps = async (ctx) => {
	try {
		await pageRedirect({ auth: true, url: '/sign-in' }, ctx);
	} catch (error) {
		throw error;
	}
	return {
		namespacesRequired: ['error', 'global', 'timesheet'],
	};
};

export default TimeSheetPage;
