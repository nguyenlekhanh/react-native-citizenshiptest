import { View, Text, TextInput, SafeAreaView, Button } from 'react-native'
import React from 'react'
import Ads from './AdsScreen';
import { TouchableOpacity } from 'react-native';

const HomeScreen: React.FC = () => {
  return (
    <SafeAreaView className="flex-columns items-center w-full h-max">
        <View className="w-full h-[90%] mt-2">
            <View className="m-2">
              <View>
                <Text className="bold text-2xl">2008</Text>
              </View>
              <View>
                  <TouchableOpacity className="w-auto p-3 bg-lime-500 rounded bold bold">
                      <Text className="text-[#fff] text-xl">100 questions 2008 Civics Test</Text>
                  </TouchableOpacity>
              </View>

              <View className="mt-10">
                <Text className="bold text-2xl">2020</Text>
              </View>
              <View>
                  <TouchableOpacity className="w-auto p-3 bg-lime-500 rounded bold bold">
                      <Text className="text-[#fff] text-xl">128 questions 2020 Civics Test</Text>
                  </TouchableOpacity>
              </View>
            </View>
        </View>

        <Ads />
    </SafeAreaView>
  )
}

export default HomeScreen