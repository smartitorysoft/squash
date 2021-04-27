import { HYDRATE } from 'next-redux-wrapper';
import { LOG_IN, LOG_OUT } from './actions';

const INITIAL_STATE = {
	email: '',
	isSignedIn: false,
};

export const auth = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case HYDRATE:
			console.log(action.type, action.payload.auth);

			return action.payload.auth;
		case LOG_IN:
			return { ...state, isSignedIn: action.payload };
		case LOG_OUT:
			return INITIAL_STATE;
		default:
			return state;
	}
};

export default auth;
