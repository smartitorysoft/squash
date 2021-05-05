import React from 'react';
import { useSelector } from 'react-redux';

import pageRedirect from 'lib/pageRedirect';
import { setError, clearError } from 'store/error/actions';
import Error from 'pages/404';

export const withErrorPage = (ChildComponent) => {
	const errorPage = (props) => {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const error = useSelector((state) => state.error);

		const propsNoStore = {
			...props,
		};

		delete propsNoStore.store;

		if (error) {
			switch (error.code) {
				case 'INTERNAL_SERVER_ERROR':
					return <Error status="INTERNAL_SERVER_ERROR" />;
				case 'UNAUTHORIZED':
					return <Error status="UNAUTHORIZED" />;
				case 'NETWORK_ERROR':
					return <Error status="NETWORK_ERROR" />;
				case 'PAGE_NOT_FOUND':
					return <Error status="PAGE_NOT_FOUND" />;
				default:
					return <Error status="PAGE_NOT_FOUND" />;
			}
		} else {
			return <ChildComponent {...propsNoStore} />;
		}
	};

	errorPage.getInitialProps = async (ctx) => {
		const { store } = ctx;

		let props = {};

		try {
			await store.dispatch(clearError());
			props =
				(ChildComponent.getInitialProps
					? await ChildComponent.getInitialProps(ctx)
					: null) || {};
		} catch (error) {
			if (error.code === '200aa06') {
				return pageRedirect({ url: '/sign-out' }, ctx);
			}

			await store.dispatch(setError(error));
		}

		return props;
	};

	return errorPage;
};
