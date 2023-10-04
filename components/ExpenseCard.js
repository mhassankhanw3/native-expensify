import {View, Text, StyleSheet} from 'react-native';
import React, {useMemo} from 'react';
import {colors, multipleColors, getIcons} from '../theme';

const styles = StyleSheet.create({
  notFoundText: {
    color: 'red',
  },
});

export const NotFound = () => {
  return (
    <View>
      <Text style={styles.notFoundText}>no Item</Text>
    </View>
  );
};

export default function ExpenseCard({item, index, navigate}) {
  const backgroundColor = multipleColors[index % multipleColors.length];

  const category = item?.category;
  const emojis = useMemo(() => getIcons[category] || [], [category]);
  const randomEmojiIndex = useMemo(
    () => Math.floor(Math.random() * emojis.length),
    [emojis],
  );
  const emoji = emojis[randomEmojiIndex] || '😃';
  return (
    <View
      style={[styles.card, {backgroundColor}]}
      className="flex-row items-center justify-between mx-0 p-3 px-5 mb-2 rounded-2xl shadow-2xl shadow-gray-200">
      <View>
        <Text className={`${colors.heading} font-bold`}>
          {item?.title ? item?.title : <NotFound />}
        </Text>
        <View className="flex-row items-center gap-1">
          <Text className={`${colors.heading} text-xs`}>
            {item?.category ? item?.category : <NotFound />}
          </Text>
          <Text>{emoji}</Text>
        </View>
      </View>
      <View>
        <Text>${item?.amount ? item?.amount : <NotFound />}</Text>
      </View>
    </View>
  );
}
