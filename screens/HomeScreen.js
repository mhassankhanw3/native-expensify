import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
} from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import {colors} from '../theme';
import randomImage from '../assets/images/randomimage';
import EmptyList from '../components/EmptyList';
import AddTripScreen from './AddTripScreen';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Button from '../components/Button';
import FlexFeature from '../components/FlexFeatureCompo';
import FlatListData from '../components/FlatListData';
import {useMainContext} from '../context/Main';
import Loading from '../components/Loading';

export default function HomeScreen() {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [trips, setTrips] = useState([]);
  const {user, func, loading, setLoading} = useMainContext();
  // const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (user && isFocused) {
      setLoading(true);
      func
        .getTripsFromFirestore(user)
        .then(trips => {
          setTrips(trips);
          setLoading(false);
        })
        .catch(error => {
          setLoading(false);
          console.error(error);
        });
    }
  }, [user, isFocused]);

  const logout = async navigation => {
    await func.Logout(navigation);
  };
  return (
    <ScreenWrapper style={{flex: 1}}>
      <View className="flex-row justify-between items-center">
        <Text className={`text-gray-800 text-3xl shadow-sm font-bold`}>
          Expensify
        </Text>
        <Button btnTxt={'Logout'} logout={logout} />
      </View>
      <View className="mt-4 flex-row justify-center items-center bg-blue-200 rounded-xl">
        <Image
          source={require('../assets/images/banner.png')}
          className="w-56 h-52"
        />
      </View>
      <View className="space-y-3">
        <View className="mt-2">
          <FlexFeature
            title="Recent Trips"
            btnTxt="Add trips"
            navigate={'AddTrip'}
          />
        </View>
        <View style={{height: 440}}>
          {loading ? (
            <View className="mt-4">
              <Loading IsUIActivityIndicator={true} />
            </View>
          ) : (
            <FlatListData
              data={trips}
              isTripExpenses={true}
              columns={2}
              navigate={'TripExpenses'}
            />
          )}
          {/* <FlatList
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
                  onPress={() => navigation.navigate('TripExpenses', {...item})}
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
          /> */}
        </View>
      </View>
    </ScreenWrapper>
  );
}

{
  /* <View className="mt-2 flex-row justify-between items-center">
          <Text
            className={` text-gray-600 text-xl shadow-sm font-semibold`}>
            Recent Trips
          </Text>
          <Button btnTxt={'Add Trip'} navigate={'AddTrip'} />
        </View> */
}
{
  /* <TouchableOpacity className="bg-white px-4 py-2 rounded-full shadow-2xl ">
            <Text className={`text-gray-800 text-[16px] `}>Add Trip</Text>
          </TouchableOpacity> */
}
