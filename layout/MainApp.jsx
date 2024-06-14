import { View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useColorScheme } from 'react-native-windows';
import AllApp from './AllApp';
import Login from '../pages/Login';
import { useSelector } from 'react-redux';

const MainApp = () => {
const isDarkMode = useColorScheme() === 'dark';
  const {token} = useSelector(state => state.general);
  console.log('From MainApp');
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