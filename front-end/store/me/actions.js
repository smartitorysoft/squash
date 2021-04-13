export const LOAD_ME = 'LOAD_ME';
export const loadMe = () => (dispatch, getState, { jsonApi }) => {
	jsonApi()
		.get('users/me')
		.then((res) => {
			dispatch({
				type: LOAD_ME,
				payload: res.data,
			});
		})
		.catch((e) => console.log('LoadMe error', e));
};
