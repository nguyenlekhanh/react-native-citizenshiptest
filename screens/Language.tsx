import { View, Text } from 'react-native'
import React from 'react'

import { TouchableOpacity } from 'react-native-gesture-handler'

import { useTranslation } from 'react-i18next';
import StorageService from '../utils/StorageService';
import { version } from '../utils/variables';

const LanguageScreen: React.FC = () => {
  const {i18n} = useTranslation();

  const changeLng = async (lng: string) => {
    await StorageService.saveItem(StorageService.APP_LANGUAGE, {"language": lng});
    i18n.changeLanguage(lng);
  };

  return (
    <View>
      <View className="mt-5 flex-row w-full justify-end content-end" >
        <Text></Text>
        <TouchableOpacity onPress={() => changeLng("vn")}>
          <Text className="bold text-xl text-blue-700 mr-5">VN</Text>
        </TouchableOpacity>
        <Text className="bold text-xl text-blue-700">|</Text>
        <TouchableOpacity onPress={() => changeLng("es")}>
          <Text className="bold text-xl text-blue-700 ml-5 mr-5">ES</Text>
        </TouchableOpacity>
        <Text className="bold text-xl text-blue-700">|</Text>
        <TouchableOpacity className="ml-2" onPress={() => changeLng("en")}>
          <Text className="bold text-xl text-blue-700 ml-4">EN</Text>
        </TouchableOpacity>
      </View>
      <Text className="text-right pt-1">Version: {version}</Text>
    </View>
  )
}

export default LanguageScreen