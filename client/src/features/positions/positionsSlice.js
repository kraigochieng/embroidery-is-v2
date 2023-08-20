import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { server } from "../../axiosInstances";

const initialState = {
    loading: false,
    data: [],
    error: "",
}

export const getPositions = createAsyncThunk("positions/getPositions", async() => {
    let response = await server.get("admin/items/get")
    return response.data
})

export const putPosition = createAsyncThunk("positions/putPositions", async(positionForm) => {
    let response = await server.put(`admin/positions/put/${positionForm.positionId}`, positionForm)
    return { positionResponse: response.data, positionForm }
})

export const postPosition = createAsyncThunk("positions/postPosition", async(positionForm) => {
    let response = await server.post(`admin/positions/post/${positionForm.itemId}`, positionForm)
    return { positionResponse: response.data, positionForm }
})

export const deletePosition = createAsyncThunk("positions/deletePosition", async({itemId, positionId}) => {
    let response = await server.delete(`admin/positions/delete/${positionId}`)
    return { itemId, positionId }
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

            // Put Colours
            .addCase(putPosition.pending, (state) => {
                state.loading = true
            })

            .addCase(putPosition.fulfilled, (state, action) => {
                state.loading = false
                console.log(state.data)
                state.data = state.data.map(item => {
                    console.log(action.payload)
                    return item.id === action.payload.positionForm.itemId ?
                    {
                        ...item,
                        positions: item.positions.map(position => {
                            return position.id === action.payload.positionForm.positionId ?
                            {
                                ...action.payload.positionResponse
                            } :
                            position
                        })
                    } :
                    item
                })
                state.error = ""
            })

            .addCase(putPosition.rejected, (state, action) => {
                state.loading = false
                state.data = []
                state.error = action.payload
            })

            // Post Colours
            .addCase(postPosition.pending, (state) => {
                state.loading = true
            })

            .addCase(postPosition.fulfilled, (state, action) => {
                state.loading = false
                state.data = state.data.map(item => {
                    console.log(action.payload)
                    return item.id == action.payload.positionForm.itemId ?
                    {
                        ...item,
                        positions: [...item.positions, action.payload.positionResponse]
                    } :
                    item
                })
                state.error = ""
            })

            .addCase(postPosition.rejected, (state, action) => {
                state.loading = false
                state.data = []
                state.error = action.payload
            })

            // Delete Position
            .addCase(deletePosition.pending, (state) => {
                state.loading = true
            })

            .addCase(deletePosition.fulfilled, (state, action) => {
                state.loading = false
                state.data = state.data.map(item => {
                    return item.id === action.payload.itemId ?
                    {
                        ...item,
                        positions: item.positions.filter(position => position.id !== action.payload.positionId)
                    } :
                    item
                })
                state.error = ""
            })

            .addCase(deletePosition.rejected, (state, action) => {
                state.loading = false
                state.data = []
                state.error = action.payload
            })
    }

})

export const positionsReducer = positionSlice.reducer