import * as Types from '../actions/types'

const init={
    games:[],
    game:{},
    categories:[],
    message:"",
    errors:{},
    isLoading:true,
}
const gameReducer=(state=init,action)=>{
    switch (action.type) {
        case Types.LOAD_CATEGORIES:
            return {
                ...state,
                errors:{},
                isLoading:false,
                categories:action.payload.categories
            }
        case Types.LOAD_GAMES:
            return {
                ...state,
                errors:{},
                message:"",
                isLoading:false,
                games:action.payload.games
            }
        case Types.SET_GAMES:
            let gamess=[...state.games]
            gamess.unshift(action.payload.games)
            return {
                ...state,
                games:gamess,
                errors:{},
                isLoading:false,
                message:action.payload.message
            }
        case Types.SET_GAME:
            return {
                ...state,
                game:action.payload.game
            }
        case Types.UPDATE_GAME:
            let games = [...state.games]
            let newGames=games.map(game => {
                if (game._id === action.payload.game._id) {
                    return action.payload.game
                }
                return game
            });
            return{
                ...state,
                isLoading:false,
                games:newGames,
                message:action.payload.message
            }
        case Types.GAME_ERRORS:
            return {
                ...state,
                isLoading:false,
                errors:action.payload.errors
            }
        default:
            return state
    }
}
export default gameReducer;