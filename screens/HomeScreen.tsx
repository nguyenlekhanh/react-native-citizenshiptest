import { View, Text, TextInput, SafeAreaView, Button } from 'react-native'
import React, { useState, useEffect } from 'react'
import AdsScreen from './AdsScreen';
import { TouchableOpacity } from 'react-native';
import LanguageScreen from './Language';
import { ScrollView } from 'react-native-gesture-handler';
import { useTranslation } from 'react-i18next';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import StorageService from '../utils/StorageService';
import AdsFullScreen from './AdsFullScreen';
import { useUserStore } from '../app/store.zustand.user';
import ErrorScreen from './ErrorScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
  

type RootStackParamList = {};

type Props = NativeStackScreenProps<RootStackParamList>;

const HomeScreen = ({ route, navigation }: Props) => {
  const buttonStyle = "w-auto p-3 bg-lime-500 rounded bold mt-2";
  const {t, i18n} = useTranslation();
  const userInfo  = useUserStore((state) => state.user);
  const token  = useUserStore((state) => state.token);
  const [showErrorShowMyScore, setshowErrorShowMyScore] = useState<boolean>(false);
  const [showErrorContact, setshowErrorContact] = useState<boolean>(false);
  
  const learnHandler = () => {
      navigation.navigate("Learn");
  }

  const learn2020Handler = () => {
    navigation.navigate("Learn2020");
}

  const testHandler = () => {
    navigation.navigate("Test");
  }

  const smallTalkHandler = () => {
    navigation.navigate("SmallTalk");
  }

  const readingScreenHandler = () => {
    navigation.navigate("Reading");
  }  
  
  useEffect(() => {
    const getLanguage = async () => {
      const language = await StorageService.getItem(StorageService.APP_LANGUAGE);
      if(language) {
        i18n.changeLanguage(language?.language);
      }
    }
    getLanguage();
  }, []);

  const showScoreHandler = async () => {
    if(userInfo && token) {
      navigation.navigate('ScoreScreen');
    } else {
      setshowErrorShowMyScore(true);
    }
  };

  const setHideErrorShowMyScoreHandler = () => {
    setshowErrorShowMyScore(false);
  }

  const showContactScreenHandler = () => {
    if(userInfo && token) {
      navigation.navigate('Contact');
    } else {
      setshowErrorContact(true);
    }
  }

  return (
    <SafeAreaView className="flex-columns items-center w-full h-max">
        <View className="w-full h-[89%] mt-2">
            <View className="h-[90%]">
              <ScrollView>
                <View className="m-2">
                  <View>
                    <Text className="bold text-2xl">2008</Text>
                  </View>
                  <View>
                      <TouchableOpacity 
                        className={buttonStyle}
                        onPress={() => learnHandler()}
                      >
                          <View className="flex-row">
                            <Text className="text-[#fff] text-xl">{t("learn100questions")}</Text>
                            <View className="ml-auto justify-center">
                              <Icon name="chevron-right" size={20} color="white"/>
                            </View>
                          </View>
                      </TouchableOpacity>
                      <TouchableOpacity 
                        className={buttonStyle}
                        onPress={() => testHandler()}
                        style={{
                          backgroundColor:"#FF5949"
                        }}
                      >
                          <View className="flex-row">
                            <Text className="text-[#fff] text-xl">{t("Doing-a-test")}</Text>
                            <View className="ml-auto justify-center">
                              <Icon name="chevron-right" size={20} color="white"/>
                            </View>
                          </View>
                      </TouchableOpacity>
                      <View>
                        {showErrorShowMyScore &&
                          <ErrorScreen 
                            msg={t("error-use-func-msg")}
                            closeErrorMsg={setHideErrorShowMyScoreHandler}
                          />
                        }
                        <TouchableOpacity 
                          className={buttonStyle}
                          onPress={() => showScoreHandler()}
                          style={{
                            backgroundColor:"#EFAF4D"
                          }}
                        >
                          <View className="flex-row">
                            <Text className="text-[#fff] text-xl">
                              {t("show-my-score")}
                            </Text>
                            <View className="ml-auto justify-center">
                              <Icon name="chevron-right" size={20} color="white"/>
                            </View>
                          </View>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity 
                        className={buttonStyle}
                        onPress={() => readingScreenHandler()}
                        style={{
                          backgroundColor:"#2F26D9"
                        }}
                      >
                        <View className="flex-row">
                          <Text className="text-[#fff] text-xl">{t("reading-screen")}</Text>
                          <View className="ml-auto justify-center">
                            <Icon name="chevron-right" size={20} color="white"/>
                          </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        className={buttonStyle}
                        onPress={() => smallTalkHandler()}
                      >
                        <View className="flex-row">
                          <Text className="text-[#fff] text-xl">{t("small-talk")}</Text>
                          <View className="ml-auto justify-center">
                            <Icon name="chevron-right" size={20} color="white"/>
                          </View>
                        </View>
                    </TouchableOpacity>
                  </View>

                  <View className="mt-10">
                    <Text className="bold text-2xl">2020</Text>
                  </View>
                  <View>
                      <TouchableOpacity className={buttonStyle}
                        onPress={() => learn2020Handler()}
                        style={{
                          backgroundColor:"#EFAF4D"
                        }}
                      >
                        <View className="flex-row">
                          <Text className="text-[#fff] text-xl">{t("learn128questions")}</Text>
                          <View className="ml-auto justify-center">
                            <Icon name="chevron-right" size={20} color="white"/>
                          </View>
                        </View>
                      </TouchableOpacity>
                  </View>

                  {/* -------------- */}
                  <View className="my-7 border border-stone-400	" />

                  <View
                    className="w-full items-end mt-5"
                  >
                    {showErrorContact &&
                      <ErrorScreen 
                        msg={t("error-use-func-msg")}
                        closeErrorMsg={setshowErrorContact}
                      />
                    }
                    
                    <TouchableOpacity
                      onPress={() => showContactScreenHandler()}
                    >
                      <Text 
                        className="text-xl bold underline text-blue-700"
                      >{t("contact")}</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                
              </ScrollView>
            </View>

            <View className="absolute bottom-5 mr-4">
              <LanguageScreen />
            </View>
        </View>

        <AdsScreen />
    </SafeAreaView>
  )
}


export default HomeScreen