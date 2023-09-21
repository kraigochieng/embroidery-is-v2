import { Key } from "react"
import { ActionType } from "../enums/ActionType"

export type Item = {
    id: string,
    name: string
}

export type State = {
    loading: boolean,
    data: Item[]
    error: string
}

export type Action = {
    type: ActionType,
    id?: string,
    ids?: Key[],
    items?: Item[],
    item?: Item,
    error?: string
}

export type ItemFormData = {
    name: string
}