import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Button from '../components/Button';
import FlexFeature from '../components/FlexFeatureCompo';
import FlatListData from '../components/FlatListData';
import ScreenWrapper from '../components/ScreenWrapper';
import FlexBackCompo from '../components/FlexBackCompo';
import {useMainContext} from '../context/Main';
import Loading from '../components/Loading';

export default function TripExpensesScreen(props) {
  const [tripParams, setTripParams] = useState('');
  const [expense, setExpense] = useState([]);
  const isFocused = useIsFocused();
  const {user, func, loading, setLoading} = useMainContext();
  useEffect(() => {
    setTripParams(props?.route?.params);
  }, [tripParams]);

  useEffect(() => {
    if (user && isFocused) {
      setLoading(true);
      func
        .getTripsExpenseFromFirestore(user)
        .then(expense => {
          setExpense(expense);
          console.log(expense, 'expense expense expense expense expense');
          setLoading(false);
        })
        .catch(error => {
          // Handle any errors here
          setLoading(false);
          console.error(error);
        });
      // setLoading(false);
    }
  }, [user, isFocused]);

  const items = [
    {
      id: 1,
      title: 'Lunch at a local restaurant',
      amount: 20.0,
      category: 'food',
    },
    {
      id: 2,
      title: 'Dinner with friends',
      amount: 35.0,
      category: 'shopping',
    },
    {
      id: 3,
      title: 'Grocery shopping',
      amount: 50.0,
      category: 'entertainment',
    },
    {
      id: 4,
      title: 'Long drive',
      amount: 50.0,
      category: 'commute',
    },
    {
      id: 5,
      title: 'Grocery shopping',
      amount: 50.0,
      category: 'grocery',
    },
    {
      id: 8,
      title: 'Drinks shopping',
      amount: 50.0,
      category: 'drinks',
    },
    // Add more food-related expenses as needed
  ];
  return (
    <ScreenWrapper className="flex-1">
      <FlexBackCompo tripParams={tripParams} />
      <View className="flex-row justify-center items-center rounded-xl">
        <Image
          source={require('../assets/images/7.png')}
          className="w-64 h-64"
        />
      </View>
      <View className="space-y-3">
        <View>
          <FlexFeature
            title="Expenses"
            btnTxt="Add Expenses"
            navigate={'AddExpense'}
            tripParams={tripParams && tripParams}
          />
        </View>
        <View style={{height: 355}}>
          {loading ? (
            <Loading IsUIActivityIndicator={true} />
          ) : (
            <FlatListData
              data={expense}
              navigate={'TripExpenses'}
              message={"You haven't recorded any Expenses yet!"}
              listTitle={'TripExpense'}
              isTripExpenseScreen={true}
            />
          )}
        </View>
      </View>
    </ScreenWrapper>
  );
}

{
  /* <FlatList
          data={items}
          ListEmptyComponent={
            <EmptyList message={"You haven't recorded any trips yet!"} />
          }
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: 'space-between',
          }}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate('TripExpenses')}
                className="bg-white p-[10px] rounded-2xl shadow-sm mb-1">
                <View className="">
                  <Image
                    source={randomImage()}
                    className="w-36 h-36 mb-2 mx-auto"
                  />
                  <Text
                    className={` text-gray-700 text-sm shadow-sm font-bold`}>
                    {item.Place}
                  </Text>
                  <Text
                    className={` text-gray-500 text-xs shadow-sm font-normal`}>
                    {item.Country}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        /> */
}
