import {combineReducer} from "redux";
import * as actionTypes from "../actions/types";

const initialUserState={
    currentUser:null,
    isLoading:false
}
export const user_reducer=(state=initialUserState,action)=>{
switch(action.type){
    case actionTypes.SET_USER:
    return {
        currentUser:action.payload.currentUser,
        isLoading:true
    }
    default:
    return state;
}
}
const rootReducer=combineReducer({
    user:user_reducer
})
export default rootReducer;