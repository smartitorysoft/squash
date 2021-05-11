import React from 'react';

import pageRedirect from 'lib/pageRedirect';
import Page from 'views/Profile';
import { loadLocaleFromCtx } from 'lib/loadLocaleFromCtx';

const Profile = (props) => <Page {...props} />;

Profile.getInitialProps = async (ctx) => {
	try {
		await pageRedirect({ auth: true, url: '/sign-in' }, ctx);
	} catch (error) {
		throw error;
	}
	return {
		defaultNamespace: 'profile',
		...(await loadLocaleFromCtx(ctx)),
	};
};

export default Profile;
