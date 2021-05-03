import moment from 'moment';

export const SIGN_IN = 'SIGN_IN';
export const signIn = (data) => (dispatch, getState, { jsonApi }) => {
	jsonApi()
		.post('auth', data)
		.then((res) => {
			dispatch({
				type: SIGN_IN,
				payload: res.data.success,
			});
		})
		.catch((e) => console.error('Login error', e));
};

export const SIGN_OUT = 'SIGN_OUT';
export const signOut = () => (dispatch) => {
	dispatch({
		type: SIGN_OUT,
	});
};

export const AUTH = 'AUTH';

export const autoSignIn = (cookie) => {
	const { accessToken, refreshToken } = cookie;

	const splitTypeToken = accessToken.split(' ');

	return async (dispatch) => dispatch({
		type: AUTH,
		payload: {
			token: {
				accessToken: splitTypeToken[1],
				refreshToken,
				tokenType: splitTypeToken[0],
				expiresIn: 3600,
			},
		},
	});
};

export const TOKEN_REFRESH = 'TOKEN_REFRESH';
// eslint-disable-next-line max-len
export const signInWithRefreshToken = (refreshToken, req, res) => async (dispatch, getState, { jsonApi }) => jsonApi()
	.put('/refresh-token', { refreshToken })
	.then((response) => {
		res.cookie('accessToken', `Bearer ${response.token.accessToken}`, {
			expires: moment(new Date()).add(response.token.expiresIn, 's').toDate(),
		});
		res.cookie('refreshToken', response.token.refreshToken);

		return dispatch({
			type: AUTH,
			payload: response,
		});
	});

export const REGISTER_USER = 'REGISTER_USER';
export const register = (data) => (dispatch, getState, { jsonApi }) => {
	jsonApi()
		.post('users', data)
		.catch((e) => console.error('Register error', e));
};
