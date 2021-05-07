export const GET_ME = 'GET_ME';
export const getMe = () => (dispatch, getState, { jsonApi }) =>
	jsonApi()
		.get('users/me')
		.then((res) => {
			dispatch({
				type: GET_ME,
				payload: res,
			});
			return Promise.resolve();
		});
