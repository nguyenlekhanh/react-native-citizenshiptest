import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { learn_2008, serverUrl } from '../utils/variables';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import data from "../data/civics_test_2008.json";
import { useDataStore } from '../app/store.zustand.data';
import QuestionsCardScreen from './QuestionsCardScreen';

import {
  ChevronUpIcon
} from 'react-native-heroicons/outline';
import ScrollToTopScreen from './ScrollToTopScreen';

type RootStackParamList = {};

type Props = NativeStackScreenProps<RootStackParamList>;


const LearnScreen = ({ route, navigation }: Props) => {
  const listRef = useRef(null);
  const [isLoadingData, setIsLoadingData] = useState<boolean>(true);

  const jsonData = useDataStore((state) => state.data);
  const setJsonData = useDataStore((state) => state.setData);

  useEffect(() => {
    if(!jsonData) {
      console.log('nodata');
      setTimeout(() => {
        const parsedData = JSON.stringify(data.questions);
          if(parsedData) {
            setJsonData(JSON.parse(parsedData));
            setIsLoadingData(false);
          }
      }, 1);
    } else {
      console.log('hasdata');
      setIsLoadingData(false);
    }
  }, [jsonData]);

  const scrollToTopHandler = () => {
    listRef.current.scrollToOffset({ offset: 0, animated: true });
  }

  return (
    <View>
      {isLoadingData &&
        <ActivityIndicator
          animating = {isLoadingData}
          color = '#bc2b78'
          size = "large"/>
      }
      {jsonData && jsonData?.length &&
        <View className="m-2">
          <FlatList
            ref={listRef}
            data={jsonData}
            renderItem={({item, index}) => <QuestionsCardScreen 
                                        count={index}
                                        question={item.question}
                                        question_vn={item.question_vn}
                                        answer={item.answer}
                                        answer_vn={item.answer_vn}
                                    />
                            }
            keyExtractor={(item, index) => index.toString()}
          />
          {/* <TouchableOpacity 
            className="absolute right-0 bottom-2 mr-2"
            onPress={() => scrollToTopHandler()}
          >
            <View className="w-10 h-10 border border-lime-400 rounded-full">
              <Text>sklsdf</Text>
            </View>
          </TouchableOpacity> */}
          <ScrollToTopScreen ref={listRef}/>
        </View>
      }
    </View>
  )
}

export default LearnScreen