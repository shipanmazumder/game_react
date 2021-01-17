import {combineReducers} from "redux"
import authReducer from "./authReducer"
import gameReducer from "./gameReducer"
import botMessageReducer from './botMessageReducer';

const rootReducer=combineReducers({
    auth:authReducer,
    game:gameReducer,
    botMessage:botMessageReducer
});

export default rootReducer;