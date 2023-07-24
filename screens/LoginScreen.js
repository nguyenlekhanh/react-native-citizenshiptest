import { View, Text, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google"
import AsyncStorage from '@react-native-async-storage/async-storage';
import {googleExpoClientId} from '@envr';


const LoginScreen = () => {
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

  async function handleSingInWithGoogle() {
    const user = await AsyncStorage.getItem("@user");
    if(!user) {
        if(response?.type === "success")
            await getUserInfo(response.authentication.accessToken);
    } else {
        setUserInfo(JSON.parse(user));
    }
  }

  const getUserInfo = async (token) => {
    if(!token) return;
    try {
        const response = await fetch(
            "https://www.googleapis.com/userinfo/v2/me",
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        )
        const user = await response.json();
        await AsyncStorage.setItem("@user", JSON.stringify(user));
        setUserInfo(user);
    } catch(error) {

    }
  }

  const removeUser = () => {
    AsyncStorage.removeItem("@user");
    setUserInfo('');
  }

  return (
    <View>
      <Text>LoginScreen</Text>
      <Text>{JSON.stringify(userInfo, null, 2)}</Text>
      <Button title="Sign in with Google" 
        onPress={() => promptAsync()}/>
      <Button title="Delete local storage" onPress={() => removeUser()} />
    </View>
  )
}

export default LoginScreen