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
import LearnScreen from './screens/LearnScreen';

// import { createDrawerNavigator } from '@react-navigation/drawer';

// function Feed() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Feed Screen</Text>
//     </View>
//   );
// }

// function Article() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Article Screen</Text>
//     </View>
//   );
// }

// const Drawer = createDrawerNavigator();

// function MyDrawer() {
//   return (
//     <Drawer.Navigator useLegacyImplementation={false}>
//       <Drawer.Screen name="Home" component={HomeScreen} />
//       <Drawer.Screen name="Learn" component={LearnScreen} />
//     </Drawer.Navigator>
//   );
// }

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
        <Stack.Screen 
          name="Learn" 
          component={LearnScreen} 
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
