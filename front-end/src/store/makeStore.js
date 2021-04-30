import getConfig from 'next/config';
import { createStore, applyMiddleware, compose } from 'redux';
import axios from 'axios';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createWrapper } from 'next-redux-wrapper';
import reducers from './reducers';

const { backendApi } = getConfig().publicRuntimeConfig;

const composeEnhancers =  process.env.NODE_ENV === 'development'
	? composeWithDevTools || compose
	: null || compose;

const isServer = typeof window === 'undefined';
const NEXT_REDUX_STORE = 'NEXT_REDUX_STORE';

const headers = {
	'X-Disable-Proto': 'enable',
	'X-Authorization-Cookie': 'true',
};

const makeStore = () => {
	if (isServer) {
		const jsonApi = () => {
			const instance = axios.create({
				baseURL: backendApi,
				headers: {
					...headers,
					'Content-Type': 'application/json',
				},
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
				baseURL: backendApi,
				headers: {
					...headers,
					'Content-Type': 'application/json',
				},
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
