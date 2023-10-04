import {View, Text, Image} from 'react-native';
import React, {useEffect} from 'react';

export default function EmptyList({emptyTrips, EmptyExpense, isTripExpenses}) {
  return (
    <View className="flex items-center justify-center mt-6">
      <Image
        className="w-60 h-60"
        source={
          !isTripExpenses
            ? require('../assets/images/emptyExpenses.png')
            : require('../assets/images/empty.png')
        }
      />
      <Text className="font-semibold text-center text-lg text-gray-400">
        {!isTripExpenses ? EmptyExpense : emptyTrips || 'data not found'}
      </Text>
    </View>
  );
}
