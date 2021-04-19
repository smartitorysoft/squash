import React from 'react';

import pageRedirect from 'lib/pageRedirect';
import Page from 'views/SignIn';

const SignIn = (props) => <Page {...props} />;

SignIn.getInitialProps = async (ctx) => {
	try {
		await pageRedirect({ auth: false, url: '/' }, ctx);
	} catch (error) {
		throw error;
	}
	return {
		namespacesRequired: ['error', 'global', 'sign-in'],
	};
};

export default SignIn;
