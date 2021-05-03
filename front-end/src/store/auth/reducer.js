import { HYDRATE } from 'next-redux-wrapper';
import { AUTH, SIGN_IN, SIGN_OUT } from './actions';

const INITIAL_STATE = {
	isSignedIn: true,
	token: null,
};

export const auth = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case HYDRATE:
			return action.payload.auth;
		case AUTH:
			return { ...state, ...action.payload, isSignedIn: true };
		case SIGN_IN:
			return { ...state, isSignedIn: true };
		case SIGN_OUT:
			return INITIAL_STATE;
		default:
			return state;
	}
};

export default auth;
