import * as Types from '../actions/types'

const init={
    botMessages:[],
    botMessage:[],
    message:"",
    errors:{},
    isLoading:true,
}
const botMessageReducer=(state=init,action)=>{
    switch (action.type) {
        case Types.LOAD_BOT_MESSAGE:
            return {
                ...state,
                errors:{},
                message:"",
                isLoading:false,
                botMessages:action.payload.botMessages
            }
        case Types.ADD_BOT_MESSAGE:
            let botMessagess=[...state.botMessages]
            botMessagess.unshift(action.payload.botMessage)
            return {
                ...state,
                botMessages:botMessagess,
                errors:{},
                isLoading:false,
                message:action.payload.message
            }
        case Types.UPDATE_BOT_MESSAGE:
            let botMessages = [...state.botMessages]
            let newbotMessages=botMessages.map(botMessage => {
                if (botMessage._id === action.payload.botMessage._id) {
                    return action.payload.botMessage
                }
                return botMessage
            });
            return{
                ...state,
                isLoading:false,
                botMessages:newbotMessages,
                message:action.payload.message
            }
        case Types.BOT_MESSAGE_ERRORS:
            return {
                ...state,
                isLoading:false,
                errors:action.payload.errors
            }
        default:
            return state
    }
}
export default botMessageReducer;