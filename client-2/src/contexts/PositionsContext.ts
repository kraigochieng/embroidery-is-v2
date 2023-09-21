import { createContext, useContext } from "react"
import { Action, State } from "../types/positions"

export const PositionsContext = createContext<{
    positionsState: State
    positionsDispatch: React.Dispatch<Action>
} | undefined>(undefined)

export function usePositionsContext() {
    const positionsContext = useContext(PositionsContext)

    if(positionsContext === undefined) {
        throw new Error("Positions Context is undefined")
    }

    return positionsContext
}