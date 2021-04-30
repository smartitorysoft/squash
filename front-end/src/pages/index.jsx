import React from 'react';

import pageRedirect from 'lib/pageRedirect';
import Page from 'views/Home';

const Index = (props) => <Page {...props} />;

Index.getInitialProps = async (ctx) => {
	try {
		await pageRedirect({ auth: false, url: '/' }, ctx);
	} catch (error) {
		throw error;
	}
	return {
		namespacesRequired: ['error', 'global', 'home'],
	};
};

export default Index;
