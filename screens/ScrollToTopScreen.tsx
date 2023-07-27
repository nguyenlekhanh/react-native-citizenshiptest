import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import {
  ChevronUpIcon
} from 'react-native-heroicons/outline';

const ScrollToTopScreen = React.forwardRef((props, ref) => {
  const scrollToTopHandler = () => {
    ref.current.scrollToOffset({ offset: 0, animated: true });
  }

  return (
    <TouchableOpacity 
      className="absolute right-0 bottom-2 mr-2"
      onPress={() => scrollToTopHandler()}
    >
      <View className="w-10 h-10 border border-lime-400 rounded-full">
        <ChevronUpIcon className="text-lime-400" />
      </View>
    </TouchableOpacity>
  )
})


export default ScrollToTopScreen