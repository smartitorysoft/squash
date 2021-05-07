export const SIGN_IN = 'SIGN_IN';
export const signIn = (data) => (dispatch, getState, { jsonApi }) =>
	jsonApi()
		.post('auth', data)
		.then((res) => {
			dispatch({
				type: SIGN_IN,
				payload: res.success,
			});
			return Promise.resolve();
		});

export const SIGN_OUT = 'SIGN_OUT';
export const signOut = () => (dispatch, getState, { jsonApi }) =>
	jsonApi()
		.put('auth/logout')
		.then(() => {
			dispatch({ type: SIGN_OUT });
			return Promise.resolve();
		});

export const autoSignIn = () => ({
	type: SIGN_IN,
	payload: true,
});

export const signInWithRefreshToken = (refreshToken) => async (
	dispatch,
	getState,
	{ jsonApi },
) =>
	jsonApi()
		.put('auth/refresh-token', { refreshToken })
		.then((res) => {
			dispatch({
				type: SIGN_IN,
				payload: res.success,
			});
			return Promise.resolve();
		});

export const REGISTER_USER = 'REGISTER_USER';
export const register = (data) => (dispatch, getState, { jsonApi }) => {
	jsonApi().post('users', data);
};
