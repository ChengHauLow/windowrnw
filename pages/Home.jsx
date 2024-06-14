import { Text, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import FadeInView from '../components/FadeInView';
import MenuContext from '../context/MenuContext';
import { useContext, useEffect, useState } from 'react';
// import UserContext from '../context/UserContext';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser, setUser } from '../store/UserSlice';
import { removeAll } from '../store/GeneralSlice';
import globalWebSocket from '../socket/websocket';
import { sendMessage } from '../socket/apiStock';
import { subManyEvents, unSubManyEvent } from '../socket/subcribeEvent';
import { storeData } from '../utils/storage';

// const socket = new WebSocket('ws://localhost:3000');
const Home = () => {
    const dispatch = useDispatch()
    const { changeCurrentMenu, currentMenu } = useContext(MenuContext)
    const logedInUser = useSelector(state => state.user)
    const [mainIndexes, setMainIndexes] = useState([])
    const homeIndexData = (data)=>{
        if(data.response.code == 200 && `${data.response.codeMsg}`.includes('取消订阅')== false){
            setMainIndexes(data.response.data);
        }
    }
    if(currentMenu.name !== "Home"){
        unSubManyEvent([
            'home_index'
        ])
    }
    useEffect(()=>{
        // console.log(logedInUser.userInfo == {}, logedInUser.userInfo);
        if(currentMenu.name === "Home" && logedInUser.userInfo.nickname == undefined){
            sendMessage(2, {
                cmd: "user",
                data: {},
                status:0
            })
            
            console.log('run here');
        }
    },[logedInUser.userInfo.nickname == undefined])
    useEffect(()=>{
        if(currentMenu.name === "Home" && mainIndexes.length < 1){
            subManyEvents([
                {
                    name: "home_index",
                    callback: (data) => homeIndexData(data),
                },
            ])
            sendMessage(2, {
                cmd: "home_index",
                data: {},
                status:1
            })
        }
    }, [mainIndexes.length < 1])
    const navigation = useNavigation()
    const handleLogout = ()=>{
        dispatch(logoutUser())
        dispatch(removeAll())
        sendMessage(2, {
            cmd: "logout",
            data: {},
        });
        changeCurrentMenu({
            name: 'Home'
        })
        storeData('status', 'logout', false)
        globalWebSocket.token = ''
        
    }
    
    const handlePress = () =>{
        storeData('fakeToken', '12kl3gh1k2g31i2', false)
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
        {logedInUser.isLogin && <>
            <Text style={{color:'white'}}>Hi, {logedInUser.name}({logedInUser.user_id})</Text>
            <TouchableOpacity style={{backgroundColor:'green', paddingHorizontal:30, paddingVertical:15,marginBottom:60}} onPress={handlePress}>
                <Text style={{color:'white', whiteSpace:'nowrap'}}>My Profile</Text>
            </TouchableOpacity>
            <Text style={{color:'white', whiteSpace:'nowrap'}}>{logedInUser.name}</Text>
            <TouchableOpacity style={{backgroundColor:'green', paddingHorizontal:30, paddingVertical:15}} onPress={handleLogout}><Text style={{color:'white', whiteSpace:'nowrap'}}>Logout</Text></TouchableOpacity>
            {mainIndexes.length > 0 && mainIndexes.map((item, index)=>(
                <Text style={{color:'white', marginVertical:10}} key={index}>{item.name}({item.symbol}) {item.high} {item.latest}</Text>
            ))}
        </>}
        </FadeInView>
    )
}

export default Home