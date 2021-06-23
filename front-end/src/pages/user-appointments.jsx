import React from 'react';

import pageRedirect from 'lib/pageRedirect';
import Page from 'views/UserAppointments';
import { loadLocaleFromCtx } from 'lib/loadLocaleFromCtx';

const UserAppointments = (props) => <Page {...props} />;

UserAppointments.getInitialProps = async (ctx) => {
	await pageRedirect({ auth: true, url: '/sign-in' }, ctx);

	return {
		defaultNamespace: 'user-appointments',
		...(await loadLocaleFromCtx(ctx)),
	};
};

export default UserAppointments;
