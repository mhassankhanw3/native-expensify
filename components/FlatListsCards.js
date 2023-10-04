import {View, Text, TouchableOpacity, FlatList, Image} from 'react-native';
import React from 'react';
import randomImage from '../assets/images/randomimage';
import {useNavigation} from '@react-navigation/native';

export default function FlatListsCards({navigate, item}) {
  // console.log(item, 'item');
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate(navigate ? navigate : 'Home', {...item})
      }
      className="bg-white p-[17px] rounded-2xl shadow-sm mb-2">
      <View className="">
        <Image
          source={
            randomImage() ? randomImage() : require('../assets/images/12.png')
          }
          className="w-32 h-32 mb-2 mx-auto"
          alt="loading"
        />
        <Text className={` text-gray-700 text-sm shadow-sm font-bold`}>
          {item?.place ? item?.place : ''}
        </Text>
        <Text className={` text-gray-500 text-xs shadow-sm font-normal`}>
          {item?.country ? item?.country : ''}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
