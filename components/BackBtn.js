import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';

export default function BackBtn({navigate}) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        navigate ? navigation.navigate(navigate) : navigation.goBack()
      }
      className="bg-white rounded-full flex items-center justify-center h-10 w-10 shadow-2xl shadow-gray-300">
      <Icon name="chevron-left" size={28} color="#737373" />
    </TouchableOpacity>
  );
}
