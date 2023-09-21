import { ActionType } from "../enums/ActionType"
import { State, Action } from "../types/positions"

export const positionsInitialState: State = {
    loading: false,
    data: [],
    error: ''
}

export function positionsReducer(state: State, action: Action): State {
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
                data: [...action.positions!],
                error: ''
            }
        case ActionType.POST:
            return {
                loading: false,
                data: [...state.data, action.position!],
                error: ''
            }
        case ActionType.PUT:
            return {
                loading: false,
                data: state.data.map(position => position.id === action.position!.id ? action.position! : position), 
                error: ''
            }
        case ActionType.DELETE:
            return {
                loading: false,
                data: state.data.filter(position => position.id !== action.id),
                error: ''
            }
        case ActionType.DELETE_MANY:
            return {
                loading: false,
                data: state.data.filter(position => !action.ids!.includes(position.id)),
                error: ''
            }
        default:
            return {...state}

    }
}