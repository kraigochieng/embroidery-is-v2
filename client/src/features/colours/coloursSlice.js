import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { admin } from "../../axiosInstances";

const initialState = {
    loading: false,
    data: [],
    error: ""
}

export const getColours = createAsyncThunk("colours/getColours", async () => {
    let response = await admin.get("colours")
    return response.data
})

export const putColour = createAsyncThunk("colours/putColour", async ({id, colour}) => {
    let response = await admin.put(`colours/${id}`, colour)
    return response.data    
})

export const postColour = createAsyncThunk("colours/postColour", async (colour) => {
    let response = await admin.post("colours", colour)
    return response.data
})

export const deleteColour = createAsyncThunk("colours/deleteColour", async (id) => {
    let response = await admin.delete(`colours/${id}`)
    return id
})

export const deleteColours = createAsyncThunk("colours/deleteColours", async (colourIds) => {
    let response = await admin.delete("colours", {
        data: {
            ids: colourIds
        }
    })
    return colourIds
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

            // Delete Many Colours at once
            .addCase(deleteColours.pending, (state) => {
                state.loading = true
            })

            .addCase(deleteColours.fulfilled, (state, action) => {
                state.loading = false
                state.data = state.data.filter(colour => !action.payload.includes(colour.id))
                state.error = ""
            })

            .addCase(deleteColours.rejected, (state, action) => {
                state.loading = false
                state.data = []
                state.error = action.payload
            })
    }

})

export const coloursReducer = coloursSlice.reducer