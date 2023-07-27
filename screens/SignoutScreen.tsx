import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { useUserStore } from '../app/store.zustand.user';
import { useNavigation } from '@react-navigation/native';
import { googleSignIn, googleSignOut } from '../utils/googleUtil';
import StorageService from '../utils/StorageService';
import { useTranslation } from 'react-i18next';

const SignoutScreen: React.FC = () => {
  const navigation = useNavigation();
  const userInfo  = useUserStore((state) => state.user);
  const setUser  = useUserStore((state) => state.setUser);
  const {t} = useTranslation();

  useEffect(() => {
    const getUser = async () => {
      const user = await StorageService.getItem(StorageService.USER);
      if(user) {
        setUser(JSON.parse(user));
      }
    }
    getUser();
  }, []);

  const googleSignInHandler = async () => {
    const user = await StorageService.getItem(StorageService.USER);

    if(!user) {
      googleSignIn(setUser);
    } else {
      setUser(JSON.parse(user));
    }
  }

  const removeUser = () => {
    googleSignOut(setUser);
    navigation.replace('Login');
  }

  if(userInfo) {
    return (
      <TouchableOpacity onPress={() => removeUser()}>
        <Text
          className="bold mr-1 text-lg"
        >
          {t("sign-out")}
        </Text>
      </TouchableOpacity>
    )
  } else {
    return (
      <TouchableOpacity onPress={() => googleSignInHandler()}>
        <Text
          className="bold mr-1 text-lg"
        >
          {t("sign-in-with-google")}
        </Text>
      </TouchableOpacity>
    );
  }
}

export default SignoutScreen