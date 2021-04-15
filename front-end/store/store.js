import getConfig from 'next/config';
import { createStore, applyMiddleware, compose } from 'redux';
import axios from 'axios';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers';

import {createWrapper} from 'next-redux-wrapper'

const { backendApi } = getConfig().publicRuntimeConfig;

const composeEnhancers =  process.env.NODE_ENV === 'development'
	? composeWithDevTools || compose
	: null || compose;

const headers = {
	'X-Disable-Proto': 'enable',
	'X-Authorization-Cookie': 'true',
};

const makeStore = (initialState, ctx) => {
	// console.log(ctx);
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
		initialState,
		composeEnhancers(applyMiddleware(...middleware)),
	);

	return store;
};

export const wrapper = createWrapper(makeStore, {debug: false});