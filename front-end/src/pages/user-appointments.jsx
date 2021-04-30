import React from 'react';

import pageRedirect from 'lib/pageRedirect';
import Page from 'views/UserAppointments';

const UserAppointments = (props) => <Page {...props} />;

UserAppointments.getInitialProps = async (ctx) => {
	try {
		await pageRedirect({ auth: true, url: '/sign-in' }, ctx);
	} catch (error) {
		throw error;
	}
	return {
		namespacesRequired: ['error', 'global', 'user-appointments'],
	};
};

export default UserAppointments;
