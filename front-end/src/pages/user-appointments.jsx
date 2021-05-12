import React from 'react';

import pageRedirect from 'lib/pageRedirect';
import Page from 'views/UserAppointments';
import { loadLocaleFromCtx } from 'lib/loadLocaleFromCtx';
import { getUserAppointments } from 'store/appointments/actions';

const UserAppointments = (props) => <Page {...props} />;

UserAppointments.getInitialProps = async (ctx) => {
	const { store } = ctx;
	try {
		await pageRedirect({ auth: true, url: '/sign-in' }, ctx);
		await Promise.all([store.dispatch(getUserAppointments())]);
	} catch (error) {
		throw error;
	}
	return {
		defaultNamespace: 'user-appointments',
		...(await loadLocaleFromCtx(ctx)),
	};
};

export default UserAppointments;
