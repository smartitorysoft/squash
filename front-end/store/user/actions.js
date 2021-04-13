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

