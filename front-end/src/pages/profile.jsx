import React from 'react';

import pageRedirect from 'lib/pageRedirect';
import Page from 'views/Profile';

const Profile = (props) => <Page {...props} />;

Profile.getInitialProps = async (ctx) => {
	// ide fog kelleni a try-catch
	// eslint-disable-next-line no-useless-catch
	try {
		await pageRedirect({ auth: true, url: '/sign-in' }, ctx);
	} catch (error) {
		throw error;
	}
	return {
		namespacesRequired: ['error', 'global', 'profile'],
	};
};

export default Profile;
