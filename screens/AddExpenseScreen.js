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
import {useNavigation} from '@react-navigation/native';
import {categories} from '../constants';
import {multipleColors, categoryBG} from '../theme';
import {useMainContext} from '../context/Main';
import Loading from '../components/Loading';
import Snackbar from 'react-native-snackbar';

export default function AddExpenseScreen() {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const {loading} = useMainContext();

  const navigation = useNavigation();
  const {func, user} = useMainContext();

  const handleAddExpense = async () => {
    if (title && amount && category) {
      await func.addUserTripsExpenseToFirestore(title, amount, category, user);
      navigation?.goBack();
      setTitle('');
      setAmount('');
      setCategory('');
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

  const keyboardVerticalOffset = Platform.OS === 'ios' ? 10 : 10;

  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * multipleColors.length);
    return multipleColors[randomIndex];
  };

  return (
    <ScreenWrapper>
      <View className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur w-full">
        <View className="bg-gray-50 shadow-2xl shadow-gray-900 relative h-full w-full mx-auto rounded-2xl p-4">
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{flexGrow: 1}}>
            <View style={{flexGrow: 1}}>
              <FlexBackCompo title="Add Expense" />
              <View className="flex-row justify-center items-center rounded-xl">
                <Image
                  source={require('../assets/images/expenseBanner.png')}
                  className="w-56 h-56"
                />
              </View>
              <KeyboardAvoidingView
              // behavior="position"
              // keyboardVerticalOffset={keyboardVerticalOffset}
              >
                <View className="space-y-1">
                  <Text className="text-lg font-bold text-gray-600">
                    For What?
                  </Text>
                  <TextInput
                    placeholder="Expense"
                    placeholderTextColor={'#a1a1aa'}
                    value={title}
                    onChangeText={value => setTitle(value)}
                    className="bg-white py-3 px-4 rounded-full mb-2 font-normal text-[15px] text-gray-600"
                  />
                  <Text className="text-lg font-bold text-gray-600">
                    How Much?
                  </Text>
                  <TextInput
                    placeholder="Amount"
                    placeholderTextColor={'#a1a1aa'}
                    value={amount}
                    onChangeText={value => setAmount(value)}
                    keyboardType="numeric"
                    className="bg-white py-3 px-4 rounded-full mb-2 text-[15px] text-gray-600"
                  />
                </View>
                <View className="space-x-1 ">
                  <Text className="text-lg font-bold text-gray-600">
                    Category
                  </Text>
                  <View className="flex-row flex-wrap items-center">
                    {categories.map(cat => {
                      // const bgColor =
                      //   cat.value === category
                      //     ? {backgroundColor: getRandomColor()}
                      //     : {backgroundColor: 'white'};
                      // if (cat.value == category) {
                      //   bgColor = 'bg-green-200 text-green-600';
                      // }
                      return (
                        <TouchableOpacity
                          onPress={() => {
                            setCategory(cat.value);
                            // console.log(`Selected Category: ${cat.value}`);
                            // console.log(
                            //   `Selected Color: ${
                            //     category === cat.value
                            //       ? getRandomColor()
                            //       : getRandomColor()
                            //   }`,
                            // );
                          }}
                          key={cat?.value}
                          className={`px-4 py-2 rounded-xl mr-2 mt-2 shadow-md shadow-gray-400 `}
                          style={{
                            backgroundColor:
                              category === cat.value
                                ? categoryBG[cat.value]
                                : 'white',
                          }}>
                          <Text>{cat?.title}</Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>
              </KeyboardAvoidingView>
            </View>
            <View className="mt-6">
              {loading ? (
                <Loading />
              ) : (
                <TouchableOpacity
                  onPress={handleAddExpense}
                  className="bg-green-600 shadow-2xl shadow-gray-200 flex items-center justify-center rounded-full p-4">
                  <Text className="text-white text-center text-[16px] font-semibold ">
                    Add Expense
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
