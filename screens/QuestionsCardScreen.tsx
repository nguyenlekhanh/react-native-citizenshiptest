import { View, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Sound from 'react-native-sound';
import { PlayIcon, StopIcon } from 'react-native-heroicons/solid';
import cls from "classnames";

type ItemProps = {
  count: number,
  question: string,
  question_vn: string,
  answer: string,
  answer_vn: string,
  voice: string,
  toggleTranslate: boolean,
  primaryFontSize: number,
  subFontSize: number
};

let audio:Sound;

const QuestionsCardScreen = (
  {
    count, question, question_vn, answer, answer_vn, voice,
    toggleTranslate, primaryFontSize, subFontSize
  }: ItemProps) => {

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
    <View className="bg-[#fff] mb-8 p-1">
      <Text style={{fontSize: primaryFontSize, color: '#0000FF'}}>
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
        <Text style={{fontSize: subFontSize, marginBottom: 10}}>
          ({question_vn})
        </Text>
      }
      <Text style={{fontSize: primaryFontSize, color: '#0000FF'}}>
        <Text className="underline">Answer</Text>: {typeof answer == "string" ? answer : JSON.stringify(answer, null, 2)}
      </Text>
      {toggleTranslate && 
        <Text style={{fontSize: subFontSize}}>
          {typeof answer_vn == "string" ? answer_vn : JSON.stringify(answer_vn, null, 2)}
        </Text>
      }
    </View>
  )
}

export default QuestionsCardScreen