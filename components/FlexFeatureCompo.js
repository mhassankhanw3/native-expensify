import {View, Text} from 'react-native';
import React from 'react';
import {colors} from '../theme';
import Button from './Button';

export default function FlexFeature({title, btnTxt, navigate, tripParams}) {
  return (
    <View className="flex-row justify-between items-center">
      <Text className={`text-gray-600 text-xl shadow-sm font-semibold`}>
        {title}
      </Text>
      <Button btnTxt={btnTxt} navigate={navigate} tripParams={tripParams} />
    </View>
  );
}
