import { Text, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import FadeInView from '../components/FadeInView';
import MenuContext from '../context/MenuContext';
import { useContext, useEffect } from 'react';
// import UserContext from '../context/UserContext';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser, setUser } from '../store/UserSlice';
import { removeAll } from '../store/GeneralSlice';
import globalWebSocket from '../socket/websocket';
import { sendMessage } from '../socket/apiStock';

// const socket = new WebSocket('ws://localhost:3000');
const Home = () => {
    const dispatch = useDispatch()
    const { changeCurrentMenu, currentMenu } = useContext(MenuContext)
    const logedInUser = useSelector(state => state.user)
    useEffect(()=>{
        if(currentMenu.name === "Home"){
            sendMessage(2, {
                cmd: "user",
                data: {},
                status:1
            })
            console.log('run here');
        }
    },[])
    console.log(logedInUser, 'from Home');
    // const {user, users, register, login, isLogin} = useContext(UserContext)
    const navigation = useNavigation()
    const handleLogout = ()=>{
        dispatch(logoutUser())
        dispatch(removeAll())
        sendMessage(2, {
            cmd: "logout",
            data: {},
            });
        globalWebSocket.token = ''
    }
    
    const handlePress = () =>{
        let params = {
            name: "I'm from Home",
            stockCode: '1234567890',
        }
        changeCurrentMenu({
            name: 'Profile',
            params
        })
        // handleStopServer()
        navigation.navigate('Profile', params)
    }
    
    return (
    <FadeInView style={{
        backgroundColor: 'red',
        height: '100%',
        minHeight:500,
        // flexDirection: 'row',
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        }}>
        {logedInUser.isLogin ? <Text style={{color:'white'}}>Hi, {logedInUser.name}({logedInUser.user_id})</Text>:<Text style={{color:'white'}}>Hi, Guest</Text>}
        <TouchableOpacity style={{backgroundColor:'green', paddingHorizontal:30, paddingVertical:15,marginBottom:60}} onPress={handlePress}>
            <Text style={{color:'white', whiteSpace:'nowrap'}}>My Profile</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={{backgroundColor:'green', paddingHorizontal:30, paddingVertical:15, marginBottom:60}} onPress={handleStopServer}><Text style={{color:'white', whiteSpace:'nowrap'}}>Stop Server</Text></TouchableOpacity> */}
        {logedInUser.isLogin && <>
            <Text style={{color:'white', whiteSpace:'nowrap'}}>{logedInUser.name}</Text>
            <TouchableOpacity style={{backgroundColor:'green', paddingHorizontal:30, paddingVertical:15}} onPress={handleLogout}><Text style={{color:'white', whiteSpace:'nowrap'}}>Logout</Text></TouchableOpacity>
        </>}
        </FadeInView>
    )
}

export default Home