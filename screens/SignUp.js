import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import ScreenWrapper from '../components/ScreenWrapper';
import FlexBackCompo from '../components/FlexBackCompo';
import {useNavigation} from '@react-navigation/native';
import Snackbar from 'react-native-snackbar';
import {useMainContext} from '../context/Main';
import Loading from '../components/Loading';

export default function SignUp() {
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 60 : 30;
  const [displayName, setdisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();
  const {func, loading} = useMainContext();

  const handleSignUp = async () => {
    if (displayName && email && password) {
      await func.newUser(email, password, displayName, navigation);
      setdisplayName('');
      setEmail('');
      setPassword('');
      // navigation?.navigate('Home');
      // good to go
    } else {
      // show error message
      Snackbar.show({
        text: 'All fields are required required!',
        textColor: '#b91c1c',
        backgroundColor: '#fecaca',
        numberOfLines: 2,
        action: {
          text: 'ok',
          textColor: '#b91c1c',
        },
      });
    }
  };

  return (
    <ScreenWrapper>
      <View className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur w-full ">
        <View className="bg-gray-50 shadow-2xl shadow-gray-900 relative h-full w-full mx-auto rounded-3xl p-4">
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{flexGrow: 1}}>
            <View style={{flexGrow: 1}}>
              <FlexBackCompo title="SignUp" />
              <View className="flex-row justify-center mb-2 mt-6">
                <Image
                  className="h-60 w-60"
                  source={require('../assets/images/signup.png')}
                />
              </View>
              <KeyboardAvoidingView
              // behavior="position"
              // keyboardVerticalOffset={keyboardVerticalOffset}
              >
                <View className="space-y-1 mx-2">
                  <Text className="text-[18px] font-bold text-gray-600">
                    User Name:
                  </Text>
                  <TextInput
                    autoCapitalize="none"
                    value={displayName}
                    placeholder="username"
                    placeholderTextColor={'#a1a1aa'}
                    onChangeText={value => setdisplayName(value)}
                    className="bg-white border-[0.3px] border-gray-200 py-3 px-4 rounded-full mb-2 font-normal text-[16px] text-gray-700"
                  />
                  <Text className="text-[18px] font-bold text-gray-600">
                    Email:
                  </Text>
                  <TextInput
                    autoCapitalize="none"
                    value={email}
                    placeholder="email"
                    placeholderTextColor={'#a1a1aa'}
                    onChangeText={value => setEmail(value)}
                    className="bg-white border-[0.3px] border-gray-200 py-3 px-4 rounded-full mb-2 font-normal text-[16px] text-gray-700"
                  />
                  <Text className="text-[18px] font-bold text-gray-600">
                    Password:
                  </Text>
                  <TextInput
                    Editable
                    secureTextEntry
                    maxLength={8}
                    autoCapitalize="none"
                    value={password}
                    placeholder="password"
                    placeholderTextColor={'#a1a1aa'}
                    onChangeText={value => setPassword(value)}
                    className="bg-white border-[0.3px] border-gray-200 py-3 px-4 rounded-full mb-2 text-[16px] text-gray-700"
                  />
                </View>
              </KeyboardAvoidingView>
            </View>
            <View className="mt-6">
              {loading ? (
                <Loading />
              ) : (
                <TouchableOpacity
                  onPress={handleSignUp}
                  className="bg-green-600 shadow-xl shadow-gray-200 flex items-center justify-center rounded-full p-4">
                  <Text className="text-white text-center text-[16px] font-semibold ">
                    Sign Up
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </ScrollView>
        </View>
      </View>
    </ScreenWrapper>
  );
}
