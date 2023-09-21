import { ActionType } from "../enums/ActionType"
import { State, Action } from "../types/items"

export const itemsInitialState: State = {
    loading: false,
    data: [],
    error: ''
}

export function itemsReducer(state: State, action: Action): State {
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
                data: [...action.items!],
                error: ''
            }
        case ActionType.POST:
            return {
                loading: false,
                data: [...state.data, action.item!],
                error: ''
            }
        case ActionType.PUT:
            return {
                loading: false,
                data: state.data.map(item => item.id === action.item!.id ? action.item! : item), 
                error: ''
            }
        case ActionType.DELETE:
            return {
                loading: false,
                data: state.data.filter(item => item.id !== action.id),
                error: ''
            }
        case ActionType.DELETE_MANY:
            return {
                loading: false,
                data: state.data.filter(item => !action.ids!.includes(item.id)),
                error: ''
            }
        default:
            return {...state}

    }
}