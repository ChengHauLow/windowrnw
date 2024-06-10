import { View, Text, TouchableOpacity, Alert, TextInput } from 'react-native'
import FadeInView from '../components/FadeInView'
import MenuContext from '../context/MenuContext';
import {Controller, useForm} from 'react-hook-form'
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import {z} from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import FormInput from '../components/FormInput';
import UserContext from '../context/UserContext';

const Profile = ({route}) => {
  const navigation = useNavigation()
  const { changeCurrentMenu } = useContext(MenuContext)
  const { user, login, isLogin, logoutNow } = useContext(UserContext)
  let text='Profile'
  let stockCode='000000'
  let username = ''
  let useremail = ''
  if(route.params){
      text = route.params.name?route.params.name:'Profile',
      stockCode = route.params.stockCode?route.params.stockCode:'000000'
      if(route.params.username){
          username = route.params.username
          useremail = route.params.email
      }
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

const formSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  full_name: z.string().min(3, 'full name must be at least 3 characters'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});
const formSchema1 = z.object({
  email: z.string(),
  full_name: z.string(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});
const { control, handleSubmit } = useForm({
  defaultValues: {
  email: '',
  full_name: '',
  password: '',
  },
  resolver: zodResolver(useremail?formSchema1:formSchema)
});

const onSubmit = async (data)=>{
  const { email, full_name, password } = data;
  if(useremail){
    if(password == ''){
      Alert.alert("Error", "Password is required")
      return
    }
    let loginUser = await login({
      email: useremail,
      full_name: username,
      password: password
    })
    if(loginUser.status){
      Alert.alert("Success", `Login successfully ${loginUser.data.email}`)
    }
    return
  }
  console.log(data);
  if(email == ''){
      Alert.alert("Error", "Email is required")
      return
  }else if(full_name == ''){
      Alert.alert("Error", "Full name is required")
      return
  }else if(password == ''){
      Alert.alert("Error", "Password is required")
      return
  }else if(email == '' && full_name == '' && password == ''){
      Alert.alert("Error", "Please fill up information.")
      return
  }
  let loginUser = await login(data)
  console.log(data);
  if(loginUser.status){
    Alert.alert("Success", `Login successfully ${loginUser.data.email}`)
  }
}

const handleLogout = ()=>{
  logoutNow()
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
        <Text style={{color:'white'}}>{text}</Text>
        {isLogin ? <Text style={{color:'white'}}>Is Login</Text>: <Text style={{color:'white'}}>No Login</Text>}
        {text === "I'm from Home" &&<Text style={{color:'white'}}>{stockCode}</Text>}
        <TouchableOpacity style={{backgroundColor:'green', paddingHorizontal:30, paddingVertical:15}} onPress={handlePress}><Text style={{color:'white', whiteSpace:'nowrap'}}>My Home</Text></TouchableOpacity>
        {isLogin && <TouchableOpacity style={{backgroundColor:'green', paddingHorizontal:30, paddingVertical:15}} onPress={handleLogout}><Text style={{color:'white', whiteSpace:'nowrap'}}>Logout</Text></TouchableOpacity>}
        {!isLogin && <View>
        <Text style={{color:'white', whiteSpace:'nowrap', marginBottom:30}}>Simple Login Form</Text>
        <FormInput
            control={control}
            name={'email'}
            placeholder="email"
            value={useremail}
            />
        <FormInput
            control={control}
            name={'full_name'}
            placeholder='full name'
            value={username}
        />
        <FormInput
            control={control}
            name={'password'}
            placeholder='password'
            secureTextEntry
        />
        
        <TouchableOpacity
            title='Submit'
            style={{backgroundColor:'green', paddingHorizontal:30, paddingVertical:15}}
            onPress={handleSubmit(onSubmit)}
        >
            <Text>Submit</Text>
        </TouchableOpacity>
        </View>}
      </FadeInView>
  )
}

export default Profile