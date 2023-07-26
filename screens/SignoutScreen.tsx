import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import languagekeys from '../localization/languagekeys';
import LanguageUtils from '../utils/LanguageUtils';
import { useUserStore } from '../app/store.zustand.user';
import { useNavigation } from '@react-navigation/native';
import { googleSignOut } from '../utils/googleUtil';

const SignoutScreen: React.FC = () => {
  const navigation = useNavigation();
  const userInfo  = useUserStore((state) => state.user);
  const setUser  = useUserStore((state) => state.setUser);

  const removeUser = () => {
    googleSignOut(setUser);
    navigation.replace('Login');
  }

  if(userInfo) {
    return (
      <TouchableOpacity onPress={() => removeUser()}>
        <Text
          className="bold mr-1"
        >
          {LanguageUtils.getLangText(languagekeys.signout)}
        </Text>
      </TouchableOpacity>
    )
  } else {
    return null;
  }
}

export default SignoutScreen