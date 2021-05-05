import React from 'react';

import pageRedirect from 'lib/pageRedirect';
import Page from 'views/SignUp';

const SignUp = (props) => <Page {...props} />;

SignUp.getInitialProps = async (ctx) => {
	await pageRedirect({ auth: false, url: '/dashboard' }, ctx);

	return {
		namespacesRequired: ['error', 'global', 'register'],
	};
};

export default SignUp;
