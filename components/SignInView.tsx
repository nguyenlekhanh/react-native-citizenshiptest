import { View, Text, Modal, StyleSheet, Pressable, 
        Linking
      } from 'react-native'
import React, { useEffect } from 'react'
import StorageService from '../utils/StorageService'
import { googleSignIn } from '../utils/googleUtil'
import { useUserStore } from '../app/store.zustand.user'
import { appleAuth } from '@invertase/react-native-apple-authentication';
import { onAppleButtonPress } from '../utils/libs'

type PropsType = {
  title: string,
  setModalVisibileHandler: (showHide: boolean) => void
}

const SignInView = ({
  title, setModalVisibileHandler
} : PropsType) => {

  const setUser = useUserStore((state) => state.setUser);

  const googleSignInHandler = async () => {
    const user = await StorageService.getItem(StorageService.USER);

    if(!user) {
      googleSignIn(setUser);
    } else {
      setUser(JSON.parse(user));
    }
  }

  const appleLoginHandler = async () => {
    const user = await StorageService.getItem(StorageService.USER);

    if(!user) {
      onAppleButtonPress(setUser);
    } else {
      setUser(JSON.parse(user));
    }
    
  }

  useEffect(() => {
    // onCredentialRevoked returns a function that will remove the event listener. useEffect will call this function when the component unmounts
    return appleAuth.onCredentialRevoked(async () => {
      console.warn('If this function executes, User Credentials have been Revoked');
    });
  }, []); // passing in an empty array as the second argument ensures this is only ran once when component mounts initially.

  
  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Pressable
          className="absolute top-0 right-3 color-blue-500"
          onPress={() => setModalVisibileHandler(false)}
        >
          <Text
            className="color-blue-500 bold text-4xl"
          >&times;</Text>
        </Pressable>

        <Text style={styles.modalText}
          className="text-xl"
        >
          {title}
        </Text>
        
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
      </View>
    </View>
  );
}

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
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default SignInView