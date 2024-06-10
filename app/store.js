import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/authSlice,js'

export const store = configureStore({
    reducer: {
        // Add the generated reducer as a specific top-level slice
        auth: authReducer,
    }
})