import {REGISTER_USER} from './actions'

const INITIAL_STATE= {
    email: "",
    password: "",
    role: "",
    profile: {
        firstName: "",
        lastName: "",
        phone: ""
    }
}

export const register = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case REGISTER_USER:
            return action.payload
        default:
            return state;
    }
}

export default register;