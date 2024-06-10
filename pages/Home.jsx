import { View, Text, TouchableOpacity, Alert, TextInput } from 'react-native'
import {Controller, useForm} from 'react-hook-form'
import { useNavigation } from '@react-navigation/native';
import FadeInView from '../components/FadeInView';
import MenuContext from '../context/MenuContext';
import { useContext, useEffect, useState } from 'react';
import {z} from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import FormInput from '../components/FormInput';
import UserContext from '../context/UserContext';

// const socket = new WebSocket('ws://localhost:3000');

const Home = ({route}) => {
    const { changeCurrentMenu } = useContext(MenuContext)
    const {user, users, register, login} = useContext(UserContext)
    const navigation = useNavigation()
    const [text, setText] = useState('Nobody')
    const [name, setName] = useState('Nobody')
    // const sendMessage = (message='Hello') => {
    //     socket.send(JSON.stringify({
    //         message,
    //         name: 'Client',
    //         status: 1
    //     }))
    // }
    // socket.onmessage = (event) => {
    //     console.log('Message from server ', event.data);
    //     let data = JSON.parse(event.data);
    //     if(data.message){
    //         setText(data.message);
    //     }
    // }
    // sendMessage()
    // useEffect(() => {
    //     if(currentMenu.name === 'Home'){
    //         if(!route.params){
    //             sendMessage()
    //         }
    //     }else if(currentMenu.name === 'Profile'){
    //         handleStopServer()
    //     }
    // },[])
    useEffect(() => {
        if(route.params){
            setName(route.params.name)
            // if(currentMenu.name === 'Home'){
            //     sendMessage(route.params.name+'from route Home')
            // }
        }
    }, [route.params])
    
    const handlePress = () =>{
        let params = {
            name: "I'm from Home",
            stockCode: '1234567890'
        }
        changeCurrentMenu({
            name: 'Profile',
            params
        })
        // handleStopServer()
        navigation.navigate('Profile', params)
    }
    // const handleStopServer = () => {
    //     socket.send(JSON.stringify({
    //         message: 'Server Stop',
    //         name: 'Client',
    //         status: 0
    //     }))
    //     return
    // }
    const formSchema = z.object({
        email: z.string().email('Please enter a valid email'),
        full_name: z.string().min(3, 'full name must be at least 3 characters'),
        password: z.string().min(8, 'Password must be at least 8 characters'),
      });
    const { control, handleSubmit } = useForm({
        defaultValues: {
        email: '',
        full_name: '',
        password: '',
        },
        resolver: zodResolver(formSchema)
    });
      
    const onSubmit = async (data)=>{
        const { email, full_name, password } = data;
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
        let registerUsers = await register(data)
        console.log(registerUsers);
        Alert.alert("Successful", registerUsers.data[registerUsers.data.length -1])
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
        <Text style={{color:'white'}}>{name}</Text>
        <TouchableOpacity style={{backgroundColor:'green', paddingHorizontal:30, paddingVertical:15,marginBottom:60}} onPress={handlePress}>
            <Text style={{color:'white', whiteSpace:'nowrap'}}>My Profile</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={{backgroundColor:'green', paddingHorizontal:30, paddingVertical:15, marginBottom:60}} onPress={handleStopServer}><Text style={{color:'white', whiteSpace:'nowrap'}}>Stop Server</Text></TouchableOpacity> */}
        <View>
        <Text style={{color:'white', whiteSpace:'nowrap', marginBottom:30}}>Simple Register Form</Text>
        <FormInput
            control={control}
            name={'email'}
            placeholder="email"
        />
        <FormInput
            control={control}
            name={'full_name'}
            placeholder='full name'
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
        </View>
        </FadeInView>
    )
}

export default Home