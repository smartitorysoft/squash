import {LOG_IN, LOG_OUT} from './actions'

const INITIAL_STATE={
  email:'',
};

export const auth = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case LOG_IN:  
        return {...state, email:action.payload.email}
      case LOG_OUT:
        return INITIAL_STATE;
      default:
        return state;
    }
  
}

export default auth;