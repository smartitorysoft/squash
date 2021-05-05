import React from 'react';
import '../styles/globals.css';
import App from 'next/app';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import theme from 'theme';
import { SnackbarProvider } from 'components/Snackbar';
import { getMe } from 'store/me/actions';
import { autoSignIn, signInWithRefreshToken } from 'store/auth/actions';
import cookies from 'next-cookies';
import appWithI18n from 'next-translate/appWithI18n';
import { wrapper } from '../store/makeStore';
import i18n from '../../i18n';

const cookieDelArray = ['refreshToken=; Max-Age=0', 'accessToken=; Max-Age=0'];

const SmNext = (props) => {
	const { Component, pageProps } = props;

	React.useEffect(() => {
		const jssStyles = document.querySelector('#jss-server-side');
		if (jssStyles) {
			jssStyles.parentElement.removeChild(jssStyles);
		}
	}, []);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<SnackbarProvider>
				<Component {...pageProps} />
			</SnackbarProvider>
		</ThemeProvider>
	);
};

SmNext.getInitialProps = async (appContext) => {
	const { router, ctx } = appContext;

	const { store, res } = ctx;

	const { accessToken, refreshToken } = cookies(ctx);

	const handleRedirect = () =>
		res.writeHead(302, { Location: '/sign-in' }).end();

	switch (true) {
		case !!accessToken && !!refreshToken:
			try {
				await Promise.all([
					store.dispatch(
						getMe(typeof window === 'undefined' ? accessToken : null),
					),
				]);
				await store.dispatch(autoSignIn());
			} catch (error) {
				try {
					const isRefreshSuccessful = await store.dispatch(
						signInWithRefreshToken(refreshToken, res),
					);

					if (isRefreshSuccessful) {
						await store.dispatch(getMe());
					} else if (router.pathname !== '/sign-in') {
						return handleRedirect();
					}
				} catch (err) {
					if (router.pathname !== '/sign-in') {
						return handleRedirect();
					}
				}
			}
			break;
		case !!accessToken && !refreshToken:
			res.setHeader('Set-Cookie', cookieDelArray);
			break;
		case !accessToken && !!refreshToken:
			try {
				const isRefreshSuccessful = await store.dispatch(
					signInWithRefreshToken(refreshToken, res),
				);

				if (isRefreshSuccessful) {
					await store.dispatch(getMe());
					await store.dispatch(autoSignIn());
				} else if (router.pathname !== '/sign-in') {
					return handleRedirect();
				}
			} catch (err) {
				if (router.pathname !== '/sign-in') {
					return handleRedirect();
				}
			}
			break;
		default:
			break;
	}

	const appProps = await App.getInitialProps(appContext);
	return {
		...appProps,
	};
};

export default wrapper.withRedux(
	appWithI18n(SmNext, {
		...i18n,
		skipInitialProps: false,
	}),
);
