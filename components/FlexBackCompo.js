import {View, Text} from 'react-native';
import React from 'react';
import BackBtn from './BackBtn';

export default function FlexBackCompo({
  title,
  desc,
  tripParams,
  isAddTrip,
  navigate,
}) {
  const country = tripParams?.country || 'Country';
  const place = tripParams?.place || 'Place';
  return (
    <View key={tripParams?.id} className="relative mt-1 p-1">
      <View className="absolute top-0 left-0 z-10 ">
        <BackBtn navigate={navigate} />
      </View>
      {title ? (
        <Text className="text-gray-700 text-[24px] font-bold text-center">
          {title}
        </Text>
      ) : (
        <View className="flex flex-col items-center justify-center">
          <Text className="text-gray-700 text-[24px] font-bold">{country}</Text>
          <Text className="text-xs">{place}</Text>
        </View>
      )}
      {/* <View className="flex flex-col items-center justify-center">
        <Text className="text-gray-700 text-[24px] font-bold">{country}</Text>
        <Text className="text-xs">{place}</Text>
      </View> */}
    </View>
  );
}
