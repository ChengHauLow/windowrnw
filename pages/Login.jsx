import { useState, useEffect } from "react"
import { Text, TextInput, View, TouchableOpacity, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { updatePhone } from "../store/GeneralSlice";
// import { loginUser } from "../store/UserSlice";
import globalWebSocket from "../socket/websocket";
import { sendMessage } from "../socket/apiStock";
import { getData, storeData } from "../utils/storage";

const Login = ({show = true}) => {
    const [form, setForm] = useState({
        phone: '',
        password: ''
    })
    // const user = useSelector(state=>state.user)
    const generalInfo = useSelector(state=>state.general)
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    let connectParam = {
        msgTime: generalInfo.msgTime,
        token: generalInfo.token,
        phone: generalInfo.phone,
        currentPage: generalInfo.currentPage
    }
    const handleSubmit = ()=>{
        if(loading) return;
        globalWebSocket.connect(connectParam, dispatch);
        setLoading(true);
        dispatch(updatePhone(form.phone))
        sendMessage(2, {
            cmd: "login",
            data: {
                phone: form.phone,
                password: form.password,
                type: 1,
                appid: 101,
            },
        });
        storeData('status', 'login', false)
        setTimeout(()=>{
            setLoading(false);
            setForm({
                phone: '',
                password: ''
            })
            
        },2000)
    }
    // useEffect(() => {
    //     getData('status', false).then(statusNow=>{
    //         console.log(statusNow, 'statusNow');
    //         if(statusNow === 'logout'){
    //             globalWebSocket.close()
    //             globalWebSocket.connect(connectParam, dispatch);
    //         }else{
    //             globalWebSocket.connect(connectParam, dispatch);
    //             console.log('hey');
    //         }
    //     })
    // }, [])
    
  return (
    <View style={{position:'absolute', display:show?'flex':'none', width:'100%', height:'100%', backgroundColor:'green', top:0, left:0, zIndex:999999, justifyContent:'center', alignItems:'center'}}>
        <View style={{backgroundColor:'red', width:500, height:200}}>
            <Text>Login</Text>
            <TextInput placeholder="Phone" id="login_phone" onChangeText={(e)=> setForm({...form, phone:e})} value={form.phone}/>
            <TextInput placeholder="Password" id="login_password" onChangeText={(e)=> setForm({...form, password:e})} value={form.password}/>
            <TouchableOpacity disabled={loading} style={{backgroundColor:!loading?'blue':'gray', width:200, height:50, justifyContent:'center', alignItems:'center'}}>
                <Text onPress={handleSubmit} style={{color:'white'}}>Login</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default Login