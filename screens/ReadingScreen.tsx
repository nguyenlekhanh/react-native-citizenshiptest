import { View, Text, ActivityIndicator, TouchableOpacity   } from 'react-native'
import React, { useRef, useState, useEffect } from 'react'
import AdsScreen from './AdsScreen';
import { useTranslation } from 'react-i18next';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import data from "../data/reading.json";
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import {
  MinusIcon, PlusIcon
} from 'react-native-heroicons/outline';
import ScrollToTopScreen from './ScrollToTopScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import ParseGroupItemScreen from './ParseGroupItemScreen';
import ReadingScreenParseItem from './ReadingScreenParseItem';
import AdsFullScreen from './AdsFullScreen';
import ForQuestionScreen from './settings/ForQuestionScreen';
import { setPreviousPlayingAudioHandler, stopPreviousPlayingAudioHandler } from '../utils/libs';

type RootStackParamList = {};

type Props = NativeStackScreenProps<RootStackParamList>;

const ReadingScreen = ({ route, navigation }: Props) => {
  const {showFullAds} = route.params;
  const listRef = useRef(null);
  const [isLoadingData, setIsLoadingData] = useState<boolean>(true);
  const {t} = useTranslation();

  const [jsonData, setJsonData] = useState('');

  const [toggleTranslate, setToggleTranslate] = useState<boolean>(false)
  const [fontsize, setFontsize] = useState<number>(0);
  let defaultPrimaryFontSize = 20;
  let defaultSubSizeNumber = 20;
  const [primaryFontSize, setPrimaryFontSize] = useState<number>(20);
  const [subFontSize, setSubFontSize] = useState<number>(18);

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

  useEffect(() => {
    setIsLoadingData(true);
    if(!jsonData) {
      setTimeout(() => {
        if(data && data?.questions) {
          setJsonData(data.questions);
          setIsLoadingData(false);
        }
      }, 1);
    } else {
      setIsLoadingData(false);
    }
  }, [jsonData]);

  const scrollToTopHandler = () => {
    listRef.current.scrollToOffset({ offset: 0, animated: true });
  }

  const toggleTranslateHandler = () => {
    setToggleTranslate(!toggleTranslate);
  }

  return (
    <View className="flex-columns items-center w-full h-max">
      <View className="w-full h-[100%] mt-2">
        {isLoadingData &&
          <View>
            <Text>Loading </Text>
            <ActivityIndicator
              animating = {isLoadingData}
              color = '#bc2b78'
              size = "large"/>
          </View>
        }
        {jsonData && jsonData?.length &&
          <View className="m-2">
            
            <FlatList
              className=""
              ref={listRef}
              data={jsonData}
              renderItem={({item, index}) => <ReadingScreenParseItem 
                                                count={index}
                                                question={item}
                                                primaryFontSize={primaryFontSize}
                                                subFontSize={subFontSize}
                                                setPreviousPlayingAudioHandler={setPreviousPlayingAudioHandler}
                                                stopPreviousPlayingAudioHandler={stopPreviousPlayingAudioHandler}
                                      />
                              }
              keyExtractor={(item, index) => index.toString()}
            />
            
            <ScrollToTopScreen ref={listRef}/>
            <ForQuestionScreen 
                    changeFontsizeHandler={changeFontsizeHandler} 
                    toggleTranslateHandler={toggleTranslateHandler}
                  />
          </View>
        }
      </View>

      <AdsScreen />
      <AdsFullScreen showFullAds={showFullAds}/>
    </View>
  )
}


export default ReadingScreen