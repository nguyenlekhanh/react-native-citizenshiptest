import { View, Text, Button } from 'react-native'
import React from 'react'
import AdsScreen from './AdsScreen'
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

import {
  googleAndroidClientId,
  googleIosClientId
} from '../utils/variables';

import languagekeys from '../localization/languagekeys';
import LanguageUtils from '../utils/LanguageUtils';

const LoginScreen: React.FC = () => {
  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
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
              onPress={() => {}} 
            />
          </View>
          <Button 
            title={LanguageUtils.getLangText(languagekeys.signinWithGuest)} 
            onPress={() => {}} 
          />
          <Button title={'Sign in with Google'} onPress={() =>  {
                GoogleSignin.configure({
                    androidClientId: {googleAndroidClientId},
                    iosClientId: {googleIosClientId},
                });
                GoogleSignin.hasPlayServices().then((hasPlayService) => {
                    if (hasPlayService) {
                        GoogleSignin.signIn().then((userInfo) => {
                                  console.log(JSON.stringify(userInfo))
                        }).catch((e) => {
                        console.log("ERROR IS: " + JSON.stringify(e));
                        })
                    }
            }).catch((e) => {
                console.log("ERROR IS: " + JSON.stringify(e));
            })
            }} />

          <Button 
            title="Sign Out"
            onPress={() => signOut()} 
          />
          <Text>{googleAndroidClientId}</Text>
          <Text>{googleIosClientId}</Text>
        </View>
      </View>

      <AdsScreen />
    </View>
  )
}

export default LoginScreen