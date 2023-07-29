import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from '../screens/HomeScreen';
import LearnScreen from '../screens/LearnScreen';
import SignoutScreen from '../screens/SignoutScreen';
import TestScreen from "../screens/TestScreen";
import ScoreScreen from "../screens/ScoreScreen";

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
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

        <Stack.Screen 
          name="Test" 
          component={TestScreen} 
          options={{
            headerRight: () => (
              <SignoutScreen />
            ),
          }}
        />

        <Stack.Screen 
          name="ScoreScreen" 
          component={ScoreScreen} 
          options={{
            headerRight: () => (
              <SignoutScreen />
            ),
          }}
        />
      </Stack.Navigator>
  );
}

const ContactStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}

export { MainStackNavigator, ContactStackNavigator };