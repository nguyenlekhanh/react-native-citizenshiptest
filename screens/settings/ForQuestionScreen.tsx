import { View, Text } from 'react-native'
import React, { useState } from 'react'
import {
  Cog8ToothIcon
} from 'react-native-heroicons/solid';
import { Translation } from 'react-i18next';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  MinusIcon, PlusIcon,
  MagnifyingGlassPlusIcon,
  MagnifyingGlassMinusIcon,
  LanguageIcon
} from 'react-native-heroicons/outline';


type ItemProps = {
  changeFontsizeHandler: (action:number) => void,
  toggleTranslateHandler: () => void
};


const ForQuestionScreen = (
  {
    changeFontsizeHandler,
    toggleTranslateHandler
  }: ItemProps

) => {
  const [showHideSetting, setShowHideSetting] = useState(false);

  const showHideSettingHandler = () => {
    setShowHideSetting(!showHideSetting)
  }
  
  return (
    <View
      className="absolute left-0 bottom-1 mr-2 flex-row border rounded-lg bg-white
      border-gray-400	 border-2		
      "
      
    >
      {/* <Icon name="gear" size={25} color="#D07F8B" /> */}
      <TouchableOpacity
        onPress={() => showHideSettingHandler()}
      >
        <Cog8ToothIcon size={45} color="blue" />
      </TouchableOpacity>
      <View
        className="flex-row mt-1"
        style={{
          display: showHideSetting ? '' : 'none'
        }}
      >
        <TouchableOpacity
          onPress={() => changeFontsizeHandler(1)}
          className="ml-2"
        >
          <MagnifyingGlassPlusIcon size={35} color="green" />
        </TouchableOpacity>
        <Text>&nbsp;&nbsp;&nbsp;</Text>
        <TouchableOpacity
          onPress={() => changeFontsizeHandler(2)}
        >
          <MagnifyingGlassMinusIcon size={35} color="green" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => toggleTranslateHandler()}
          className="ml-2"
        >
          <LanguageIcon size={35} color="green" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ForQuestionScreen