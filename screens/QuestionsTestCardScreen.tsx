import { View, Text, TouchableOpacity, AppState } from 'react-native'
import React, { useState, useEffect, memo } from 'react'
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import Sound from 'react-native-sound';
import { PlayIcon, StopIcon } from 'react-native-heroicons/solid';
import QuestionOptionsCardScreen from './QuestionOptionCardScreen';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { appStateUnfocus } from '../utils/libs';

type ItemProps = {
  count: number,
  question: string,
  translate_question: string,
  answer: string,
  translate_answer: string,
  voice: string,
  toggleTranslate: boolean,
  primaryFontSize: number,
  subFontSize: number,
  optionsChoice: [],
  updateRightWrongAnswer: (questionAnswered: number, answer: boolean) => void,
  setPreviousPlayingAudioHandler: (value: React.Dispatch<React.SetStateAction<boolean>>) => void,
  stopPreviousPlayingAudioHandler: () => void
};

let audio:Sound;

const QuestionsTestCardScreen = (
  {
    count, question, translate_question, answer, translate_answer, voice,
    toggleTranslate, primaryFontSize, subFontSize, optionsChoice,
    updateRightWrongAnswer,
    setPreviousPlayingAudioHandler, stopPreviousPlayingAudioHandler
  }: ItemProps) => {

  const navigation = useNavigation();
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const {t} = useTranslation();
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [userChoice, setUserChoice] = useState<number>(1);
  const [choseTrueAnswer, setChoseTrueAnswer] = useState<boolean>(false);

  const setChoseTrueAnswerHandler = () => {
    setChoseTrueAnswer(true);
  }

  const increaseUserChoiceHandler = () => {
    setUserChoice((prev) => prev + 1);
    //console.log(userChoice);
  }

  const toggleAnswerHandler = () => {
    setShowAnswer(!showAnswer);
  }

  const showAnswerHandler = () => {
    setShowAnswer(true);
  }

  const pauseAudio = () => {
    if(audio) {
      stopAudio();
    }
  }

  const stopAudio = () => {
    if(audio && audio.isPlaying()) {
      audio.stop();
      setIsPlayingAudio(false);
      stopPreviousPlayingAudioHandler();
    }
  }

  const playingAudio = (url: string) => {
    if(audio){
      if(audio.isPlaying()) {
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
    const subscription = appStateUnfocus(AppState, stopAudio);

    // Specify how to clean up after this effect:
    return () => {
      subscription.remove();

      if(audio && audio.isPlaying() && !navigation.isFocused()) {
        audio.stop();
      }
    };
  }, []);
  
  return (
    <View className="bg-[#fff] mb-8 p-1 border border-green-500	rounded-lg border-2	">
      <View className="mb-3">
        <Text style={{fontSize: primaryFontSize, color: '#0000FF'}} className="">
          <Text className="underline">Question {count+1}</Text>: {question}
        </Text>
        <Text>
          {voice && (
            <>
              {isPlayingAudio ? ( 
                <TouchableOpacity
                  onPress={() => pauseAudio()}
                >
                  <StopIcon size={20} color="blue"/>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => playingAudio(voice)}
                >
                  <PlayIcon size={20} color="blue"/>
                </TouchableOpacity>
              )}
            </>
          )}
        </Text>
        {toggleTranslate && 
          <Text style={{fontSize: subFontSize}}>
            {translate_question}
          </Text>
        }
      </View>

      <View className="mb-3">
        <Text style={{fontSize: primaryFontSize, color: '#0000FF'}}>
          <Text className="underline">Choices</Text>:
        </Text>

        <View>
        {optionsChoice && optionsChoice?.length && optionsChoice?.length > 1 ? <FlatList
            data={optionsChoice}
            renderItem={({item, index}) => <QuestionOptionsCardScreen 
                                              count={count+1}
                                              question={question}
                                              choice={item}
                                              subFontSize={subFontSize}
                                              showAnswerHandler={showAnswerHandler}
                                              increaseUserChoiceHandler={increaseUserChoiceHandler}
                                              userChoiceParam={userChoice}
                                              setChoseTrueAnswerHandler={setChoseTrueAnswerHandler}
                                              choseTrueAnswer={choseTrueAnswer}
                                              updateRightWrongAnswer={updateRightWrongAnswer}
                                            />
                            }
            keyExtractor={(item, index) => index.toString()}
          />
        : (<View><Text>Check Answer</Text></View>)}
        </View>
      </View>

      <TouchableOpacity
          onPress={() => toggleAnswerHandler()}
        >
        <Text style={{fontSize: primaryFontSize, color: '#0000FF'}}>{t("show-answer")}</Text>
      </TouchableOpacity>
      {showAnswer && 
        <Text style={{fontSize: primaryFontSize, color: '#0000FF'}}>
          <Text className="underline">Answer</Text>: {typeof answer == "string" ? answer : JSON.stringify(answer, null, 2)}
        </Text>
      }
      {showAnswer && toggleTranslate ? (
        <Text style={{fontSize: subFontSize}}>
          {typeof translate_answer == "string" ? translate_answer : JSON.stringify(translate_answer, null, 2)}
        </Text>
        ) : (<Text></Text>)
      }
    </View>
  )
}

function areItemsEqual(prevItem: ItemProps, nextItem: ItemProps) {
  return Object.keys(prevItem).every(key => {
      return prevItem[key as keyof ItemProps] === nextItem[key as keyof ItemProps]
  })
}

const MemoizedCartLineItem = memo<typeof QuestionsTestCardScreen>(QuestionsTestCardScreen, areItemsEqual)

export default MemoizedCartLineItem
