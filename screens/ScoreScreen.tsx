import { View, Text, SafeAreaView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getUserScore } from '../utils/updateData';
import { useUserStore } from '../app/store.zustand.user';
import ErrorScreen from './ErrorScreen';
import { useTranslation } from 'react-i18next';
import { FlatList } from 'react-native-gesture-handler';
import UserAnswerCardScreen from './UserAnswerCardScreen';
import AdsScreen from './AdsScreen';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import AdsFullScreen from './AdsFullScreen';

type responseDataProp = {
  "_id": string,
  "userId": string,
  "question": string,
  "isCorrect": boolean,
  "createdAt": string,
}

type RootStackParamList = {};

type Props = NativeStackScreenProps<RootStackParamList>;

const ScoreScreen = ({ route, navigation }: Props) => {
  const {showFullAds} = route.params;
  const userInfo  = useUserStore((state) => state.user);
  const token  = useUserStore((state) => state.token);
  const [showErrorShowMyScore, setshowErrorShowMyScore] = useState<boolean>(false);
  const {t} = useTranslation();
  const [responseData, setResponseData] = useState<responseDataProp>();
  const [isLoadingData, setIsLoadingData] = useState<boolean>(true);

  const showScoreHandler = async () => {
    if(!userInfo || !token) {
      setshowErrorShowMyScore(true);
    }
  };

  const setHideErrorShowMyScoreHandler = () => {
    setshowErrorShowMyScore(false);
  }
  
  useEffect(() => {
    setIsLoadingData(true);
    const getDataScore = async () => {
      const data = {
        token: token,
        email: userInfo.user.email
      }
      getUserScore(data)
        .then((response) => {
          //console.log(response);
          setIsLoadingData(false);
          if(response.result) {
            setResponseData(response.result);
          }
        })
        .catch((error) => {
          setIsLoadingData(false);
          // Handle errors if necessary
        });
      
    };
    
    if(userInfo && token) {
      getDataScore();
    }
  }, []);

  return (
    <SafeAreaView className="flex-columns items-center w-full h-max">
      <View className="w-full h-[89%]">
        {showErrorShowMyScore &&
          <ErrorScreen 
            msg={t("error-use-func-msg")}
            closeErrorMsg={setHideErrorShowMyScoreHandler}
            timeout={-1}
          />
        }
        
        {isLoadingData &&
          <View>
            <Text>Loading </Text>
            <ActivityIndicator
              animating = {isLoadingData}
              color = '#bc2b78'
              size = "large"/>
          </View>
        }
        {!isLoadingData &&
          <View className="w-full h-full">
            {responseData && responseData?.length ? (
              <View className="mt-2 h-[98%] w-full">
                <Text className="ml-2 text-xl bold underline text-blue-700">Your List of Questions Test</Text>
                <FlatList
                  data={responseData}
                  renderItem={({item, index}) => <UserAnswerCardScreen 
                                                    item={item}
                                                    index={index}
                                                  />
                                  }
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>
              ) : (
                <View className="mt-2 ml-2 h-[90%] w-[95%] items-center justify-center">
                  <Text className="text-2xl bold text-red-700">
                    You don't have any answers yet.
                  </Text>
                </View>
              )
            }
          </View>
        }
      </View>

      <AdsScreen />
      <AdsFullScreen showFullAds={showFullAds}/>
    </SafeAreaView>
  )
}

export default ScoreScreen