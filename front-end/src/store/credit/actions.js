export const GIVE_CREDIT = 'GIVE_CREDIT';
export const giveCredit = (data) => (dispatch, getState, { jsonApi }) =>
	jsonApi()
		.post(`payments/${data.id}`, { value: data.value })
		.then((res) => {
			dispatch({
				type: GIVE_CREDIT,
				payload: res.data,
			});
		});

export const CREDIT_HISTORY = 'CREDIT_HISTORY';
export const getUserCreditHistory = (data) => (
	dispatch,
	getState,
	{ jsonApi },
) =>
	jsonApi()
		.get(`payments/history/${data}`)
		.then((res) => {
			dispatch({
				type: CREDIT_HISTORY,
				payload: res.data,
			});
			Promise.resolve();
		});
