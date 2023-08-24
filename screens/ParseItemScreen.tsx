import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState, memo } from 'react'
import { useTranslation } from 'react-i18next';
import { FlatList } from 'react-native-gesture-handler';
import Sound from 'react-native-sound';
import { PlayIcon, StopIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';

type ItemProps = {
  count: number,
  question: any,
  primaryFontSize: number,
  subFontSize: number,
  setPreviousPlayingAudioHandler: (value: React.Dispatch<React.SetStateAction<boolean>>) => void,
  stopPreviousPlayingAudioHandler: () => void
};

let audio:Sound;

const ParseItemScreen = (
  {
    count, question, primaryFontSize, subFontSize,
    setPreviousPlayingAudioHandler, stopPreviousPlayingAudioHandler
  }: ItemProps) => {

  const navigation = useNavigation();
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const {t} = useTranslation();
  const [refTextColor, setRefTextColor] = useState<string>('#84CC15');

  const pauseAudio = () => {
    if(audio) {
      stopAudio();
    }
  }

  const stopAudio = () => {
    audio.stop();
    setIsPlayingAudio(false);
    stopPreviousPlayingAudioHandler();
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
        // if loaded successfully
        // console.log(
        //   'duration in seconds: ' +
        //     audio.getDuration() +
        //     'number of channels: ' +
        //     audio.getNumberOfChannels(),
        // );

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

  useEffect(() => {

    // Specify how to clean up after this effect:
    return () => {
      if(audio && audio.isPlaying() && !navigation.isFocused()) {
        audio.stop();
      }
    };
  }, []);
  
  return (
    <View className="bg-[#fff] mb-8 p-1">
      <View className="mb-3">
        <Text style={{fontSize: primaryFontSize, color: '#0000FF'}} className="">
          <Text className="underline">Question {count+1}</Text>: {question.Question}
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

function areItemsEqual(prevItem: ItemProps, nextItem: ItemProps) {
  return Object.keys(prevItem).every(key => {
      return prevItem[key as keyof ItemProps] === nextItem[key as keyof ItemProps]
  })
}

const MemoizedCartLineItem = memo<typeof ParseItemScreen>(ParseItemScreen, areItemsEqual)

export default MemoizedCartLineItem