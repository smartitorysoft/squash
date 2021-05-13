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
export const getAllAppointments = () => (dispatch, getState, { jsonApi }) => {
	console.log('All Appointments');
	jsonApi()
		.get('appointments/admin')
		.then((res) => {
			console.log('res', res.data);
			dispatch({
				type: GET_ALL_APPOINTMENTS,
				payload: res.data,
			});
			return Promise.resolve();
		});
};
export const createAppointmentToUser = (data) => (
	dispatch,
	getState,
	{ jsonApi },
) =>
	jsonApi()
		.post(`appointmenst/${data.id}`, data.appointment)
		.then(() => {
			console.log('Appointment created to ', data.id);
			Promise.resolve();
		});
