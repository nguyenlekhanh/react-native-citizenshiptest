import { View, Text, Button, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { EventRegister } from 'react-native-event-listeners';

import Ads from './Ads';
import { getUserInfo } from '../utils/googleUtil';
import languagekeys from '../localization/languagekeys';
import LanguageUtils from '../utils/LanguageUtils';

const LoginScreen = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: "941001352428-fbo21fnfabg5ruslf6giufujlea2kvu1.apps.googleusercontent.com",
    androidClientId: "941001352428-5o71fbh7klqrlb0r0hft6emk4t7h31o6.apps.googleusercontent.com",
    iosClientId: "941001352428-3jvqfq4mjbfa3me4bsglsc1qff81474q.apps.googleusercontent.com",
    webClientId: "941001352428-ekedip2lb1eovghgq98dtn5mq1fc6l4i.apps.googleusercontent.com"
  });

  useEffect(() => {
    handleSingInWithGoogle();
  }, [response])


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
        
        const json = await result.json();
        //console.log(json);
      }

      userCheck();
    }
  }, [userInfo])


  const handleSingInWithGoogle = async () => {
    const user = await AsyncStorage.getItem("@user");
    if(!user) {
        if(response?.type === "success")
            await getUserInfo(response.authentication.accessToken, setUserInfo);
    } else {
        setUserInfo(JSON.parse(user));
    }
  }

  const removeUser = () => {
    AsyncStorage.removeItem("@user");
    setUserInfo('');
  }

  const signInWithGoogleTxt = LanguageUtils.getLangText(languagekeys.signinWithGoogle)

  return (
    <View className="flex-columns items-center w-full h-max">
      <View className="w-full h-[90%] items-center justify-center">
        <View className="w-2/4">
          <View className="mb-3">
            <Button 
              title={LanguageUtils.getLangText(languagekeys.signinWithGoogle)}
              onPress={() => promptAsync()} 
            />
          </View>
          <Button 
            title={LanguageUtils.getLangText(languagekeys.signinWithGuest)} 
            onPress={() => {}} 
          />
        </View>
      </View>

      <Ads />
    </View>
  )
}

export default LoginScreen