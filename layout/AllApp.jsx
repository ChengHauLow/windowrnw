import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Navbar from './Navbar';
import { Alert } from 'react-native';
import manager from '../socket/hub-message';
import socketManager from '../socket/hub';
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { removeAll, updateToken } from '../store/GeneralSlice';
import { logoutUser, setUser } from '../store/UserSlice';
import MenuContext from '../context/MenuContext';
import globalWebSocket from '../socket/websocket';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import { useContext } from 'react';
const Stack = createNativeStackNavigator();

const AllApp = () => {
    const { changeCurrentMenu } = useContext(MenuContext)
    // Start Websocket
    let generalInfo = useSelector((state) => state.general);
    console.log(generalInfo.token, 'token now');
    let dispatch = useDispatch();
    let navigate = useNavigation();
    let loginTimes = 1;
    let connectParam = {
        msgTime: generalInfo.msgTime,
        token: generalInfo.token,
        phone: generalInfo.phone,
        currentPage: generalInfo.currentPage
    }
    // globalWebSocket.connect(connectParam, dispatch);
    // if(!generalInfo.token){
    // }
    // End Websocket
    return (
    <>
        <Navbar />
        <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Profile" component={Profile} />
        </Stack.Navigator>
    </>
    )
}

export default AllApp