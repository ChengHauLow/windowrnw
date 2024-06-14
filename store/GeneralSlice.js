import { createSlice } from '@reduxjs/toolkit';

const GeneralSlice = createSlice({
    name: 'user',
    initialState: {
        msgTime: 1,
        token:'',
        phone:'',
        currentPage:'',
        domain:''
    },
    reducers: {
        updateDomain: (state, action) => {
            state.domain = action.payload;
        },
        updatePhone: (state, action) => {
            state.phone = action.payload;
        },
        updateToken: (state, action) => {
            console.log('set token at redux');
            state.token = action.payload;
        },
        updatePage: (state, action) => {
            state.currentPage = action.payload;
        },
        updateMsgTime: (state, action) => {
            state.msgTime = parseInt(action.payload);
        },
        removeAll: (state) => {
            state.token = '';
            state.phone = '';
            state.msgTime = 0;
            state.currentPage = '';
            state.domain = '';
        }
    }
})

export const { updatePage, updateMsgTime, updateToken, updatePhone, updateDomain, removeAll } = GeneralSlice.actions;

export default GeneralSlice.reducer;