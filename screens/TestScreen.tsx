import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import data from "../data/civics_test_2008.json";
import { useDataStore } from '../app/store.zustand.data';
import QuestionsCardScreen from './QuestionsCardScreen';

import {
  MinusIcon, PlusIcon
} from 'react-native-heroicons/outline';
import ScrollToTopScreen from './ScrollToTopScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import AdsScreen from './AdsScreen';
import CheckBox from '../components/CheckBox';
import { useTranslation } from 'react-i18next';
import { getRandomNumbersArray } from '../utils/libs';
import QuestionsTestCardScreen from './QuestionsTestCardScreen';

type RootStackParamList = {};

type Props = NativeStackScreenProps<RootStackParamList>;

const TestScreen: React.FC = () => {
  const listRef = useRef(null);
  const [isLoadingData, setIsLoadingData] = useState<boolean>(true);
  const {t} = useTranslation();

  const jsonData = useDataStore((state) => state.data);
  const setJsonData = useDataStore((state) => state.setData);

  const [randomQuestionData, setRandomQuestionData] = useState<any>([]);

  const [toggleTranslate, setToggleTranslate] = useState<boolean>(false)
  const [fontsize, setFontsize] = useState<number>(0);
  let defaultPrimaryFontSize = 20;
  let defaultSubSizeNumber = 20;
  //let primaryFontSize = 'text-[20px]';
  //let subFontSize = 'text-[18px]';
  const [primaryFontSize, setPrimaryFontSize] = useState<number>(20);
  const [subFontSize, setSubFontSize] = useState<number>(18);

  const randomNumber = getRandomNumbersArray(10);

  const changeFontsizeHandler = (action:number) => {
    if(action === 1) {
      if(fontsize < 30) {
        setFontsize((prev) => prev = prev + 1);
      }
    } else if(action === 2) {
      if(fontsize > 0) {
        setFontsize((prev) => prev = prev - 1);
      }
    } else {
      setFontsize(0);
    }
    setPrimaryFontSize(defaultPrimaryFontSize + fontsize);
    setSubFontSize(defaultSubSizeNumber + fontsize);
  }

  const assignRandomQuestion = (questions:any) => {
    const parsedData = JSON.stringify(questions);
    if(parsedData) {
      const questionDataServer = JSON.parse(parsedData);

      randomNumber.map((item, index) => {
        //if(index<1) {
          tenQuestionsData.push(questionDataServer[item]);
        //}
      });
      //console.log(JSON.stringify(tenQuestionsData));
      setRandomQuestionData(tenQuestionsData);
    }
  }

  const tenQuestionsData: any[] = [];
  
  useEffect(() => {
    setIsLoadingData(true);
    if(!jsonData) {

      setTimeout(() => {
        assignRandomQuestion(data.questions);
        setIsLoadingData(false);
      }, 1);
    } else {
      assignRandomQuestion(data.questions);
      setIsLoadingData(false);
    }
  }, [jsonData]);

  const scrollToTopHandler = () => {
    if(listRef?.current) {
      listRef?.current.scrollToOffset({ offset: 0, animated: true });
    }
  }

  const toggleTranslateHandler = () => {
    setToggleTranslate(!toggleTranslate);
  }

  return (
    <SafeAreaView className="flex-columns items-center w-full h-max">
      <View className="w-full h-[89%] mt-2">
        {isLoadingData &&
          <ActivityIndicator
            animating = {isLoadingData}
            color = '#bc2b78'
            size = "large"/>
        }
        {randomQuestionData &&
          <View className="m-2">
            <View className="absolute top-0 left-0 w-full">
              <View className="flex-row justify-between	">
                <View className="flex-row">
                  <TouchableOpacity
                    onPress={() => toggleTranslateHandler()}
                    className="flex-row"
                  >
                    <Text className="text-xl text-blue-700">{t("show-translate")}</Text>
                    <CheckBox 
                      toggleTranslate={toggleTranslate}
                    />
                  </TouchableOpacity>
                </View>
                <View className="flex-row">
                  <TouchableOpacity
                    onPress={() => changeFontsizeHandler(3)}
                  >
                    <Text className="text-xl text-blue-700">{t("change-font-size")} &nbsp;</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => changeFontsizeHandler(1)}
                  >
                    <PlusIcon size={25} color="blue" />
                  </TouchableOpacity>
                  <Text>&nbsp;&nbsp;&nbsp;</Text>
                  <TouchableOpacity
                    onPress={() => changeFontsizeHandler(2)}
                  >
                    <MinusIcon size={25} color="blue" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            {randomQuestionData &&
              <FlatList
                className="mt-10"
                ref={listRef}
                data={randomQuestionData}
                renderItem={({item, index}) => <QuestionsTestCardScreen 
                                            count={index}
                                            question={item?.question}
                                            question_vn={item?.question_vn}
                                            answer={item?.answer}
                                            answer_vn={item?.answer_vn}
                                            voice={item?.voice}
                                            toggleTranslate={toggleTranslate}
                                            primaryFontSize={primaryFontSize}
                                            subFontSize={subFontSize}
                                            optionsChoice={item.options}
                                        />
                                }
                keyExtractor={(item, index) => index.toString()}
              />
            }

            {randomQuestionData &&
              <ScrollToTopScreen ref={listRef}/>
            }
          </View>
        }
      </View>

      <AdsScreen />
    </SafeAreaView>
  )
}

export default TestScreen