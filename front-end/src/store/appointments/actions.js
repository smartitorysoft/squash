import { ContactSupportOutlined } from '@material-ui/icons';

export const GET_APPOINTMENTS = 'GET_APPOINTMENTS';
export const getAppointments = (date) => (dispatch, getState, { jsonApi }) =>
	jsonApi()
		.get(date ? `appointments?from=${date}&days=7` : 'appointments')
		.then((res) => {
			dispatch({
				type: GET_APPOINTMENTS,
				payload: res.data,
			});
			return Promise.resolve();
		});

export const MAKE_APPOINTMENT = 'MAKE_APPOINTMENT';
export const makeAppointment = (data) => (dispatch, getState, { jsonApi }) =>
	jsonApi()
		.post('appointments', data)
		.then(() => {
			const date = new Date();
			const formattedDate = [
				date.getFullYear(),
				date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth(),
				date.getDate(),
			].join('-');
			dispatch(getAppointments(formattedDate));
		});

export const deleteAppointment = (data) => (
	dispatch,
	getState,
	{ jsonApi },
) => {
	jsonApi()
		.delete(`appointments/${data}`)
		.then((res) => console.log('Appointment deleted'))
		.catch((e) => console.log('Error appointment delete'));
};

export const GET_USER_APPPOINTMENTS = 'GET_USER_APPOINTMENTS';
export const getUserAppointments = () => (dispatch, getState, { jsonApi }) =>
	jsonApi()
		.get('appointments/mine')
		.then((res) => {
			console.log('user appointments', res);
			dispatch({
				type: GET_USER_APPPOINTMENTS,
				payload: res.data,
			});
			return Promise.resolve();
		})
		.catch((e) => console.log('user appointments error', e));
