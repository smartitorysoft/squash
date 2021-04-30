import { ContactSupportOutlined } from '@material-ui/icons';

export const GET_APPOINTMENTS = 'GET_APPOINTMENTS';
export const getAppointments =  (date) =>  (dispatch, getState, { jsonApi }) => {
	// console.log("getAppointments", date);
	jsonApi()
		.get(date ? `appointments?from=${date}&days=7` : 'appointments')
		.then((res) => {
			dispatch({
				type: GET_APPOINTMENTS,
				payload: res.data,
			});
		})
		.catch((e) => console.log('get appointments error', e));
};

export const MAKE_APPOINTMENT = 'MAKE_APPOINTMENT';
export const makeAppointment = (data) => (dispatch, getState, { jsonApi }) => {
	jsonApi()
		.post('appointments', data)
		.then((res) => {
			const date = new Date();
			const formattedDate = [date.getFullYear(), date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth(), date.getDate()].join('-');
			dispatch(getAppointments(formattedDate));
		})
		.catch((e) => console.log('make appointment error', e));
};

export const deleteAppointment = (data) => (dispatch, getState, { jsonApi }) => {
	jsonApi()
		.delete(`appointments/${data}`)
		.then((res) => console.log('Appointment deleted'))
		.catch((e) => console.log('Error appointment delete'));
};
