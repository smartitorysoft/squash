import getConfig from 'next/config';
import { createStore, applyMiddleware, compose } from 'redux';
import axios from 'axios';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createWrapper } from 'next-redux-wrapper';
import reducers from './reducers';

const { BACKEND_API } = getConfig().publicRuntimeConfig;
const isServer = typeof window === 'undefined';

const composeEnhancers =
	process.env.NODE_ENV === 'development'
		? composeWithDevTools || compose
		: null || compose;

const headers = {
	'X-Disable-Proto': 'enable',
	'X-Authorization-Cookie': 'true',
	'Content-Type': 'application/json',
};

const makeStore = () => {
	if (isServer) {
		const jsonApi = () => {
			const instance = axios.create({
				baseURL: `http://${BACKEND_API.API}/`,
				headers: {
					...headers,
					origin: 'http://next',
				},
				withCredentials: true,
			});
			return instance;
		};

		const middleware = [thunk.withExtraArgument({ jsonApi })];

		return createStore(
			reducers,
			composeEnhancers(applyMiddleware(...middleware)),
		);
	}

	const jsonApi = () => {
		const instance = axios.create({
			baseURL: '/api',
			headers,
			withCredentials: true,
		});
		return instance;
	};

	const middleware = [thunk.withExtraArgument({ jsonApi })];

	return createStore(
		reducers,
		composeEnhancers(applyMiddleware(...middleware)),
	);
};

export const wrapper = createWrapper(makeStore, { debug: false });
