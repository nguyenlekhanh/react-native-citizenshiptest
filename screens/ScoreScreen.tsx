import { View, Text, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getUserScore } from '../utils/updateData';
import { useUserStore } from '../app/store.zustand.user';
import ErrorScreen from './ErrorScreen';
import { useTranslation } from 'react-i18next';
import { FlatList } from 'react-native-gesture-handler';
import UserAnswerCardScreen from './UserAnswerCardScreen';
import AdsScreen from './AdsScreen';

type responseDataProp = {
  "_id": string,
  "userId": string,
  "question": string,
  "isCorrect": boolean,
  "createdAt": string,
}

const ScoreScreen: React.FC = () => {
  const userInfo  = useUserStore((state) => state.user);
  const token  = useUserStore((state) => state.token);
  const [showErrorShowMyScore, setshowErrorShowMyScore] = useState<boolean>(false);
  const {t} = useTranslation();
  const [responseData, setResponseData] = useState<responseDataProp>();

  const showScoreHandler = async () => {
    if(!userInfo || !token) {
      setshowErrorShowMyScore(true);
    }
  };

  const setHideErrorShowMyScoreHandler = () => {
    setshowErrorShowMyScore(false);
  }
  
  useEffect(() => {
    const getDataScore = async () => {
      const data = {
        token: token,
        email: userInfo.user.email
      }
      getUserScore(data)
        .then((response) => {
          //console.log(response);
          if(response.result) {
            setResponseData(response.result);
          }
        })
        .catch((error) => {
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
        {/* <Text>{JSON.stringify(responseData, null, 2)}</Text> */}
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
      </View>

      <AdsScreen />
    </SafeAreaView>
  )
}

export default ScoreScreen