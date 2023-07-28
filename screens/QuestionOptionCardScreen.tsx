import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Toast, {ErrorToast} from 'react-native-toast-message';
import { useTranslation } from 'react-i18next';

type ChoiceProps = {
  "answer": string,
  "isCorrect": boolean
};

type ItemProps = {
  choice: ChoiceProps,
  subFontSize: number,
  showAnswerHandler: () => void,
  increaseUserChoiceHandler: () => void,
  userChoiceParam:number,
  setChoseTrueAnswerHandler: () => void,
  choseTrueAnswer: boolean
};

const QuestionOptionsCardScreen = (
  {
    choice,
    subFontSize,
    showAnswerHandler,
    increaseUserChoiceHandler,
    userChoiceParam,
    setChoseTrueAnswerHandler,
    choseTrueAnswer
  }: ItemProps) => {

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
        if(userChoiceParam === 1) {
          //call to server update score
        }
      } else {
        setRefTextColor('red');
        Toast.show({
          type: 'error',
          text1: t("try-again"),
        });
      }
      
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