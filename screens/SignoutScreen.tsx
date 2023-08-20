import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useUserStore } from '../app/store.zustand.user';
import { useNavigation } from '@react-navigation/native';
import { googleSignIn, googleSignOut } from '../utils/googleUtil';
import StorageService from '../utils/StorageService';
import { useTranslation } from 'react-i18next';
import { serverUrl, signupWithGoogleUrl } from '../utils/variables';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchData } from '../utils/updateData';
import Icon from 'react-native-vector-icons/FontAwesome5';

const SignoutScreen: React.FC = () => {
  const navigation = useNavigation();
  const userServerUpdated = useState<number>(1);
  const userInfo = useUserStore((state) => state.user);
  const setUser  = useUserStore((state) => state.setUser);
  const token = useUserStore((state) => state.token);
  const setToken  = useUserStore((state) => state.setToken);
  const {t} = useTranslation();

  useEffect(() => {
    const getUser = async () => {
      const user = await StorageService.getItem(StorageService.USER);

      if(user) {
        if(typeof user == 'string') {
          setUser(JSON.parse(user));
        } if(typeof user == 'object') {
          setUser(user);
        }
      }
    }
    getUser();
  }, []);

  useEffect(() => {

    if(userInfo && !token) {
      const userCheck = async () => {
        const url = serverUrl + signupWithGoogleUrl;

        fetchData(url, userInfo)
          .then((data) => {
            setToken(data.token);
          })
          .catch((error) => {
            // Handle errors if necessary
          });
      }
      userCheck();
    }

  }, [userInfo]);


  // useEffect(() => {
  //   if(token) {
      
  //   }
  // }, [token]);

  const googleSignInHandler = async () => {
    const user = await StorageService.getItem(StorageService.USER);

    if(!user) {
      googleSignIn(setUser);
    } else {
      setUser(JSON.parse(user));
    }
  }

  const removeUser = () => {
    setToken('');
    googleSignOut(setUser);
  }

  if(userInfo || token) {
    return (
      <TouchableOpacity onPress={() => removeUser()}
        className="mr-2"
      >
        <Icon name="file-export" size={25} color="#D07F8B"
        />
      </TouchableOpacity>
    )
  } else {
    return (
      <>
        <TouchableOpacity onPress={() => googleSignInHandler()}
          className=""
        >
          <Image source={require('../assests/imgs/google.png')} 
            className="mt-0 mr-2"
          />
        </TouchableOpacity>
      </>
    );
  }
}

export default SignoutScreen