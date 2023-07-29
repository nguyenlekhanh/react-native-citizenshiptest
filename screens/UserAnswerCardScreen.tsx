import { View, Text } from 'react-native'
import React from 'react'
import { format, compareAsc } from 'date-fns'
import { XMarkIcon, CheckIcon } from "react-native-heroicons/solid";


type ItemProps = {
  "_id": string,
  "userId": string,
  "question": string,
  "isCorrect": boolean,
  "createdAt": string,
}

type ItemType = {
  item: ItemProps,
  index: number
}

const UserAnswerCardScreen= ({
  item,
  index
}: ItemType) => {
  const fontSize = "text-xl";
  const colorOdd = index % 2 ? 'bg-slate-300' : ''
  const rowStyle = "px-2 py-2 flex-row w-full " + colorOdd;
  return (
    <View className="flex-row w-full mt-2">
      <View className={rowStyle}>
        <View className="basis-8/12 justify-center	">
          <Text className={fontSize}>• {item.question}</Text>
        </View>
        <View className="">
          <Text className={fontSize}>
            {item.isCorrect ? <CheckIcon size={25} color="green"/> : <XMarkIcon size={25} color="red"/>}</Text>
          <Text></Text>
        </View>
        <View className="basis-auto">
          <Text className={fontSize}>{format(new Date(item.createdAt), "MM/dd/yyyy")}</Text>
        </View>
      </View>
    </View>
  )
}

export default UserAnswerCardScreen