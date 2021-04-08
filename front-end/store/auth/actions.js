export const LOG_IN = 'LOG_IN'
export const login = (data) => (dispatch, getState, {jsonApi}) => {
    jsonApi()
    .post(`auth`, data)
    .then(res => {
        dispatch({
            type: LOG_IN,
            payload: res.data.success
        })
    })
    .catch(e => console.log('Login error', e))
    
}

export const LOG_OUT = 'LOG_OUT'
export const logout = () => (dispatch, getState, {api}) => {
    dispatch({
        type:LOG_OUT,
        payload: null
    })
}