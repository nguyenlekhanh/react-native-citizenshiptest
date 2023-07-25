/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {SafeAreaView, Text, View} from 'react-native';

import {
  ChevronDownIcon,
} from 'react-native-heroicons/outline';

function App(): JSX.Element {
  return (
    <SafeAreaView>
      <View className="flex-row items-center space-x-2 pb-2 mx-4">
        <Text>slkdfj</Text>
        <ChevronDownIcon size={20} color="#00FFBB"/>
      </View>
    </SafeAreaView>
  );
}

export default App;
