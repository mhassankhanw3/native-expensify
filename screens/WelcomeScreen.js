import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import ScreenWrapper from '../components/ScreenWrapper';
import {colors} from '../theme';
import {useNavigation} from '@react-navigation/native';

export default function WelcomeScreen() {
  const navigation = useNavigation();
  return (
    <ScreenWrapper>
      <View className="h-full flex justify-around">
        <View className="w-full mx-auto flex-row items-center justify-center mt-10">
          <Image
            source={require('../assets/images/welcome.gif')}
            className="w-96 h-96"
          />
        </View>
        <View>
          <Text className="text-4xl text-center font-bold text-gray-800">
            Expensify
          </Text>
          <View className="mt-10 space-y-4">
            <TouchableOpacity
              onPress={() => navigation.navigate('SignIn')}
              className="bg-green-600 shadow-xl shadow-gray-800 flex items-center justify-center rounded-full py-4">
              <Text className="text-white text-center text-[16px]">
                Sign In
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('SignUp')}
              className="bg-green-600 shadow-xl shadow-gray-800 flex items-center justify-center rounded-full py-4">
              <Text className="text-white text-center text-[16px]">
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
}
