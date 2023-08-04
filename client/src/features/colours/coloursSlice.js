import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { server } from "../../axiosInstances";

const initialState = {
    loading: false,
    data: [],
    error: ""
}

export const getColours = createAsyncThunk("colours/getColours", async () => {
    let response = await server.get("admin/colours/get")
    return response.data
})

export const putColour = createAsyncThunk("colours/putColour", async (colour) => {
    let response = await server.put(`admin/colours/put/${colour.id}`, colour)
    return response.data    
})

export const postColour = createAsyncThunk("colours/postColour", async (colour) => {
    let response = await server.post("admin/colours/post", colour)
    return response.data
})

export const deleteColour = createAsyncThunk("colours/deleteColour", async (id) => {
    let response = await server.delete(`admin/colours/delete/${id}`)
    return id
})

const coloursSlice = createSlice({
    name: "colours",
    initialState,
    extraReducers: (builder) => {
        builder
            // Get Colours
            .addCase(getColours.pending, (state) => {
                state.loading = true
            })

            .addCase(getColours.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload
                state.error = ""
            })

            .addCase(getColours.rejected, (state, action) => {
                state.loading = false
                state.data = []
                state.error = action.payload
            })

            

            // Put Colours
            .addCase(putColour.pending, (state) => {
                state.loading = true
            })

            .addCase(putColour.fulfilled, (state, action) => {
                state.loading = false
                console.log(state.data)
                state.data =  state.data.map(colour => {
                    return colour.id === action.payload.id ? action.payload : colour
                })
                state.error = ""
            })

            .addCase(putColour.rejected, (state, action) => {
                state.loading = false
                state.data = []
                state.error = action.payload
            })

            // Post Colours
            .addCase(postColour.pending, (state) => {
                state.loading = true
            })

            .addCase(postColour.fulfilled, (state, action) => {
                state.loading = false
                state.data = [...state.data, action.payload]
                state.error = ""
            })

            .addCase(postColour.rejected, (state, action) => {
                state.loading = false
                state.data = []
                state.error = action.payload
            })

            // Delete Colours
            .addCase(deleteColour.pending, (state) => {
                state.loading = true
            })

            .addCase(deleteColour.fulfilled, (state, action) => {
                state.loading = false
                state.data = state.data.filter(colour => colour.id !== action.payload)
                state.error = ""
            })

            .addCase(deleteColour.rejected, (state, action) => {
                state.loading = false
                state.data = []
                state.error = action.payload
            })
    }

})

export const coloursReducer = coloursSlice.reducer