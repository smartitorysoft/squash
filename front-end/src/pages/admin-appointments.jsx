import React from 'react';

import pageRedirect from 'lib/pageRedirect';
import Page from 'views/AdminAppointments';
import { loadLocaleFromCtx } from 'lib/loadLocaleFromCtx';
import { getUsers } from 'store/user/actions';
import {
	getAllAppointments,
	getAppointments,
} from 'store/appointments/actions';
import * as moment from 'moment';

const SignIn = (props) => <Page {...props} />;

SignIn.getInitialProps = async (ctx) => {
	const { store } = ctx;
	try {
		await pageRedirect({ auth: true, url: '/sign-in' }, ctx);
		await Promise.all([
			store.dispatch(
				getAllAppointments(moment(new Date()).format('YYYY-MM-DD')),
			),
			store.dispatch(getUsers()),
		]);
	} catch (error) {
		throw error;
	}

	return {
		defaultNamespace: 'admin-appointments',
		...(await loadLocaleFromCtx(ctx)),
	};
};

export default SignIn;
