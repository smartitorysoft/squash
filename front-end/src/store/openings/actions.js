export const GET_OPENINGS = 'GET_OPENINGS';
export const getOpenings = (date) => (dispatch, getState, { jsonApi }) => {
	jsonApi()
		.get(`openings?from=${date}&days=7`)
		.then((res) => {
			dispatch({
				type: GET_OPENINGS,
				payload: res.data.list,
			});
		})
		.catch((e) => console.log('Get Openings error', e));
};

export const GET_OPENING_RULES = 'GET_OPENING_RULES';
export const getRules = (date) => (dispatch, getState, { jsonApi }) => {
	jsonApi()
		.get('openings/rules')
		.then((res) => {
			// console.log(res);
			dispatch({
				type: GET_OPENING_RULES,
				payload: res.data,
			});
		})
		.catch((error) => console.log('Get Rules error', error));
};
