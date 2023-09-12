import { View, Text, TouchableOpacity, AppState } from 'react-native'
import React, { useEffect, useState, memo } from 'react'
import { useTranslation } from 'react-i18next';
import { FlatList } from 'react-native-gesture-handler';
import Sound from 'react-native-sound';
import { PlayIcon, StopIcon } from 'react-native-heroicons/solid';
import StorageService from '../utils/StorageService';
import { useNavigation } from '@react-navigation/native';
import { appStateUnfocus } from '../utils/libs';

import N400ScreenParseWordItem from './N400ScreenParseWordItem';
import { TRANSLATE_TYPE } from '../utils/variables';


type ItemProps = {
  count: number,
  question: any,
  primaryFontSize: number,
  subFontSize: number,
  toggleTranslate: boolean,
  toggleTranslateHandler: () => void,
  showTranslate: boolean,
  setShowTranslateHandler: () => void,
  translate_question: string,
  setPreviousPlayingAudioHandler: (value: React.Dispatch<React.SetStateAction<boolean>>) => void,
  stopPreviousPlayingAudioHandler: () => void
};

let audio:Sound;

const N400ScreenParseItem = (
  {
    count, question, primaryFontSize, subFontSize, toggleTranslate, translate_question,
    toggleTranslateHandler, showTranslate, setShowTranslateHandler,
    setPreviousPlayingAudioHandler, stopPreviousPlayingAudioHandler
  }: ItemProps) => {

  const navigation = useNavigation();
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const {t, i18n} = useTranslation();
  const [refTextColor, setRefTextColor] = useState<string>('#84CC15');

  const defaultTranslateTxt = 'question_';
  const [ln, setLn] = useState('');

  const setLanguageHandler = () => {
    const getLanguage = async () => {
      const language = await StorageService.getItem(StorageService.APP_LANGUAGE);
      if(language && language?.language) {

        setLn(defaultTranslateTxt + "" + language.language);
      } else {
        setLn(defaultTranslateTxt + "" + TRANSLATE_TYPE.EN);
      }
    }
    getLanguage();
  }

  useEffect(() => {
    setLanguageHandler();

    const subscription = appStateUnfocus(AppState, stopAudio);

    return () => {
      subscription.remove();
      if(audio && audio.isPlaying() && !navigation.isFocused()) {
        audio.stop();
      }
    };
  }, []);

  const stopAudio = () => {
    if(audio && audio.isPlaying()) {
      audio.stop();
      setIsPlayingAudio(false);
      stopPreviousPlayingAudioHandler();
    }
  }

  const pauseAudio = () => {
    if(audio) {
      stopAudio();
    }
  }

  const playingAudio = (url: string) => {
    if(audio){
      if(audio.isPlaying()){
        stopAudio();
      }
    }
    Sound.setCategory('Playback');

    audio = new Sound(
      url,
      null,
      error => {
        if (error) {
          console.log('failed to load the sound', error);
          return;
        }

        setIsPlayingAudio(true);
        setPreviousPlayingAudioHandler(setIsPlayingAudio);
        audio.play(success => {
          if (success) {
            setIsPlayingAudio(false);
            console.log('successfully finished playing');
          } else {
            setIsPlayingAudio(false);
            console.log('playback failed due to audio decoding errors');
          }
        });
      },
    );
    audio.release();    
  }

  
  const changeLng = async (lng: string) => {
    await StorageService.saveItem(StorageService.APP_LANGUAGE, {"language": lng});
    i18n.changeLanguage(lng);
    setLanguageHandler();
    
    if(ln != TRANSLATE_TYPE.TRANSLATE_EN && !toggleTranslate) {
      toggleTranslateHandler();
    }
  };

  const showTranslateHandler = () => {
    setShowTranslateHandler()
    if(ln != TRANSLATE_TYPE.QUESTION_EN) {
      toggleTranslateHandler();
    }
    // toggleTranslateHandler();
  }

  return (
    <View className="bg-[#fff] mb-8 p-1 border border-green-500	rounded-lg border-2	">
      <View className="mb-3">
        <Text style={{fontSize: primaryFontSize, color: '#0000FF'}} className="">
          {question.question}
        </Text>
        
        {showTranslate && ln == TRANSLATE_TYPE.QUESTION_EN &&
          <View className="flex-row w-full content-end">
            <TouchableOpacity onPress={() => changeLng(TRANSLATE_TYPE.VN)}>
              <Text className="bold text-xl text-blue-700 mr-5">VN</Text>
            </TouchableOpacity>
            <Text className="bold text-xl text-blue-700"></Text>
            <TouchableOpacity onPress={() => changeLng(TRANSLATE_TYPE.ES)}>
              <Text className="bold text-xl text-blue-700 ml-5 mr-5">ES</Text>
            </TouchableOpacity>
          </View>
        }
        {toggleTranslate && 
          <Text style={{fontSize: primaryFontSize}}>
            {question[ln]}
          </Text>
        }

        <TouchableOpacity
          onPress={() => showTranslateHandler()}
        >
          <Text 
            className="underline"
            style={{fontSize: 18}}
          >
            {!showTranslate ? "Show translate" : "Hide translate"}
          </Text>
        </TouchableOpacity>

        {/* {showTranslate ? (
          <>
            {ln == TRANSLATE_TYPE.TRANSLATE_EN &&
              <View className="flex-row w-full content-end">
                <TouchableOpacity onPress={() => changeLng(TRANSLATE_TYPE.VN)}>
                  <Text className="bold text-xl text-blue-700 mr-5">VN</Text>
                </TouchableOpacity>
                <Text className="bold text-xl text-blue-700"></Text>
                <TouchableOpacity onPress={() => changeLng(TRANSLATE_TYPE.ES)}>
                  <Text className="bold text-xl text-blue-700 ml-5 mr-5">ES</Text>
                </TouchableOpacity>
              </View>
            }
            {toggleTranslate && 
              <Text style={{fontSize: primaryFontSize}}>
                {translate_question}
              </Text>
            }
          </>
        ): (
          <></>
        )} */}
        {/* <Text>
          {question.voice && (
            <>
              {isPlayingAudio ? ( 
                <TouchableOpacity
                  onPress={() => pauseAudio()}
                >
                  <StopIcon size={20} color="blue"/>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => playingAudio(question.voice)}
                >
                  <PlayIcon size={20} color="blue"/>
                </TouchableOpacity>
              )}
            </>
          )}
        </Text> */}

        {question.words && question.words.length > 0 ? (
          <View className="">
            <FlatList
              data={question.words}
              renderItem={({item, index1}) => <N400ScreenParseWordItem 
                                                count={index1}
                                                question={item}
                                                primaryFontSize={primaryFontSize}
                                                subFontSize={subFontSize}
                                                toggleTranslate={toggleTranslate}
                                                // translate_explanation={item[translateExplanationLn]}
                                      />
                              }
              keyExtractor={(item, index1) => (count.toString() + "D" + index1.toString())}
            />
          </View>
        ) : (
          <></>
        )
        }

        {/* <Text style={{fontSize: primaryFontSize, color: '#198754'}}>
          <Text className="underline">Explanation1</Text>: {question.explanation}
        </Text> */}

      </View>
    </View>
  )
}

function areItemsEqual(prevItem: ItemProps, nextItem: ItemProps) {
  return Object.keys(prevItem).every(key => {
      return prevItem[key as keyof ItemProps] === nextItem[key as keyof ItemProps]
  })
}

const MemoizedCartLineItem = memo<typeof N400ScreenParseItem>(N400ScreenParseItem, areItemsEqual)

export default MemoizedCartLineItem