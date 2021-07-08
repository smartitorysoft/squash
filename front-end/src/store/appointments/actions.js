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

export const GET_ALL_APPOINTMENTS = 'GET_ALL_APPOINTMENTS';
export const getAllAppointments = (date) => (dispatch, getState, { jsonApi }) =>
	jsonApi()
		.get(`appointments/admin?from=${date}&days=60`)
		.then((res) => {
			dispatch({
				type: GET_ALL_APPOINTMENTS,
				payload: res.data,
			});
			return Promise.resolve();
		});

export const createAppointmentAdmin = (data) => (
	dispatch,
	getState,
	{ jsonApi },
) =>
	jsonApi()
		.post(`appointments/${data.id}`, data.appointment)
		.then(() => {
			console.log('Appointment created to ', data.id);
			Promise.resolve();
		});

export const deleteAppointment = (data) => (dispatch, getState, { jsonApi }) =>
	jsonApi()
		.delete(`appointments/${data}`)
		.then((res) => console.log('Appointment deleted', res));

export const deleteAppointmentAdmin = (data) => (
	dispatch,
	getState,
	{ jsonApi },
) =>
	jsonApi()
		.delete(`appointments/${data}/admin`)
		.then((res) => console.log('Appointment deleted', res));

export const MAKE_ADMIN_APPOINTMENT = 'MAKE_ADMIN_APPOINTMENT';
export const makeAdminAppointment = (data) => (
	dispatch,
	getState,
	{ jsonApi },
) =>
	jsonApi()
		.post(`appointments/${data.userId}`, data.payload)
		.then(() => {
			console.log('Admin appointment created to:', data);
			Promise.resolve();
		});
