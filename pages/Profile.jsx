import { Text, TouchableOpacity, Image } from 'react-native'
import FadeInView from '../components/FadeInView'
import MenuContext from '../context/MenuContext';
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../store/UserSlice';
import { sendMessage } from '../socket/apiStock.js';
import { removeAll } from '../store/GeneralSlice';
import globalWebSocket from '../socket/websocket.js';
import { getData, storeData } from '../utils/storage.js';

const Profile = ({route}) => {
  const navigation = useNavigation()
  const { changeCurrentMenu } = useContext(MenuContext)
  const loggedInUser = useSelector(state => state.user)
  // console.log(loggedInUser);
  const dispatch = useDispatch()
  let text='Profile'
  let stockCode='000000'
  if(route.params){
      text = route.params.name?route.params.name:'Profile',
      stockCode = route.params.stockCode?route.params.stockCode:'000000'
      getData('fakeToken', false).then(data=>console.log(data))
  }
  const handlePress = () =>{
    let params = {
        name: "I'm from Profile",
        stockCode: '1234567890'
    }
    changeCurrentMenu({
        name: 'Home',
        params
    })
    navigation.navigate('Home', params)
}

const handleLogoutfromProfile = ()=>{
  dispatch(logoutUser())
  dispatch(removeAll())
  storeData('status', 'logout', false)
  globalWebSocket.token = ''
  sendMessage(2, {
    cmd: "logout",
    data: {},
  });
  changeCurrentMenu({
      name: 'Home'
  })
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
        {loggedInUser.isLogin && <>
          <Image source={{uri:loggedInUser.userInfo.header}} style={{width:100, height:100, borderRadius:100}} />
          <Text style={{color:'white'}}>Login User: {loggedInUser.name}({loggedInUser.user_id})</Text>
          <TouchableOpacity style={{backgroundColor:'green', paddingHorizontal:30, paddingVertical:15, marginVertical:20}} onPress={handlePress}><Text style={{color:'white', whiteSpace:'nowrap'}}>My Home</Text></TouchableOpacity>
          <TouchableOpacity style={{backgroundColor:'green', paddingHorizontal:30, paddingVertical:15}} onPress={handleLogoutfromProfile}><Text style={{color:'white', whiteSpace:'nowrap'}}>Logout</Text></TouchableOpacity>
        </>}
      </FadeInView>
  )
}

export default Profile