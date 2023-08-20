import { View, Text } from 'react-native'
import React from 'react'
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

//banner ads
const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-7745252561449149/7860457612';

const AdsScreen: React.FC = () => {
  return (
    <BannerAd
      unitId={adUnitId}
      size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}
    />
  )
}

export default AdsScreen