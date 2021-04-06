export const LOG_IN = 'LOG_IN'
export const login = (data) => (dispatch, getState, {api}) => {
    //TODO
    dispatch({
        type: LOG_IN,
        payload: {}
    })
}

export const LOG_OUT = 'LOG_OUT'
export const logout = () => (dispatch, getState, {api}) => {
    dispatch({
        type:LOG_OUT,
        payload: null
    })
}