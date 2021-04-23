import { LOAD_ME } from './actions';

const INITIAL_STATE = {
	info: {},
};

export const me = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case LOAD_ME:
			return { ...state, info: action.payload };
		case 'LOREM':
			return { ...state, lorem: 'ipsum' };
		default:
			return state;
	}
};
