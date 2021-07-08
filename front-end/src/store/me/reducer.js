import { HYDRATE } from 'next-redux-wrapper';
import { GET_ME } from './actions';

const INITIAL_STATE = {
	info: {
		// id: 'e6504ce9-b736-4df6-880f-a59bf083c082',
		// email: 'vgtamas@example.com',
		// role: 'root',
		// profile: {
		// 	firstName: 'Lorem',
		// 	lastName: 'Ipsum',
		// 	phone: '0755279691',
		// },
		// credit: '499440',
	},
};

export const me = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case HYDRATE:
			return { ...state, ...action.payload.me };
		case GET_ME:
			return action.payload;
		default:
			return state;
	}
};
