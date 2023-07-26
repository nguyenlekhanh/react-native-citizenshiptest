import { View, Text, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { googleSignIn, getGoogleUser } from '../utils/googleUtil';

import AdsScreen from './AdsScreen'

import languagekeys from '../localization/languagekeys';
import LanguageUtils from '../utils/LanguageUtils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUserStore } from '../app/store.zustand.user';
import StorageService from '../utils/StorageService';

//add typescript for props.navigation
//https://reactnavigation.org/docs/typescript/
type RootStackParamList = {};

type Props = NativeStackScreenProps<RootStackParamList>;

const LoginScreen = ({ route, navigation }: Props) => {
  const userInfo = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    getCurrentUserInfo();
  }, [])
  
  useEffect(() => {
    if(userInfo) {
      
      const userCheck = async () => {
        const url = "http://10.0.0.108:10000/user/signupWithGoogle/";

        const result = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userInfo),
        });
        
        const json:Promise<any> = await result.json();
        if(json["token"]) {
          let newUserInfo = userInfo;
          newUserInfo["token"] = json["token"];
          
          setUser(newUserInfo);
        }
      }

      userCheck();
      navigation.replace("Home");
    }
  }, [userInfo])

  const getCurrentUserInfo = async () => {
    getGoogleUser(setUser);
  };

  const googleSignInHandler = async () => {
    const user = await AsyncStorage.getItem("@user");

    if(!user) {
      
      googleSignIn(setUser);
    } else {
      setUser(JSON.parse(user));
    }
  }

  return (
    <View className="flex-columns items-center w-full h-max">
      <View className="w-full h-[90%] items-center justify-center">
        <View className="w-2/4">
          <View className="mb-3">
            <Button 
              title={LanguageUtils.getLangText(languagekeys.signinWithGoogle)}
              onPress={() => googleSignInHandler()} 
            />
          </View>
          <Button 
            title={LanguageUtils.getLangText(languagekeys.signinWithGuest)} 
            onPress={() => {}} 
          />
        </View>
      </View>

      <AdsScreen />
    </View>
  )
}

export default LoginScreen