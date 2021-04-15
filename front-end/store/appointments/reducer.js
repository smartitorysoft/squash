import {GET_APPOINTMENTS} from './actions'

const INITIAL_STATE ={
    appointments:[]
}

export const appointments = (state = INITIAL_STATE, action) => {
    // console.log(action.type, action.payload);
    switch (action.type) {
        case GET_APPOINTMENTS:
            console.log(action.payload);
            return action.payload
        default:
            return state
        }
}

export default appointments