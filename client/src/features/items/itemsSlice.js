import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { server } from "../../axiosInstances"

const initialState = {
    loading: false,
    data: [],
    error: ""
}

export const getItems = createAsyncThunk("items/getItems", async () => {
        let response = await server.get("admin/items/get")
        return response.data
    }) 

export const postItem = createAsyncThunk("items/postItem", async (item) => {
    let response = await server.post("admin/items/post", item)
    return response.data
})

export const putItem = createAsyncThunk("items/putItem", async (item) => {
    let response = await server.put(`admin/items/put/${item.id}`, item)
    return response.data
})
export const deleteItem = createAsyncThunk("items/deleteItem", async (id) => {
    let response = await server.delete(`admin/items/delete/${id}`)
    return id
})

export const deleteItems = createAsyncThunk("items/deleteItems", async (itemIds) => {
    let response = await server.delete("admin/items/delete/list", {
        data: {
            ids: itemIds
        } 
    })
    return itemIds
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
                state.data = state.data.filter(item => !action.payload.includes(item.id))
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
