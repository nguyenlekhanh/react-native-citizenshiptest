import { View, Text, SafeAreaView, TextInput, Keyboard, Modal, Pressable, Alert, StyleSheet  } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import AdsScreen from './AdsScreen';
import { useTranslation } from 'react-i18next';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import AdsFullScreen from './AdsFullScreen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { googleSignOut } from '../utils/googleUtil';
import { useUserStore } from '../app/store.zustand.user';
import { deleteAccount } from '../utils/updateData';

type RootStackParamList = {};

type Props = NativeStackScreenProps<RootStackParamList>;

const AccountScreen = ({ route, navigation }: Props) => {
  const {showFullAds} = route.params;
  const {t, i18n} = useTranslation();
  const userInfo = useUserStore((state) => state.user);
  const setUser  = useUserStore((state) => state.setUser);
  const token = useUserStore((state) => state.token);
  const setToken  = useUserStore((state) => state.setToken);

  const removeUser = () => {
    setToken('');
    setUser('');
    googleSignOut(setUser);
  }

  const sigoutHandler = () => {
    removeUser();
    navigation.navigate("Home");
  }

  const deleteAccountHandler = () => {
    let data = {
      token: token,
      email: userInfo.user.email
    }
    //console.log(data);
    removeUser();
    //send to server
    deleteAccount(data)
      .then((response) => {
        Alert.alert('Success', 'Your account has been deleted successfully.', [
          {text: 'OK', onPress: () => navigation.navigate('Home')},
        ]);
      })
      .catch((error) => {
        Alert.alert('Error', 'Something when wrong, try again later', [
          {text: 'OK', onPress: () => navigation.navigate('Home')},
        ]);
      });
      
    navigation.navigate("Home");
  }

  return (
    <View className="w-full h-max">
      <View className="m-2 mt-5 flex-column items-center">
        <TouchableOpacity
          onPress={() => sigoutHandler()}
        >
          <Text className="text-lg color-blue-500 underline">
            {t("SignOut")}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="mt-3"
          onPress={() => deleteAccountHandler()}
        >
          <Text className="text-lg color-blue-500 underline">
            {t("DeleteAccount")}
          </Text>
        </TouchableOpacity>
      </View>

      <AdsScreen />
      <AdsFullScreen showFullAds={showFullAds}/>
    </View>
  )
}


export default AccountScreen