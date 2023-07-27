import { View, Text } from 'react-native'
import React from 'react'
import { FlatList, ScrollView } from 'react-native-gesture-handler';

type ItemProps = {
  count: number,
  question: string,
  question_vn: string,
  answer: string,
  answer_vn: string
};

const QuestionsCardScreen = ({count, question, question_vn, answer, answer_vn}: ItemProps) => {
  return (
    <View className="bg-[#fff] mb-8 p-1">
      <Text className="text-[20px] text-blue-700">
        <Text className="underline">Question {count+1}</Text>: {question}
      </Text>
      <Text className="text-[18px] mb-2">
        ({question_vn})
      </Text>
      <Text className="text-[20px] text-blue-700">
        <Text className="underline">Answer</Text>: {typeof answer == "string" ? answer : JSON.stringify(answer, null, 2)}
      </Text>
      <Text className="text-[18px]">
      {typeof answer_vn == "string" ? answer_vn : JSON.stringify(answer_vn, null, 2)}
      </Text>
    </View>
  )
}

export default QuestionsCardScreen