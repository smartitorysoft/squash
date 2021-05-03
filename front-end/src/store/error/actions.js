//-- Set error --//
export const SET_ERROR = "SET_ERROR";
export const setError = error => {
  return dispatch => {
    return dispatch({
      type: SET_ERROR,
      payload: error
    });
  };
};

//-- Clear error --//
export const CLEAR_ERROR = "CLEAR_ERROR";
export const clearError = () => {
  return dispatch => {
    return dispatch({
      type: CLEAR_ERROR
    });
  };
};
