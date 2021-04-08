export const REGISTER_USER = 'REGISTER_USER'
export const register = (data) => (dispatch, getState, {jsonApi}) => {
    console.log("data", data);
    jsonApi()
    .post(`users`, data)
    .then(res => {
        console.log('res',res);
        dispatch({
            type: REGISTER_USER,
            payload: res.data
        })
        
    })
    .catch((e) => console.log("Register error", e))
}