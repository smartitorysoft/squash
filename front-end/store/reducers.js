import {combineReducers} from 'redux'
import {auth} from "./auth/reducer"
import {me} from "./me/reducer"
import {credit} from "./credit/reducer"

export default combineReducers({
    auth,
    me,
    credit,
})