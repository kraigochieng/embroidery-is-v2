import { Key } from "react"
import { ActionType } from "../enums/ActionType"

export type Colour = {
    id: string,
    name: string
}

export type State = {
    loading: boolean,
    data: Colour[]
    error: string
}

export type Action = {
    type: ActionType,
    id?: string,
    ids?: Key[],
    colours?: Colour[],
    colour?: Colour,
    error?: string
}

export type ColourFormData = {
    name: string
}