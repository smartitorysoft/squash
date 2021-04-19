import React from 'react';
import '../styles/globals.css';
import App from 'next/app';
// import cookies from 'next-cookies';
import { wrapper } from '../store/store';

const SmNext = (props) => {
	const { Component, pageProps } = props;
	return (
		<Component {...pageProps} />
	);
};

SmNext.getInitialProps = async (appContext) => {
	// const { router, ctx } = appContext;

	// const { store, req, res } = ctx;

	// const { render, refreshToken } = ctx.query;

	// // -- Cookie check --//
	// const { accessToken } = cookies(ctx);

	// if (accessToken) {
	// 	await store.dispatch(autoSignIn(cookies(ctx)));

	// 	if (req) {
	// 		try {
	// 			await Promise.all([store.dispatch(getMe())]);
	// 		} catch (error) {
	// 			res.clearCookie('accessToken');
	// 			res.clearCookie('refreshToken');
	// 			return res.redirect('/sign-in');
	// 		}
	// 	}

	// 	await store.dispatch(logged());
	// }

	const appProps = await App.getInitialProps(appContext);
	return { ...appProps };
};

export default wrapper.withRedux(SmNext);
