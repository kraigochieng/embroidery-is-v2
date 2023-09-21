import { Key } from "react"
import { ActionType } from "../enums/ActionType"

export type Position = {
    id: string,
    name: string
}

export type State = {
    loading: boolean,
    data: Position[]
    error: string
}

export type Action = {
    type: ActionType,
    id?: string,
    ids?: Key[],
    positions?: Position[],
    position?: Position,
    error?: string
}

export type PositionFormData = {
    name: string
}