import { View, Text } from 'react-native'
import React from 'react'
import { TestIds } from 'react-native-google-mobile-ads'
import { TouchableOpacity } from 'react-native-gesture-handler'
import LanguageUtils from '../utils/LanguageUtils';
import { useTranslation } from 'react-i18next';
import StorageService from '../utils/StorageService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LanguageScreen: React.FC = () => {
  const {i18n} = useTranslation();

  const changeLng = async (lng: string) => {
    await StorageService.saveItem(StorageService.APP_LANGUAGE, {"language": lng});
    i18n.changeLanguage(lng);
  };

  return (
    <View className="mt-5 flex-row w-full justify-end pr-2 content-end" >
      <TouchableOpacity onPress={() => changeLng("vn")}>
        <Text className="bold text-2xl text-blue-700 mr-5">VN</Text>
      </TouchableOpacity>
      <Text className="bold text-2xl text-blue-700">|</Text>
      <TouchableOpacity className="ml-2" onPress={() => changeLng("en")}>
        <Text className="bold text-2xl text-blue-700 ml-4">EN</Text>
      </TouchableOpacity>
    </View>
  )
}

export default LanguageScreen