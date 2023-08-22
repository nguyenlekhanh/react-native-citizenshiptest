import { View, Text, Modal, StyleSheet, Pressable, 
        TextInput, Alert, NativeSyntheticEvent, TextInputChangeEventData,
        Linking
      } from 'react-native'
import React, { useEffect, useState } from 'react'

type PropsType = {
  title: string,
  modalVisible: boolean,
  setModalVisibileHandler: (showHide: boolean) => void
}

const ModalUpdateApp = ({
  title, modalVisible, setModalVisibileHandler
} : PropsType) => {

  const gotoUpdateLink = () => {
    setModalVisibileHandler(false);
    Linking.openURL("https://play.google.com/store/apps/details?id=com.programming.citizenshiptest")
  }

  return (
    <View
      style={styles.centeredView}
    >
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisibileHandler(false);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}
              className="text-xl"
            >
              {title}
            </Text>
            
            <View className="flex-row gap-3">
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => gotoUpdateLink()}>
                <Text style={styles.textStyle}
                  className="text-xl"
                >
                  Update
                </Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisibileHandler(false)}>
                <Text style={styles.textStyle}
                  className="text-xl"
                >
                  Close
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
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

export default ModalUpdateApp