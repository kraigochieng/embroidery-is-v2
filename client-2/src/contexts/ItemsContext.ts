import { createContext, useContext } from "react";
import { State, Action } from "../types/items";

export const ItemsContext = createContext<{
    itemsState: State,
    itemsDispatch: React.Dispatch<Action>
} | undefined>(undefined)

export function useItemsContext()  {
    const itemsContext = useContext(ItemsContext)

    if (itemsContext === undefined) {
        throw new Error("Items context is undefined")
    }

    return itemsContext
}
