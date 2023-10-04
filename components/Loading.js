import {View, Text, ActivityIndicator} from 'react-native';
import React from 'react';
import {colors} from '../theme';
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';

export default function Loading({IsUIActivityIndicator}) {
  return (
    <View className="flex-row justify-center py-8">
      {IsUIActivityIndicator ? (
        <UIActivityIndicator size={40} color="#4ade80" />
      ) : (
        <DotIndicator size={10} color="#4ade80" />
      )}
    </View>
  );
}
