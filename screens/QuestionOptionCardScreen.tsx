import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Toast, {ErrorToast} from 'react-native-toast-message';
import { useTranslation } from 'react-i18next';

type ItemProps = {
  choice: {
    "answer": string,
    "isCorrect": boolean
  },
  subFontSize: number,
  showAnswerHandler: () => {}
};

const QuestionOptionsCardScreen = (
  {
    choice,
    subFontSize,
    showAnswerHandler
  }: ItemProps) => {

  const {t} = useTranslation();
  const [refTextColor, setRefTextColor] = useState<string>('#84CC15')
  const checkAnswerHandler = (item:{
    "answer": string,
    "isCorrect": boolean
  }) => {
    
    if(item.isCorrect) {
      setRefTextColor('green');
      showAnswerHandler();
      Toast.hide();
    } else {
      setRefTextColor('red');
      Toast.show({
        type: 'error',
        text1: t("try-again"),
      });
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