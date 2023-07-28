import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Toast, {ErrorToast} from 'react-native-toast-message';
import { useTranslation } from 'react-i18next';
import { updateAnswer } from '../utils/updateData';
import { useUserStore } from '../app/store.zustand.user';

type ChoiceProps = {
  "answer": string,
  "isCorrect": boolean
};

type ItemProps = {
  count: number,
  question: string,
  choice: ChoiceProps,
  subFontSize: number,
  showAnswerHandler: () => void,
  increaseUserChoiceHandler: () => void,
  userChoiceParam:number,
  setChoseTrueAnswerHandler: () => void,
  choseTrueAnswer: boolean,
  updateRightWrongAnswer: (questionAnswered: number, answer: boolean) => {}
};

const QuestionOptionsCardScreen = (
  {
    count,
    question,
    choice,
    subFontSize,
    showAnswerHandler,
    increaseUserChoiceHandler,
    userChoiceParam,
    setChoseTrueAnswerHandler,
    choseTrueAnswer,
    updateRightWrongAnswer
  }: ItemProps) => {

  const userInfo  = useUserStore((state) => state.user);
  const {t} = useTranslation();
  const [refTextColor, setRefTextColor] = useState<string>('#84CC15');

  useEffect(() => {
    if(choseTrueAnswer) {
      if(choice.isCorrect) {
        setRefTextColor('green');
      } else {
        setRefTextColor('red');
      }
    }
  }, [choseTrueAnswer]);

  const checkAnswerHandler = (item: ChoiceProps) => {  
    if(!choseTrueAnswer) {
      if(item.isCorrect) {
        setRefTextColor('green');
        showAnswerHandler();
        Toast.hide();

        setChoseTrueAnswerHandler();

        //first choose answer and right
        updateRightWrongAnswer(count, true);
      } else {
        setRefTextColor('red');
        Toast.show({
          type: 'error',
          text1: t("try-again"),
        });
        updateRightWrongAnswer(count, false);
      }

      //send the answer to server
      if(userChoiceParam === 1 && userInfo && userInfo?.token) {
        const data = {
          token: userInfo.token,
          question: question,
          isCorrect: item.isCorrect,
          email: userInfo.user.email
          //TODO
          //only update one time send one parameter to block when updated
          //do it for wrong answer and only one time
          //save the number of times of doing the test, that means when
          //   openning a test save a test number and save a question that user has answered
          //
        }
        
        //send to server
        console.log('send request to server');
        updateAnswer(data);
        //call to server update score
      }

      //count the user choice times per one question
      increaseUserChoiceHandler();

    }
  }
  
  return (
    <TouchableOpacity
      onPress={() => checkAnswerHandler(choice)}
      className="mb-2"
      style={{backgroundColor:refTextColor}}
    >
      <View className="rounded-md px-2 py-1">
        <Text style={{fontSize: subFontSize, color: '#fff'}}>{choice.answer}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default QuestionOptionsCardScreen