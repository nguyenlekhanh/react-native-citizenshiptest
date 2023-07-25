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

function App(): JSX.Element {
  const bears = useBearStore((state) => state.bears);
  const increaseBears = useBearStore((state) => state.increase);

  const bears1 = useBoundStore((state) => state.bears);
  const addBear = useBoundStore((state) => state.addBear);
  return (
    <SafeAreaView>
      <View className="flex-row items-center space-x-2 pb-2 mx-4">
        <Text>Bears: {bears1}</Text>
        <Button onPress={() => addBear(1)} title="Add Bears"/>
        <ChevronDownIcon size={20} color="#00FFBB"/>
      </View>
    </SafeAreaView>
  );
}

export default App;
