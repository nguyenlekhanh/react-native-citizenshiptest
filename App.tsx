/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {Button, SafeAreaView, Text, View} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';

import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import SignoutScreen from './screens/SignoutScreen';

const Stack = createStackNavigator();

import "./locales/i18n";


function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen name="Login" component={LoginScreen} 
          options={{
            title: 'Login',
            // headerStyle: {
            //   backgroundColor: 'transparent',
            // },
            // headerTintColor: '#fff',
            // headerTitleStyle: {
            //   fontWeight: 'bold',
            // },
            headerTitleAlign: 'center'
          }}
        /> */}
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{
            headerRight: () => (
              <SignoutScreen />
            ),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
