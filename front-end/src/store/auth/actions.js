export const LOG_IN = 'LOG_IN';
export const login = (data) => (dispatch, getState, { jsonApi }) => {
	console.log(data);
	jsonApi()
		.post('auth', data)
		.then((res) => {
			dispatch({
				type: LOG_IN,
				payload: res.data.success,
			});
		})
		.catch((e) => console.error('Login error', e));
};

export const LOG_OUT = 'LOG_OUT';
export const logout = () => (dispatch) => {
	dispatch({
		type: LOG_OUT,
		payload: null,
	});
};

export const REGISTER_USER = 'REGISTER_USER';
export const register = (data) => (dispatch, getState, { jsonApi }) => {
	jsonApi()
		.post('users', data)
		.catch((e) => console.error('Register error', e));
};
