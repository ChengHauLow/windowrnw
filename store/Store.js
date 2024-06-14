import { configureStore } from '@reduxjs/toolkit';
import UserReducer from './UserSlice.js'
import GeneralReducer from './GeneralSlice.js'

const store = configureStore({
    reducer: {
        user: UserReducer,
        general: GeneralReducer
    }
})

export default store;