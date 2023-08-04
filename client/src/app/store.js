import { configureStore } from "@reduxjs/toolkit"

import { itemsReducer } from "../features/items/itemsSlice"
import { coloursReducer } from "../features/colours/coloursSlice"
import { positionsReducer } from "../features/positions/positionsSlice"
import { usersReducer } from "../features/users/usersSlice"
import { rolesReducer } from "../features/roles/rolesSlice"

const store = configureStore({
    reducer: {
        items: itemsReducer,
        colours: coloursReducer,
        positions: positionsReducer,
        users: usersReducer,
        roles: rolesReducer,
    }
})

export default store