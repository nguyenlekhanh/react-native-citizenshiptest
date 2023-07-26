import { View, Text, TextInput, SafeAreaView, Button } from 'react-native'
import React from 'react'
import Ads from './AdsScreen';
import { TouchableOpacity } from 'react-native';
import languagekeys from '../localization/languagekeys';
import LanguageUtils from '../utils/LanguageUtils';
import LanguageScreen from './Language';
import { ScrollView } from 'react-native-gesture-handler';
import { useTranslation } from 'react-i18next';
import i18next from '../utils/i18next';

const HomeScreen: React.FC = () => {
  const buttonStyle = "w-auto p-3 bg-lime-500 rounded bold mt-2";
  const {t} = useTranslation();
  
  return (
    <SafeAreaView className="flex-columns items-center w-full h-max">
        <View className="w-full h-[89%] mt-2">
            <View className="h-[90%]">
              <ScrollView>
                <View className="m-2">
                  <View>
                    <Text className="bold text-2xl">2008</Text>
                  </View>
                  <View>
                      <TouchableOpacity className={buttonStyle}>
                          <Text className="text-[#fff] text-xl">View 100 questions 2008 Civics Test</Text>
                      </TouchableOpacity>
                      <TouchableOpacity className={buttonStyle}>
                          <Text className="text-[#fff] text-xl">Test 100 questions 2008 Civics Test</Text>
                      </TouchableOpacity>
                  </View>

                  <View className="mt-10">
                    <Text className="bold text-2xl">2020</Text>
                  </View>
                  <View>
                      <TouchableOpacity className={buttonStyle}>
                          <Text className="text-[#fff] text-xl">View 128 questions 2020 Civics Test</Text>
                      </TouchableOpacity>
                      <TouchableOpacity className={buttonStyle}>
                          <Text className="text-[#fff] text-xl">Test 128 questions 2020 Civics Test</Text>
                      </TouchableOpacity>
                  </View>
                </View>
              </ScrollView>
            </View>

            <View className="absolute bottom-5 mr-4">
              <LanguageScreen />
            </View>
        </View>

        <Ads />
    </SafeAreaView>
  )
}

export default HomeScreen