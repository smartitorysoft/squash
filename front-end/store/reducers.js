import {combineReducers} from 'redux'
import {auth} from "./auth/reducer"
import {me} from "./me/reducer"
import {appointments} from './appointments/reducer'

export default combineReducers({
    auth:auth,
    me:me,
    appointments,
})