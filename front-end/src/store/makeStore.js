import getConfig from 'next/config';
import { createStore, applyMiddleware, compose } from 'redux';
import axios from 'axios';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createWrapper } from 'next-redux-wrapper';
import reducers from './reducers';

const { BACKEND_API } = getConfig().publicRuntimeConfig;

const composeEnhancers =
	process.env.NODE_ENV === 'development'
		? composeWithDevTools || compose
		: null || compose;

const isServer = typeof window === 'undefined';
const NEXT_REDUX_STORE = 'NEXT_REDUX_STORE';

const headers = {
	'X-Disable-Proto': 'enable',
	'X-Authorization-Cookie': 'true',
	'Content-Type': 'application/json',
};

const makeStore = () => {
	if (isServer) {
		const jsonApi = () => {
			const instance = axios.create({
				baseURL: BACKEND_API.API.replace('localhost', 'nest'),
				headers,
				withCredentials: true,
			});
			return instance;
		};

		const middleware = [thunk.withExtraArgument({ jsonApi })];

		const store = createStore(
			reducers,
			composeEnhancers(applyMiddleware(...middleware)),
		);

		return store;
	}

	if (!window[NEXT_REDUX_STORE]) {
		const jsonApi = () => {
			const instance = axios.create({
				baseURL: BACKEND_API.API,
				headers,
				withCredentials: true,
			});
			return instance;
		};

		const middleware = [thunk.withExtraArgument({ jsonApi })];

		const store = createStore(
			reducers,
			composeEnhancers(applyMiddleware(...middleware)),
		);

		window[NEXT_REDUX_STORE] = store;
	}

	return window[NEXT_REDUX_STORE];
};

export const wrapper = createWrapper(makeStore, { debug: false });
