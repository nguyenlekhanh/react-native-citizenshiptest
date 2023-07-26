import { View, Text, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import {
  GoogleSignin,
  statusCodes,
  User,
} from '@react-native-google-signin/google-signin';

import AdsScreen from './AdsScreen'

import {
  googleAndroidClientId,
  googleIosClientId
} from '../utils/variables';

import languagekeys from '../localization/languagekeys';
import LanguageUtils from '../utils/LanguageUtils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUserStore } from '../app/store.zustand.user';

GoogleSignin.configure({
  androidClientId: {googleAndroidClientId},
  iosClientId: {googleIosClientId},
});

//https://reactnavigation.org/docs/typescript/
type RootStackParamList = {};

type Props = NativeStackScreenProps<RootStackParamList>;

const LoginScreen = ({ route, navigation }: Props) => {
  const userInfo = useUserStore((state) => state.user);
  const setUser  = useUserStore((state) => state.setUser);

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
      navigation.replace( "Home" );
    }
  }, [userInfo])

  const getCurrentUserInfo = async () => {
    try {
      const user = await AsyncStorage.getItem("@user");
      if(!user) {
        const googleUserInfo = await GoogleSignin.signInSilently();
        setUser(googleUserInfo);
      } else {
        setUser(JSON.parse(user));
      }
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        // user has not signed in yet
      } else {
        // some other error
      }
    }
  };

  const googleSignIn = async () => {
    const user = await AsyncStorage.getItem("@user");

    if(!user) {
      //Another to sign in
      // await GoogleSignin.hasPlayServices();
      // const googleUserInfo = await GoogleSignin.signIn();
      // setUserInfo(googleUserInfo);
      // console.log(googleUserInfo);

      GoogleSignin.hasPlayServices().then((hasPlayService) => {
          if (hasPlayService) {
              GoogleSignin.signIn().then((googleUserInfo) => {
                setUser(googleUserInfo);
              }).catch((e) => {
                console.log("ERROR IS 1: " + JSON.stringify(e));
              })
          }
      }).catch((e) => {
          console.log("ERROR IS 2: " + JSON.stringify(e));
      })
    } else {
      setUser(JSON.parse(user));
    }
  }

  const googleSignOut = async () => {
    try {
      await GoogleSignin.signOut();
      setUser('');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View className="flex-columns items-center w-full h-max">
      <View className="w-full h-[90%] items-center justify-center">
        <View className="w-2/4">
          <View className="mb-3">
            <Button 
              title={LanguageUtils.getLangText(languagekeys.signinWithGoogle)}
              onPress={() => googleSignIn()} 
            />
          </View>
          <Button 
            title={LanguageUtils.getLangText(languagekeys.signinWithGuest)} 
            onPress={() => {}} 
          />  
          <Button 
            title="sign out" 
            onPress={() => googleSignOut()} 
          />
        </View>
      </View>

      <AdsScreen />
    </View>
  )
}

export default LoginScreen