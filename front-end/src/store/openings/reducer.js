import { HYDRATE } from 'next-redux-wrapper';
import { GET_OPENINGS, GET_OPENING_RULES } from './actions';

const INITIAL_STATE = {
	openings: [],
	rules: [
		{
			order: '1',
			name: 'Szabad',
			openingHour: '10',
			closingHour: '18',
			id: '123543',
			isDefault: false,
			rule: '?',
		},
	],
};

export const openings = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case HYDRATE:
			return action.payload.openings;
		case GET_OPENINGS:
			return { ...state, openings: action.payload };
		case GET_OPENING_RULES:
			return { ...state, rules: action.payload };
		default:
			return state;
	}
};
