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

const Stack = createStackNavigator();

import "./locales/i18n";

import {MainStackNavigator} from "./navigation/StackNavigator"
// import DrawerNavigator from "./navigation/DrawerNavigator";
import Toast from 'react-native-toast-message';
import { toastConfig } from './configs/toastConfig';
import AppTimerProvider from './components/AppTimerProvider';

function App(): JSX.Element {
  return (
    <>
      <AppTimerProvider>
        <NavigationContainer>
          <MainStackNavigator />
        </NavigationContainer>
      </AppTimerProvider>
      <Toast config={toastConfig} />
    </>
  );
}

export default App;
