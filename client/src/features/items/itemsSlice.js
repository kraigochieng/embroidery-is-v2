import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { admin } from "../../axiosInstances"

const initialState = {
    loading: false,
    data: [],
    error: ""
}

export const getItems = createAsyncThunk("items/getItems", async () => {
        let response = await admin.get("items")
        return response.data
    }) 

export const postItem = createAsyncThunk("items/postItem", async (item) => {
    let response = await admin.post("items", item)
    return response.data
})

export const putItem = createAsyncThunk("items/putItem", async ({id, item}) => {
    let response = await admin.put(`items/${id}`, item)
    return response.data
})
export const deleteItem = createAsyncThunk("items/deleteItem", async (id) => {
    let response = await admin.delete(`items/${id}`)
    return id
})

export const deleteItems = createAsyncThunk("items/deleteItems", async (itemsIdsObject) => {
    let response = await admin.delete("items", {
        data: itemsIdsObject
    })
    return itemsIdsObject
})

const itemsSlice = createSlice({
    name: "items",
    initialState,
    extraReducers: (builder) => {
        builder
            // Get Items
            .addCase(getItems.pending, (state) => {
                state.loading = true
            })
            .addCase(getItems.fulfilled, (state, action) => {
                state.loading = false
                state.data = [...action.payload]
                state.error = ""
            })
            .addCase(getItems.rejected, (state, action) => {
                state.loading = false
                state.data = []
                state.error = action.payload
            })
            // Put Item
            .addCase(putItem.pending, (state) => {
                state.loading = true
            })
            .addCase(putItem.fulfilled, (state, action) => {
                state.loading = false
                state.data = state.data.map(item => {
                    return item.id == action.payload.id ? {...action.payload } : item
                })
                state.error = ""
            })
            .addCase(putItem.rejected, (state, action) => {
                state.loading = false
                state.data = []
                state.error = action.payload
            })

            // Post Item
            .addCase(postItem.pending, (state, action) => {
                state.loading = true
            })

            .addCase(postItem.fulfilled, (state, action) => {
                state.loading = false
                state.data = [...state.data, action.payload]
                state.error = ""
            })
            .addCase(postItem.rejected, (state, action) => {
                state.loading = false
                state.data = []
                state.error = action.payload
            })

            // Delete Item
            .addCase(deleteItem.pending, (state) => {
                state.loading = true
            })
            .addCase(deleteItem.fulfilled, (state, action) => {
                state.loading = false
                state.data = state.data.filter(item => item.id !== action.payload)
                state.error = ""
            })
            .addCase(deleteItem.rejected, (state, action) => {
                state.loading = false
                state.data = []
                state.error = action.payload
            })

            // Delete Items
            .addCase(deleteItems.pending, (state) => {
                state.loading = true
            })

            .addCase(deleteItems.fulfilled, (state, action) => {
                state.loading = false
                state.data = state.data.filter(item => !action.payload.ids.includes(item.id))
                state.error = ""
            })
            .addCase(deleteItems.rejected, (state, action) => {
                state.loading = false
                state.data = []
                state.error = action.payload
            })
    }
})

export const itemsReducer = itemsSlice.reducer
