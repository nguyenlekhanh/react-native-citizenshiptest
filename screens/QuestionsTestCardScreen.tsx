import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import Sound from 'react-native-sound';
import { PlayIcon, StopIcon } from 'react-native-heroicons/solid';
import QuestionOptionsCardScreen from './QuestionOptionCardScreen';
import { useTranslation } from 'react-i18next';

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
  updateRightWrongAnswer: (questionAnswered: number, answer: boolean) => void
};

let audio:Sound;

const QuestionsTestCardScreen = (
  {
    count, question, translate_question, answer, translate_answer, voice,
    toggleTranslate, primaryFontSize, subFontSize, optionsChoice,
    updateRightWrongAnswer
  }: ItemProps) => {

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
    <View className="bg-[#fff] mb-8 p-1 border border-green-500	rounded-lg border-2	">
      <View className="mb-3">
        <Text style={{fontSize: primaryFontSize, color: '#0000FF'}} className="">
          <Text className="underline">Question {count+1}</Text>: {question}
        </Text>
        <Text>
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

export default QuestionsTestCardScreen