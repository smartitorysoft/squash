import { Provider } from 'react-redux';
import '../styles/globals.css';
import App from 'next/app';
import makeStore from '../store/store';

const store = makeStore();
function MyApp({ Component, pageProps }) {
	return (
		<Provider store={store}>
			<Component {...pageProps} />
		</Provider>
	);
}

MyApp.getInitialProps = async (ctx) => {
	const appProps = await App.getInitialProps(ctx);
	return { ...appProps };
};

export default MyApp;
