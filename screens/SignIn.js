import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import ScreenWrapper from '../components/ScreenWrapper';
import FlexBackCompo from '../components/FlexBackCompo';
import {BlurView} from '@react-native-community/blur';
import {useNavigation} from '@react-navigation/native';
import Snackbar from 'react-native-snackbar';
import {useMainContext} from '../context/Main';
import Loading from '../components/Loading';

export default function SignIn() {
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 60 : 30;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();
  const {func, loading} = useMainContext();

  const handleSignIn = async () => {
    if (email && password) {
      await func.signIn(email, password, navigation);
      setEmail('');
      setPassword('');
      // navigation?.navigate('Home');
      // good to go
    } else {
      // show error message
      Snackbar.show({
        text: 'Email and password required!',
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

  const passReset = async () => {
    await func.resetPassword(email, navigation);
  };

  return (
    //fixed inset-0 z-50 flex items-center justify-center backdrop-blur max-w-[100%] w-[100%] px-4
    <ScreenWrapper>
      <View className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur w-full ">
        <View className="bg-gray-50 shadow-2xl shadow-gray-900 relative h-[100%] w-[100%] mx-auto rounded-3xl p-4">
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{flexGrow: 1}}>
            <View style={{flexGrow: 1}}>
              <FlexBackCompo title="SignIn" navigate={'Welcome'} />
              <View className="flex-row justify-center mb-2 mt-6">
                <Image
                  className="h-60 w-60"
                  source={require('../assets/images/login.png')}
                />
              </View>
              <KeyboardAvoidingView
              // behavior="position"
              // keyboardVerticalOffset={keyboardVerticalOffset}
              >
                <View className="space-y-1 mx-2">
                  <Text className="text-[18px] font-bold text-gray-600">
                    Email:
                  </Text>
                  <TextInput
                    Editable
                    autoCapitalize="none"
                    value={email}
                    placeholder="email"
                    placeholderTextColor={'#a1a1aa'}
                    onChangeText={value => setEmail(value)}
                    className="bg-white border-[0.3px] border-gray-200 py-3 px-4 rounded-full mb-2 text-[16px] text-gray-700"
                  />
                  <Text className="text-[18px] font-bold text-gray-600">
                    Password:
                  </Text>
                  <TextInput
                    secureTextEntry
                    Editable
                    autoCapitalize="none"
                    maxLength={8}
                    value={password}
                    placeholder="password"
                    placeholderTextColor={'#a1a1aa'}
                    onChangeText={value => setPassword(value)}
                    className="bg-white border-[0.3px] border-gray-200 py-3 px-4 rounded-full text-[16px] text-gray-700"
                  />
                  <TouchableOpacity
                    onPress={passReset}
                    className="flex-row justify-end">
                    <Text>Forgot Password?</Text>
                  </TouchableOpacity>
                </View>
              </KeyboardAvoidingView>
            </View>
            <View className="mt-6">
              {loading ? (
                <Loading />
              ) : (
                <TouchableOpacity
                  onPress={handleSignIn}
                  className="bg-green-600 shadow-xl shadow-gray-200 flex items-center justify-center rounded-full p-4">
                  <Text className="text-white text-center text-[16px] font-semibold ">
                    Sign In
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
