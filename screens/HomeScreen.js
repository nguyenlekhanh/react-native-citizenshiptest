import { View, Text, TextInput, SafeAreaView, Button } from 'react-native'
import React from 'react'
import Ads from './Ads';
import { TouchableOpacity } from 'react-native';
import StorageService from '../utils/StorageService';

const HomeScreen = () => {

  return (
    <SafeAreaView className="flex-columns items-center w-full h-max">
        <View className="w-full h-[90%] items-center justify-center">
            <View>
                <TouchableOpacity className="w-auto p-3 bg-lime-500 rounded bold bold">
                    <Text className="text-[#fff] text-xl">100 questions 2008 Civics Test</Text>
                </TouchableOpacity>
            </View>
        </View>

        <Ads />
    </SafeAreaView>
  )
}

export default HomeScreen

