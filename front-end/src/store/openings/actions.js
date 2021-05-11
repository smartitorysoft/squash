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
};

export const GET_OPENING_RULES = 'GET_OPENING_RULES';
export const getRules = (date) => (dispatch, getState, { jsonApi }) => {
	console.log("Élnék az álomvilágban");
	jsonApi()
		.get('openings/rules')
		.then((res) => {
			console.log(res);
			dispatch({
				type: GET_OPENING_RULES,
				payload: res.data,
			});
		});
	}

export const DELETE_RULE = 'DELETE_RULE';
export const deleteRule = (data) => (dispatch, getState, { jsonApi }) => jsonApi()
	.put('openings/rules', { delete: data })
	.then((res) =>  res);

export const NEW_RULE = 'NEW_RULE';
export const createRule = (data) => (dispatch, getState, { jsonApi }) =>
	 jsonApi()
		.put('openings/rules', { create: data })
		.then((res) => { console.log('Rules created'); return res; })

export const UPDATE_RULE = 'UPDATE_RULE';
export const updateRule = (data) => (dispatch, getState, { jsonApi }) => {
	console.log(data);
	return jsonApi()
		.put('openings/rules', { update: data })
		.then((res) => res);
};
