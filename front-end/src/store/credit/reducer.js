import { HYDRATE } from 'next-redux-wrapper';
import { CREDIT_HISTORY, GIVE_CREDIT } from './actions';

const INITIAL_STATE = {
	value: '',
	creditHistory: [
		{
			date: '2021-07-01T11:00:00.000Z',
			quantity: 100,
		},
	],
};

export const credit = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case HYDRATE:
			return { ...state, ...action.payload.credit };
		case GIVE_CREDIT:
			return action.payload;
		case CREDIT_HISTORY:
			return { ...state, creditHistory: action.payload };
		default:
			return state;
	}
};

export default credit;
