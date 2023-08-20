import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { FlatList } from 'react-native-gesture-handler';
import Sound from 'react-native-sound';
import { PlayIcon, StopIcon } from 'react-native-heroicons/solid';

type ItemProps = {
  count: number,
  question: any,
  primaryFontSize: number,
  subFontSize: number
};

let audio:Sound;

const ParseItemScreen = (
  {
    count, question, primaryFontSize, subFontSize
  }: ItemProps) => {

  const {t} = useTranslation();
  const [refTextColor, setRefTextColor] = useState<string>('#84CC15');

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

  useEffect(() => {

    // Specify how to clean up after this effect:
    return () => {
      if(audio) {
        audio.stop();
      }
    };
  }, []);
  
  return (
    <View className="bg-[#fff] mb-8 p-1">
      <View className="mb-3">
        <Text style={{fontSize: primaryFontSize, color: '#0000FF'}} className="">
          <Text className="underline">Question {count+1}</Text>: {question.Question} &nbsp;
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
        <Text style={{fontSize: primaryFontSize, color: '#198754'}}>
          <Text className="underline">Answer</Text>: {question.Answer}
        </Text>

        {/* <View>
        {questions ? <FlatList
            data={group.items}
            renderItem={({item, index}) => <QuestionOptionsCardScreen 
                                              question={item}
                                              primaryFontSize={primaryFontSize}
                                              subFontSize={subFontSize}
                                            />
                            }
            keyExtractor={(item, index) => index.toString()}
          />
        : (<View><Text>No Data</Text></View>)} */}
        {/* </View> */}
      </View>
    </View>
  )
}

export default ParseItemScreen