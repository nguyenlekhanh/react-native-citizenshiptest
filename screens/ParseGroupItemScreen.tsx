import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import ParseItemScreen from './ParseItemScreen';
import { FlatList } from 'react-native-gesture-handler';

type ItemProps = {
  group: any,
  toggleTranslate: boolean,
  primaryFontSize: number,
  subFontSize: number
};

const ParseGroupItemScreen = (
  {
    group, toggleTranslate, primaryFontSize, subFontSize
  }: ItemProps) => {

  const {t} = useTranslation();
  const [refTextColor, setRefTextColor] = useState<string>('#84CC15');

  
  return (
    <View className="bg-[#fff] mb-8 p-1 border border-green-500	rounded-lg border-2	">
      <View className="mb-3">
        <Text style={{fontSize: primaryFontSize, color: '#0000FF'}} className="">
          <Text className="underline">Group</Text>: {group.group}
        </Text>

        {group && group?.items && group?.items.length > 1 ? <FlatList
            data={group.items}
            renderItem={({item, index}) => <ParseItemScreen 
                                              count={index}
                                              question={item}
                                              primaryFontSize={primaryFontSize}
                                              subFontSize={subFontSize}
                                            />
                            }
            keyExtractor={(item, index) => index.toString()}
          />
        : (<Text>No Data</Text>)}
        {/* </View> */}
      </View>
    </View>
  )
}

export default ParseGroupItemScreen