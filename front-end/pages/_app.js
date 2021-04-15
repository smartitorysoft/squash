import { Provider } from 'react-redux';
import '../styles/globals.css';
import App from 'next/app';
import {wrapper } from '../store/store'
import withRedux from 'next-redux-wrapper'

function MyApp({ Component, pageProps }) {
	return (
		<Component {...pageProps} />
	);
}

MyApp.getInitialProps = async (ctx) => {
	const appProps = await App.getInitialProps(ctx);
	return { ...appProps };
};

export default wrapper.withRedux(MyApp);
