import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { SafeAreaView } from 'react-native-safe-area-context';
import AdsScreen from './AdsScreen';
import AdsFullScreen from './AdsFullScreen';


type RootStackParamList = {};

type Props = NativeStackScreenProps<RootStackParamList>;


const ShowFullAdsScreen: React.FC = () => {
  
  return (
    <SafeAreaView className="flex-columns items-center w-full h-max">
      <View className="w-full h-[89%] mt-2">
        <Text>sdfsdf</Text>
      </View>

      <AdsFullScreen showFullAds={true}/>
    </SafeAreaView>
  )
}

export default ShowFullAdsScreen