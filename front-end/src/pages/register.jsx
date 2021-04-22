import React from 'react';

import pageRedirect from 'lib/pageRedirect';
import Page from 'views/Register';

const Register = (props) => <Page {...props} />;

Register.getInitialProps = async (ctx) => {
	try {
		await pageRedirect({ auth: false, url: '/register' }, ctx);
	} catch (error) {
		throw error;
	}
	return {
		namespacesRequired: ['error', 'global', 'register'],
	};
};

export default Register;
