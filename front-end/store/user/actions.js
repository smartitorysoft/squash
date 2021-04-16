export const GET_USERS = 'GET_USERS'
export const getUsers = () => (dispatch, getState, {jsonApi}) => {
    jsonApi()
    .get(`users`)
    .then(res => {
        dispatch({
            type: GET_USERS,
            payload: res.data
        })
    })
    .catch(e => console.log("Get users error", e))
}

export const SET_USER_PROFILE = 'SET_USER_PROFILE'
export const setProfile = (data) => (dispatch, getState, {jsonApi}) => {
    jsonApi()
    .put(`users/${data.id}`, data.details)
    .then(res => {
        console.log("Profile updated");
    })
    .catch(e => console.log("Profile update error", e))
}
