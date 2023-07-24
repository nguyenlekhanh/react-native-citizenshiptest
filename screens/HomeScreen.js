import { View, Text, TextInput, SafeAreaView, Button } from 'react-native'
import React from 'react'

import { 
    UserIcon, 
    ChevronDownIcon, 
    AdjustmentsHorizontalIcon,
    MagnifyingGlassIcon,
    MagnifyingGlassCircleIcon
} from "react-native-heroicons/outline";

import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from '../features/counter/counterSlice'

const HomeScreen = () => {
  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <SafeAreaView>
        <View className="flex-row items-center space-x-2 pb-2 mx-4">
            <View className="flex-1 flex-row space-x-2 bg-gray-200 p-3">
                <MagnifyingGlassCircleIcon color="gray" size={20}/>
                <TextInput placeholder="Restaurants & cuisines"
                keyboardType="default"
                />
            </View>

            <AdjustmentsHorizontalIcon color="#00CCBB" />
        </View>
        <View>
            <Button onPress={() => dispatch(increment())} title="Increment">Increment</Button>
            <Text>{count}</Text>
            <Button onPress={() => dispatch(decrement())} title="Decrement">Decrement</Button>
        </View>
    </SafeAreaView>
  )
}

export default HomeScreen

