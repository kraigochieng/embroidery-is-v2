import { createContext, useContext } from "react";
import { State, Action } from "../types/colours";

export const ColoursContext = createContext<{
    coloursState: State,
    coloursDispatch: React.Dispatch<Action>
} | undefined>(undefined)

export function useColoursContext()  {
    const coloursContext = useContext(ColoursContext)

    if (coloursContext === undefined) {
        throw new Error("Colours context is undefined")
    }

    return coloursContext
}
