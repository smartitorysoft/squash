import { GET_ME } from './actions';

const INITIAL_STATE = {
	info: {},
};

export const me = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case GET_ME:
			return { ...state, info: action.payload };
		default:
			return state;
	}
};
