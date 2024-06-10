/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
// import {} from 'react-native-windows'
import {} from 'react-router'
// import type {PropsWithChildren} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { UserProvider } from './context/UserContext';
import { MenuProvider } from './context/MenuContext';
import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import Navbar from './layout/Navbar';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './pages/Home';
import Profile from './pages/Profile';
const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <MenuProvider>
      <UserProvider>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
            height: '100%',
            minHeight:500,
            flexDirection: 'row',
            flex:1
          }}>
          <NavigationContainer>
            <Navbar />
            <Stack.Navigator>
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="Profile" component={Profile} />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </UserProvider>
    </MenuProvider>
  );
}

const styles = StyleSheet.create({
  highlight: {
    fontWeight: '700',
  },
});

export default App;
