import { createSlice } from '@reduxjs/toolkit';
import { Alert } from 'react-native';

const UserSlice = createSlice({
    name: 'user',
    initialState: {
        name: '',
        user_id:'',
        isLogin: false,
        userInfo:{}
    },
    reducers: {
        updateName: (state, action) => {
            state.name = action.payload;
        },
        updateUserId: (state, action) => {
            state.user_id = action.payload;
        },
        setUser: (state, action) => {
            state.userInfo = action.payload;
        },
        registerUser: (state, action) => {
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.password = action.payload.password;
            state.isLogin = false;
            Alert.alert("注册成功", '已成功注册，请前往登入');
        },
        loginUser: (state, action) => {
            state.isLogin = true;
            state.user_id = action.payload.user_id;
            state.name = action.payload.name;
        },
        logoutUser: (state) => {
            state.isLogin = false;
            state.name = '';
            state.user_id = '';
            state.userInfo = {};
        }
    }
})

export const { getAllUsers, updateName, updateAge, registerUser, loginUser, logoutUser, setUser, updateUserId } = UserSlice.actions;

export default UserSlice.reducer;