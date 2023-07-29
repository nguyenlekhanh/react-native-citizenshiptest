import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'

type ItemProps = {
  msg: string,
  closeErrorMsg: () => void
};

const ErrorScreen = ({
  msg,
  closeErrorMsg
}: ItemProps) => {

  useEffect(() => {
    setTimeout(() => {
      closeErrorMsg();
    }, 5000)
  }, []);

  return (
    <View className="bg-[#F8D7DA] mt-2 w-auto flex-row">
      <View className="w-[95%]">
        <Text className="text-color-[#9D3F24] text-xl">{msg}</Text>
      </View>
      <TouchableOpacity
        onPress={() => closeErrorMsg()}
      >
        <View>
          <Text className="text-3xl">&times;</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default ErrorScreen