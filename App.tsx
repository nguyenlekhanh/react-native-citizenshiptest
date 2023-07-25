/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {Button, SafeAreaView, Text, View} from 'react-native';

import {
  ChevronDownIcon,
} from 'react-native-heroicons/outline';

import { useBearStore } from './app/store.zustand';
import { useBoundStore } from './app/store.zustandCombine';

import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';

import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/Home';

const Stack = createStackNavigator();

function App(): JSX.Element {
  const bears = useBearStore((state) => state.bears);
  const increaseBears = useBearStore((state) => state.increase);

  const bears1 = useBoundStore((state) => state.bears);
  const addBear = useBoundStore((state) => state.addBear);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
