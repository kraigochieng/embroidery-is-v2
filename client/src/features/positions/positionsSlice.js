import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { admin } from "../../axiosInstances";
import { actions } from "react-table";

const initialState = {
    loading: false,
    data: [],
    error: "",
}

export const getPositions = createAsyncThunk("positions/getPositions", async(itemId) => {
    let response = await admin.get(`items/${itemId}/positions`)
    return response.data
})

export const postPosition = createAsyncThunk("positions/postPosition", async({ position, itemId }) => {
    let response = await admin.post(`items/${itemId}/positions`, position)
    return response.data
})

export const putPosition = createAsyncThunk("positions/putPositions", async({position, positionId}) => {
    let response = await admin.put(`positions/${positionId}`, position)
    return response.data
})

export const deletePosition = createAsyncThunk("positions/deletePosition", async(positionId) => {
    let response = await admin.delete(`positions/${positionId}`)
    return positionId
}) 

export const deletePositions = createAsyncThunk("positions/deletePositions", async(positionIds) => {
    let response = await admin.delete("positions", {
        data: {
            ids: positionIds
        }
    })
    return positionIds
})
export const positionSlice = createSlice({
    name: "positions",
    initialState,
    extraReducers: (builder) => {
        builder
            // Get Positions
            .addCase(getPositions.pending, (state) => {
                state.loading = true
            })

            .addCase(getPositions.fulfilled, (state, action) => {
                state.loading = false
                state.data = [...action.payload]
                state.error = ""
            })

            .addCase(getPositions.rejected, (state, action) => {
                state.loading = false
                state.data = []
                state.error = action.payload
            })

            // Put Positions
            .addCase(putPosition.pending, (state) => {
                state.loading = true
            })

            .addCase(putPosition.fulfilled, (state, action) => {
                state.loading = false
                state.data = state.data.map(position => {   
                    return position.id == action.payload.id ?
                    action.payload :
                    position
                })
                state.error = ""
            })

            .addCase(putPosition.rejected, (state, action) => {
                state.loading = false
                state.data = []
                state.error = action.payload
            })

            // Post Positions
            .addCase(postPosition.pending, (state) => {
                state.loading = true
            })

            .addCase(postPosition.fulfilled, (state, action) => {
                state.loading = false
                state.data = [...state.data, action.payload]
                state.error = ""
            })

            .addCase(postPosition.rejected, (state, action) => {
                state.loading = false
                state.data = []
                state.error = action.payload
            })

            // Delete Positions
            .addCase(deletePosition.pending, (state) => {
                state.loading = true
            })

            .addCase(deletePosition.fulfilled, (state, action) => {
                state.loading = false
                state.data = state.data.filter(position => position.id != action.payload)
                state.error = ""
            })

            .addCase(deletePosition.rejected, (state, action) => {
                state.loading = false
                state.data = []
                state.error = action.payload
            })

            // Delete Positions
            .addCase(deletePositions.pending, (state) => {
                state.loading = true
            })

            .addCase(deletePositions.fulfilled, (state, action) => {
                console.log(action.payload)
                state.loading = false
                state.data = state.data.filter(position => !action.payload.includes(position.id))
                state.error = ""
            })

            .addCase(deletePositions.rejected, (state, action) => {
                state.loading = false
                state.data = []
                state.error = action.payload
            })
    }

})

export const positionsReducer = positionSlice.reducer