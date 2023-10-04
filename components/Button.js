import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';

export default function Button({navigate, btnTxt, logout, tripParams}) {
  const navigation = useNavigation();
  useEffect(() => {
    console.log(tripParams, 'tripParams tripParams');
  }, [tripParams]);

  // onPress={() => navigation.navigate('AddTrip')}

  return (
    <TouchableOpacity
      onPress={
        logout
          ? logout
          : () =>
              navigation.navigate(navigate ? navigate : 'Home', {tripParams})
      }
      className="bg-white px-4 py-2 rounded-full shadow-2xl ">
      <Text className={`text-gray-800 text-[16px] `}>{btnTxt}</Text>
    </TouchableOpacity>
  );
}
