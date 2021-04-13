import {GIVE_CREDIT} from './actions'

const INITIAL_STATE={
    value:'',
}

export const credit = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GIVE_CREDIT:
            console.log(action.payload);
            return action.payload
        default:
            return state;
    }
}

export default credit;