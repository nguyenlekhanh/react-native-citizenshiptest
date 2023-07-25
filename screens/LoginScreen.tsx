import { View, Text, Button } from 'react-native'
import React from 'react'
import AdsScreen from './AdsScreen'

const LoginScreen: React.FC = () => {
  return (
    <View className="flex-columns items-center w-full h-max">
      <View className="w-full h-[90%] items-center justify-center">
        <View className="w-2/4">
          <View className="mb-3">
            <Button 
              title="Sign in with Google"
              onPress={() => {}} 
            />
          </View>
          <Button 
            title="Sign in with Guest"
            onPress={() => {}} 
          />
        </View>
      </View>

      <AdsScreen />
    </View>
  )
}

export default LoginScreen