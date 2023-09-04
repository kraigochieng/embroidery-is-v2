import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { admin } from "../../axiosInstances";
import { useNavigate } from "react-router-dom";

const initialState = {
    loading: false,
    data: [],
    error: ""
}


export const getUsers = createAsyncThunk("users/getUsers", async () => {
    let response = await admin.get("users")
    return response.data
})

export const putUser = createAsyncThunk("users/putUser", async (userForm) => {
    let response = await admin.put(`users/${userForm.id}`, userForm)
    return response.data
})

export const postUser = createAsyncThunk("users/postUser", async (userForm) => {
    let response = await admin.post("users", userForm)
    return response.data
})

export const deleteUser = createAsyncThunk("users/deleteUser", async (id) => {
    await admin.delete(`users/${id}`)
    return id
})

const usersSlice = createSlice({
    name: "users",
    initialState,
    extraReducers: (builder) => {
        builder
            // Get Users
            .addCase(getUsers.pending, (state) => {
                state.loading = true
            })

            .addCase(getUsers.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload
                state.error = ""
            })

            .addCase(getUsers.rejected, (state, action) => {
                state.loading = false
                state.data = []
                state.error = action.error.message                
            })

            // Put Users
            .addCase(putUser.pending, (state) => {
                state.loading = true
            })

            .addCase(putUser.fulfilled, (state, action) => {
                state.loading = false
                state.data = state.data.map(user => {
                    return user.id == action.payload.id ?
                    action.payload :
                    user
                })
                state.error = ""
            })

            .addCase(putUser.rejected, (state, action) => {
                state.loading = false
                state.data = []
                state.error = action.payload
            })

            // Post User
            .addCase(postUser.pending, (state) => {
                state.loading = true
            })

            .addCase(postUser.fulfilled, (state, action) => {
                state.loading = false
                state.data = [...state.data, action.payload]
                state.error = ""
            })

            .addCase(postUser.rejected, (state, action) => {
                state.loading = false
                state.data = []
                state.error = action.payload
            })

            // Post User
            .addCase(deleteUser.pending, (state) => {
                state.loading = true
            })

            .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = false
                state.data = state.data.filter(user => user.id != action.payload)
                state.error = ""
            })

            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false
                state.data = []
                state.error = action.payload
            })

            
    }
})

export const usersReducer = usersSlice.reducer