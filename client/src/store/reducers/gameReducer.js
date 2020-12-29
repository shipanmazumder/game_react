import * as Types from '../actions/types'

const init={
    games:[],
    game:{},
    categories:[],
    message:"",
    errors:{}
}
const gameReducer=(state=init,action)=>{
    switch (action.type) {
        case Types.LOAD_CATEGORIES:
            return {
                ...state,
                errors:{},
                categories:action.payload.categories
            }
        case Types.LOAD_GAMES:
            return {
                ...state,
                errors:{},
                games:action.payload.games
            }
        case Types.SET_GAMES:
            let gamess=[...state.games]
            gamess.unshift(action.payload.games)
            return {
                ...state,
                games:gamess,
                errors:{},
                message:action.payload.message
            }
        case Types.SET_GAME:
            return {
                ...state,
                game:action.payload.game
            }
        case Types.GAME_ERRORS:
            return {
                ...state,
                errors:action.payload.errors
            }
        default:
            return state
    }
}
export default gameReducer;