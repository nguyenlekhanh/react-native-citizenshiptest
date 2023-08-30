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
import { googleSignIn } from '../utils/googleUtil';

const LoginButton = () => {
  const setUser = useUserStore((state) => state.setUser);

  const appleLoginHandler = async () => {
    const user = await StorageService.getItem(StorageService.USER);

    if(!user) {
      onAppleButtonPress(setUser);
    } else {
      setUser(JSON.parse(user));
    }
  }

  const googleSignInHandler = async () => {
    const user = await StorageService.getItem(StorageService.USER);

    if(!user) {
      googleSignIn(setUser);
    } else {
      setUser(JSON.parse(user));
    }
  }

  return (
    <View className="flex-row gap-3">
      <Pressable
        style={[styles.button, styles.buttonClose]}
        onPress={() => appleLoginHandler()}>
        <Text style={styles.textStyle}
          className="text-xl"
        >
          Apple
        </Text>
      </Pressable>
      <Pressable
        style={[styles.button, styles.buttonClose]}
        onPress={() => googleSignInHandler(false)}>
        <Text style={styles.textStyle}
          className="text-xl"
        >
          Google
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 8,
    padding: 10,
    elevation: 2
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
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default LoginButton;
