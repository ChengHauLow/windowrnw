import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const initialState = {
    user: null,
    isLoading: false,
    isError: false,
    message: "",
    isLoading: false,
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.isLoading = false;
            state.isError = false;
            state.message = "";
        }
    },
    extraReducers: (builder) => {
        
    }
})

export const register = createAsyncThunk("auth/register", async (user, thunkAPI) => {
    console.log(user);
})

export default authSlice.reducer;