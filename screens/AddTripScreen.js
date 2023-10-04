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
import BackBtn from '../components/BackBtn';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../theme';
import FlexBackCompo from '../components/FlexBackCompo';
import Loading from '../components/Loading';
import {useMainContext} from '../context/Main';

export default function AddTripScreen() {
  const [place, setPlace] = useState('');
  const [country, setCountry] = useState('');
  const {user, loading, func} = useMainContext();

  const navigation = useNavigation();

  const handleAddTrip = async () => {
    if (place && country) {
      await func.addUserTripsToFirestore(place, country, user);
      // good to go
      navigation?.navigate('Home');
      setPlace('');
      setCountry('');
    } else {
      // show error message
      Snackbar.show({
        text: 'Place and Country are required!',
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

  const keyboardVerticalOffset = Platform.OS === 'ios' ? 60 : 30;

  return (
    <ScreenWrapper>
      <View className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur max-w-[100%] w-[100%] ">
        <View className="bg-gray-50 shadow-2xl shadow-gray-900 relative h-[100%] w-[100%] mx-auto rounded-2xl p-4">
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{flexGrow: 1}}>
            <View style={{flexGrow: 1}}>
              <FlexBackCompo title="Add Trip" isAddTrip={true} />
              {/* <View className="relative mt-1 p-1">
              <View className="absolute top-0 left-0 z-10 ">
                <BackBtn />
              </View>
              <Text className="text-gray-700 text-[20px] text-center font-bold">
                Add Trip
              </Text>
            </View> */}
              <View className="flex-row justify-center mb-2 mt-6">
                <Image
                  className="h-60 w-60"
                  source={require('../assets/images/4.png')}
                />
              </View>
              <KeyboardAvoidingView
              // behavior="position"
              // keyboardVerticalOffset={keyboardVerticalOffset}
              >
                <View className="space-y-1 mx-2">
                  <Text className="text-lg font-bold text-gray-600">
                    Where on Earth?
                  </Text>
                  <TextInput
                    value={place}
                    placeholder="Dubai"
                    placeholderTextColor={'#a1a1aa'}
                    onChangeText={value => setPlace(value)}
                    className="bg-white py-3 px-4 rounded-full mb-2 font-normal text-[16px] text-gray-700"
                  />
                  <Text className="text-lg font-bold text-gray-600">
                    Which Country?
                  </Text>
                  <TextInput
                    value={country}
                    placeholder="U.A.E"
                    placeholderTextColor={'#a1a1aa'}
                    onChangeText={value => setCountry(value)}
                    className="bg-white py-3 px-4 rounded-full mb-2 text-[16px] text-gray-700"
                  />
                </View>
              </KeyboardAvoidingView>
            </View>
            <View className="mt-6">
              {loading ? (
                <Loading />
              ) : (
                <TouchableOpacity
                  onPress={handleAddTrip}
                  className="bg-green-600 shadow flex items-center justify-center rounded-full p-4">
                  <Text className="text-white text-center text-[16px] font-semibold ">
                    Add Trip
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
