import {useState, useEffect, PropsWithChildren, useContext} from 'react'
import {
    Text,
    useColorScheme,
    StyleSheet,
    TextInput,
    View,
  } from 'react-native';
import UserContext from './context/UserContext';
const Hello = () => {
    useEffect(()=>{
        console.log('useEffect');
    },[])
    const {user} = useContext(UserContext)
    const [text, setText]:[string, (value: string) => void] = useState('Hello')
    const handleChangeText = (e:string)=>{
        console.log(e);
        setText(e)
    }
  return (
    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <Text style={helloStyles.fontStyle}>{text}</Text>
        <TextInput style={{borderWidth:1, width:200, height:40}} value={text} onChangeText={handleChangeText} />
    </View>
  )
}

const helloStyles = StyleSheet.create({
    fontStyle: {
        color: 'red',
        fontSize: 20,
    }
})

export default Hello