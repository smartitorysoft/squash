import React from 'react';

import pageRedirect from 'lib/pageRedirect';
import Page from 'views/AdminAppointments';
import { loadLocaleFromCtx } from 'lib/loadLocaleFromCtx';
import { getUsers } from 'store/user/actions';
import { getAllAppointments } from 'store/appointments/actions';
import moment from 'moment';

const AdminAppointments = (props) => <Page {...props} />;

AdminAppointments.getInitialProps = async (ctx) => {
	const { store } = ctx;

	await pageRedirect({ auth: false, url: '/sign-in' }, ctx);
	await Promise.all([
		store.dispatch(getAllAppointments(moment(new Date()).format('YYYY-MM-DD'))),
		store.dispatch(getUsers()),
	]);

	return {
		defaultNamespace: 'admin-appointments',
		...(await loadLocaleFromCtx(ctx)),
	};
};

export default AdminAppointments;
