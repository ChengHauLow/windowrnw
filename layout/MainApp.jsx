import React from 'react'
import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useColorScheme } from 'react-native-windows';
import AllApp from './AllApp';
import Login from '../pages/Login';
import { useSelector } from 'react-redux';

const MainApp = () => {
const isDarkMode = useColorScheme() === 'dark';
  const user = useSelector(state => state.user);
  const {token} = useSelector(state => state.general);
  console.log(user);
  return (
    <View
    style={{
        backgroundColor: isDarkMode ? Colors.black : Colors.white,
        height: '100%',
        minHeight:500,
        flexDirection: 'row',
        flex:1
    }}>
        <NavigationContainer>
            <Login show={token == ''} />
            {token && <AllApp />}
        </NavigationContainer>
    </View>
  )
}

export default MainApp