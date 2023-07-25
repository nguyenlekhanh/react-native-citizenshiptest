import { View, Text, Button, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { EventRegister } from 'react-native-event-listeners';
import { 
  googleExpoClientId,
  googleAndroidClientId,
  googleIosClientId,
  googleWebClientId
} from '@env';
import Ads from './Ads';
import { getUserInfo } from '../utils/googleUtil';
import languagekeys from '../localization/languagekeys';
import LanguageUtils from '../utils/LanguageUtils';

const LoginScreen = ({navigation}) => {
  const [userInfo, setUserInfo] = useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: googleExpoClientId,
    androidClientId: googleAndroidClientId,
    iosClientId: googleIosClientId,
    webClientId: googleWebClientId
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
      navigation.replace( "Home" );
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

  const singInWithGuest = async () => {
    navigation.replace( "Home" );
  }

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
            onPress={() => singInWithGuest()} 
          />
        </View>
      </View>

      <Ads />
    </View>
  )
}

export default LoginScreen