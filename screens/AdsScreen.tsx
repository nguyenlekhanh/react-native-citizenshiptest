import { View, Text } from 'react-native'
import React from 'react'
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import { bannerAds } from '../utils/variables';

//banner ads
const adUnitId = __DEV__ ? TestIds.BANNER : bannerAds;

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