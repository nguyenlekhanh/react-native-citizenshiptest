import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { FlatList } from 'react-native-gesture-handler';
import Sound from 'react-native-sound';
import { PlayIcon, StopIcon } from 'react-native-heroicons/solid';
import StorageService from '../utils/StorageService';

type ItemProps = {
  count: number,
  question: any,
  primaryFontSize: number,
  subFontSize: number
};

let audio:Sound;

const ReadingScreenParseItem = (
  {
    count, question, primaryFontSize, subFontSize
  }: ItemProps) => {

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
  }, []);

  const pauseAudio = () => {
    if(audio) {
      audio.stop();
    }
  }

  const playingAudio = (url: string) => {
    if(audio){
      if(audio.isPlaying()){
        audio.stop();
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

        audio.play(success => {
          if (success) {
            console.log('successfully finished playing');
          } else {
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
          <Text className="underline">Question {count+1}</Text>: {question.question} &nbsp;
          {question.voice &&
            <TouchableOpacity
              onPress={() => playingAudio(question.voice)}
            >
              <PlayIcon size={20} color="blue"/>
            </TouchableOpacity>
          }&nbsp;&nbsp;
          {question.voice &&
            <TouchableOpacity
              onPress={() => pauseAudio()}
            >
              <StopIcon size={20} color="blue"/>
            </TouchableOpacity>
          }
        </Text>
        {question[ln] &&
          <Text style={{fontSize: primaryFontSize, color: '#198754'}}>
            <Text className="underline">Translate</Text>: {question[ln]}
          </Text>
        }
      </View>
    </View>
  )
}

export default ReadingScreenParseItem