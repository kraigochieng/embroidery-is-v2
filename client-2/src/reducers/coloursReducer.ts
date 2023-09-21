import { ActionType } from "../enums/ActionType"
import { State, Action } from "../types/colours"

export const coloursInitialState: State = {
    loading: false,
    data: [],
    error: ''
}

export function coloursReducer(state: State, action: Action): State {
    switch(action.type) {
        case ActionType.REQUEST:
            return {
                ...state,
                loading: true,
            }
        case ActionType.FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error !== undefined ? action.error : ''
            }
        case ActionType.GET:
            return {
                loading: false,
                data: [...action.colours!],
                error: ''
            }
        case ActionType.POST:
            return {
                loading: false,
                data: [...state.data, action.colour!],
                error: ''
            }
        case ActionType.PUT:
            return {
                loading: false,
                data: state.data.map(colour => colour.id === action.colour!.id ? action.colour! : colour), 
                error: ''
            }
        case ActionType.DELETE:
            return {
                loading: false,
                data: state.data.filter(colour => colour.id !== action.id),
                error: ''
            }
        case ActionType.DELETE_MANY:
            return {
                loading: false,
                data: state.data.filter(colour => !action.ids!.includes(colour.id)),
                error: ''
            }
        default:
            return {...state}

    }
}