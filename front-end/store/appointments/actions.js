export const GET_APPOINTMENTS = 'GET_APPOINTMENTS'
export const getAppointments = () => (dispatch, getState, {jsonApi}) => {
    jsonApi()
    .get(`appointments`)
    .then(res => {
        console.log("res");
        dispatch({
            type: GET_APPOINTMENTS,
            payload: res,data
        })
    })
    .catch(e => console.log("get appointments error", e))
}

export const MAKE_APPOINTMENT = 'MAKE_APPOINTMENT'
export const makeAppointment = (data) => (dispatch, getState, {jsonApi}) => {
    jsonApi()
    .post(`appointments`, data)
    .then(res => {
        dispatch(getAppointments())
    })
    .catch(e => console.log("make appointment error", e))
}