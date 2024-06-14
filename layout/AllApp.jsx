import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Navbar from './Navbar';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
const Stack = createNativeStackNavigator();

const AllApp = () => {
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