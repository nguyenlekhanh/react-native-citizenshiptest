import {
  View,
  Text,
  Modal,
  StyleSheet,
  Pressable,
  Linking,
  Platform,
} from 'react-native';
import React, {useEffect} from 'react';

import {appleAuth} from '@invertase/react-native-apple-authentication';
import {onAppleButtonPress} from '../utils/libs';
import StorageService from '../utils/StorageService';
import { useUserStore } from '../app/store.zustand.user';

const AppleLoginButton = () => {
  const setUser = useUserStore((state) => state.setUser);

  const appleLoginHandler = async () => {
    const user = await StorageService.getItem(StorageService.USER);

    if(!user) {
      onAppleButtonPress(setUser);
    } else {
      setUser(JSON.parse(user));
    }
  }

  return (
    <Pressable
      style={[styles.button, styles.buttonClose]}
      onPress={() => appleLoginHandler()}>
      <Text style={styles.textStyle}
        className="text-xl"
      >
        Apple
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default AppleLoginButton;
