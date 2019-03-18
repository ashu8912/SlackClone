import {combineReducers} from "redux";
import * as actionTypes from "../actions/types";

const initialUserState={
    currentUser:null,
    isLoading:true
}
const user_reducer=(state=initialUserState,action)=>{
switch(action.type){
    case actionTypes.SET_USER:
    return {
        currentUser:action.payload.currentUser,
        isLoading:false
    }
    case actionTypes.CLEAR_USER:
    return {
        currentUser:null,
        isLoading:false
    }
    default:
    return state;
}
}
const channelInitialState={
    currentChannel:null
}
const channel_reducer=(state=channelInitialState,action)=>
{
switch(action.type)
{
    case actionTypes.SET_CURRENT_CHANNEL:
    return {
          ...state, 
          currentChannel:action.payload.channel
    }
    default:
    return state;
}
}
const rootReducer=combineReducers({
    user:user_reducer,
    channel:channel_reducer
})
export default rootReducer;