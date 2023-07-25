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

function App(): JSX.Element {
  const bears = useBearStore((state) => state.bears);
  const increaseBears = useBearStore((state) => state.increase);

  return (
    <SafeAreaView>
      <View className="flex-row items-center space-x-2 pb-2 mx-4">
        <Text>Bears: {bears}</Text>
        <Button onPress={() => increaseBears(1)} title="Increase Bear"/>
        <ChevronDownIcon size={20} color="#00FFBB"/>
      </View>
    </SafeAreaView>
  );
}

export default App;
