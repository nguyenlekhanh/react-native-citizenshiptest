import { View, Text, TouchableOpacity, AppState } from 'react-native'
import React, { useEffect, useState, memo } from 'react'
import { useTranslation } from 'react-i18next';
import { FlatList } from 'react-native-gesture-handler';
import Sound from 'react-native-sound';
import { PlayIcon, StopIcon } from 'react-native-heroicons/solid';
import StorageService from '../utils/StorageService';
import { useNavigation } from '@react-navigation/native';
import { appStateUnfocus } from '../utils/libs';

type ItemProps = {
  count: number,
  question: any,
  primaryFontSize: number,
  subFontSize: number,
  toggleTranslate: boolean,
  translate_explanation: string
};

let audio:Sound;

const N400ScreenParseWordItem = (
  {
    count, question, primaryFontSize, subFontSize, toggleTranslate
  }: ItemProps) => {

  const navigation = useNavigation();
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const {t} = useTranslation();
  const [refTextColor, setRefTextColor] = useState<string>('#84CC15');

  const defaultTranslateTxt = 'translate_';
  const [ln, setLn] = useState('');

  return (
    <View className="mt-2">
      <Text style={{fontSize: primaryFontSize, color: '#198754'}}>
        <Text className="underline">{question.word}</Text>: {question.explanation}
      </Text>
    </View>
  )
}

function areItemsEqual(prevItem: ItemProps, nextItem: ItemProps) {
  return Object.keys(prevItem).every(key => {
      return prevItem[key as keyof ItemProps] === nextItem[key as keyof ItemProps]
  })
}

const MemoizedCartLineItem = memo<typeof N400ScreenParseWordItem>(N400ScreenParseWordItem, areItemsEqual)

export default MemoizedCartLineItem