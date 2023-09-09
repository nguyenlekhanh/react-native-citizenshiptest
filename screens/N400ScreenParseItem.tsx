import { View, Text, TouchableOpacity, AppState } from 'react-native'
import React, { useEffect, useState, memo } from 'react'
import { useTranslation } from 'react-i18next';
import { FlatList } from 'react-native-gesture-handler';
import Sound from 'react-native-sound';
import { PlayIcon, StopIcon } from 'react-native-heroicons/solid';
import StorageService from '../utils/StorageService';
import { useNavigation } from '@react-navigation/native';
import { appStateUnfocus } from '../utils/libs';

type ItemProps = {
  count: number,
  question: any,
  primaryFontSize: number,
  subFontSize: number,
  toggleTranslate: boolean,
  translate_explanation: string,
  setPreviousPlayingAudioHandler: (value: React.Dispatch<React.SetStateAction<boolean>>) => void,
  stopPreviousPlayingAudioHandler: () => void
};

let audio:Sound;

const N400ScreenParseItem = (
  {
    count, question, primaryFontSize, subFontSize, toggleTranslate, translate_explanation,
    setPreviousPlayingAudioHandler, stopPreviousPlayingAudioHandler
  }: ItemProps) => {

  const navigation = useNavigation();
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const {t} = useTranslation();
  const [refTextColor, setRefTextColor] = useState<string>('#84CC15');

  const defaultTranslateTxt = 'translate_';
  const [ln, setLn] = useState('');
  useEffect(() => {
    const getLanguage = async () => {
      const language = await StorageService.getItem(StorageService.APP_LANGUAGE);
      if(language && language?.language) {
        setLn(defaultTranslateTxt + "" + language.language);
      }
    }
    getLanguage();

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

  return (
    <View className="bg-[#fff] mb-8 p-1 border border-green-500	rounded-lg border-2	">
      <View className="mb-3">
        <Text style={{fontSize: primaryFontSize, color: '#0000FF'}} className="">
          <Text className="underline">Question {count+1}</Text>: {question.question}
        </Text>
        <Text>
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
        </Text>

        <Text style={{fontSize: primaryFontSize, color: '#198754'}}>
          <Text className="underline">Explanation</Text>: {question.explanation}
        </Text>

        {toggleTranslate && 
          <Text style={{fontSize: subFontSize}}
            className="mt-3"
          >
            <Text className="underline">Translate</Text>: {translate_explanation}
          </Text>
        }
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