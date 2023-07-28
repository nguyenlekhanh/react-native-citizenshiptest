import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useUserStore } from '../app/store.zustand.user';
import { useNavigation } from '@react-navigation/native';
import { googleSignIn, googleSignOut } from '../utils/googleUtil';
import StorageService from '../utils/StorageService';
import { useTranslation } from 'react-i18next';
import { serverUrl, signupWithGoogleUrl } from '../utils/variables';

const SignoutScreen: React.FC = () => {
  const navigation = useNavigation();
  const userServerUpdated = useState<number>(1);
  const userInfo  = useUserStore((state) => state.user);
  const setUser  = useUserStore((state) => state.setUser);
  const {t} = useTranslation();

  async function fetchData(url: string, user:any): Promise<any[]> {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data: any[] = await response.json();
      return data;
    } catch (error) {
      // You can handle errors here
      console.error('Error fetching data:', error);
      throw error;
    }
  }

  async function updateTokenUserInfo(data: any[], user:any) {

    if(data && data?.token) {
      user.token = data.token;

      await StorageService.saveItem(StorageService.USER, JSON.stringify(user));

      setUser(user);
    }
  }

  useEffect(() => {
    const getUser = async () => {
      const user = await StorageService.getItem(StorageService.USER);

      if(user) {
        const parseUser = JSON.parse(user);

        if(typeof(parseUser.token) == "undefined") {

          const userCheck = async () => {
            const url = serverUrl + signupWithGoogleUrl;
    
            fetchData(url, parseUser)
              .then((data) => {
                console.log(data);
                // Process the fetched data here
                updateTokenUserInfo(data, parseUser);
              })
              .catch((error) => {
                // Handle errors if necessary
              });
          }
          userCheck();
        } else {
          setUser(JSON.parse(user));
        }
      }
    }
    getUser();
  }, []);


  useEffect(() => {

    if(userInfo && typeof(userInfo.token) == "undefined") {
  
      const userCheck = async () => {
        const url = serverUrl + signupWithGoogleUrl;

        fetchData(url, userInfo)
          .then((data) => {
            console.log(data);
            // Process the fetched data here
            updateTokenUserInfo(data, [...userInfo]);
          })
          .catch((error) => {
            // Handle errors if necessary
          });
      }
      userCheck();
    }

  }, [userInfo]);


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
    //navigation.replace('Login');
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