import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import languagekeys from '../localization/languagekeys';
import LanguageUtils from '../utils/LanguageUtils';
import StorageService from '../utils/StorageService';
import { useNavigation } from '@react-navigation/native';

const Signout = () => {
  const navigation = useNavigation();

  const removeUser = () => {
    StorageService.deleteItem(StorageService.USER);
    navigation.replace('Login');
  }

  return (
    <View>
      <TouchableOpacity onPress={() => removeUser()}>
        <Text>{LanguageUtils.getLangText(languagekeys.signout)}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Signout