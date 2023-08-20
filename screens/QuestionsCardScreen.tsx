import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import Sound from 'react-native-sound';
import { PlayIcon, StopIcon } from 'react-native-heroicons/solid';
import cls from "classnames";

type ItemProps = {
  count: number,
  question: string,
  translate_question: string,
  answer: string,
  translate_answer: string,
  voice: string,
  toggleTranslate: boolean,
  primaryFontSize: number,
  subFontSize: number
};

let audio:Sound;

const QuestionsCardScreen = (
  {
    count, question, translate_question, answer, translate_answer, voice,
    toggleTranslate, primaryFontSize, subFontSize
  }: ItemProps) => {

  const pauseAudio = () => {
    if(audio) {
      audio.stop();
    }
  }

  useEffect(() => {

    // Specify how to clean up after this effect:
    return () => {
      if(audio) {
        audio.stop();
      }
    };
  }, []);

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
        // if loaded successfully
        // console.log(
        //   'duration in seconds: ' +
        //     audio.getDuration() +
        //     'number of channels: ' +
        //     audio.getNumberOfChannels(),
        // );

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
          <Text className="underline">Question {count+1}</Text>: {question} &nbsp;
          {voice &&
            <TouchableOpacity
              onPress={() => playingAudio(voice)}
            >
              <PlayIcon size={20} color="blue"/>
            </TouchableOpacity>
          }&nbsp;&nbsp;
          {voice &&
            <TouchableOpacity
              onPress={() => pauseAudio()}
            >
              <StopIcon size={20} color="blue"/>
            </TouchableOpacity>
          }
        </Text>
        {toggleTranslate && 
          <Text style={{fontSize: subFontSize}}>
            {translate_question ?? translate_question}
          </Text>
        }
      </View>

      <Text style={{fontSize: primaryFontSize, color: '#198754'}}>
        <Text className="underline">Answer</Text>: {typeof answer == "string" ? JSON.stringify(answer.split(","), null, 2) : JSON.stringify(answer, null, 2)}
      </Text>

      {toggleTranslate && 
        <Text style={{fontSize: subFontSize}}>
          {typeof translate_answer == "string" ? JSON.stringify(translate_answer.split(","), null, 2) : JSON.stringify(translate_answer, null, 2)}
        </Text>
      }
    </View>
  )
}

export default QuestionsCardScreen