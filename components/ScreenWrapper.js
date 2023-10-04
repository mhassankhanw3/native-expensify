import {View, Text, StatusBar, Platform} from 'react-native';
import React from 'react';

export default function ScreenWrapper({children}) {
  const StatusBarHeight = Platform.OS === 'ios' ? 30 : 10;
  return (
    <View
      style={{
        paddingTop: StatusBarHeight,
        paddingLeft: 14,
        paddingRight: 14,
        paddingBottom: 10,
        backgroundColor: 'transparent',
      }}>
      {children}
    </View>
  );
}
