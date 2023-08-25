import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { admin } from "../../axiosInstances";

const initialState = {
    loading: false,
    data: [],
    error: ""
}

export const getRoles = createAsyncThunk("roles/getRoles", async () => {
    let response = await admin.get("roles/get")
    return response.data
})

export const putRole = createAsyncThunk("roles/putRole", async (roleForm) => {
    let response = await admin.put(`roles/put/${roleForm.id}`, roleForm)
    return response.data
})

export const postRole = createAsyncThunk("roles/postRole", async (roleForm) => {
    let response = await admin.get("roles/post", roleForm)
    return response.data
})

export const deleteRole = createAsyncThunk("roles/deleteRole", async (id) => {
    await admin.delete(`roles/delete/${id}`)
    return id
})

const rolesSlice = createSlice({
    name: "roles",
    initialState,
    extraReducers: (builder) => {
        builder
            // Get Roles
            .addCase(getRoles.pending, (state) => {
                state.loading = true
            })

            .addCase(getRoles.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload
                state.error = ""
            })

            .addCase(getRoles.rejected, (state, action) => {
                state.loading = false
                state.data = []
                state.error = action.payload
            })

            // Put Roles
            .addCase(putRole.pending, (state) => {
                state.loading = true
            })

            .addCase(putRole.fulfilled, (state, action) => {
                state.loading = false
                state.data = state.data.map(role => {
                    return role.id == action.payload.id ?
                    action.payload :
                    role
                })
                state.error = ""
            })

            .addCase(putRole.rejected, (state, action) => {
                state.loading = false
                state.data = []
                state.error = action.payload
            })

            // Post Role
            .addCase(postRole.pending, (state) => {
                state.loading = true
            })

            .addCase(postRole.fulfilled, (state, action) => {
                state.loading = false
                state.data = [...state.data, action.payload]
                state.error = ""
            })

            .addCase(postRole.rejected, (state, action) => {
                state.loading = false
                state.data = []
                state.error = action.payload
            })

            // Delete Role
            .addCase(deleteRole.pending, (state) => {
                state.loading = true
            })

            .addCase(deleteRole.fulfilled, (state, action) => {
                state.loading = false
                state.data = state.data.filter(role => role.id != action.payload)
                state.error = ""
            })

            .addCase(deleteRole.rejected, (state, action) => {
                state.loading = false
                state.data = []
                state.error = action.payload
            })

            
    }
})

export const rolesReducer = rolesSlice.reducer