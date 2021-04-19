import {GET_USERS} from './actions'

const INITIAL_STATE = {
    users: []
}

export const user = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_USERS:
            return {...state, users:action.payload}
        default:
            return state;
    }
}

export default user;