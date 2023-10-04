import {View, Text, TouchableOpacity, FlatList, Image} from 'react-native';
import EmptyList from './EmptyList';
import randomImage from '../assets/images/randomimage';
import FlatListsCards from './FlatListsCards';
import ExpenseCard from './ExpenseCard';

export default function FlatListData({
  data,
  columns,
  navigate,
  isTripExpenseScreen,
  isTripExpenses,
}) {
  return (
    <FlatList
      data={data}
      ListEmptyComponent={
        <EmptyList
          isTripExpenses={isTripExpenses}
          emptyTrips={"You haven't recorded any trips yet!"}
          EmptyExpense={"You haven't added any TripsExpenses yet!"}
        />
      }
      numColumns={columns ? columns : 1}
      columnWrapperStyle={
        columns ? {justifyContent: 'space-between'} : undefined
      }
      keyExtractor={item => item?.id}
      showsVerticalScrollIndicator={false}
      renderItem={({item, index}) => {
        return isTripExpenseScreen ? (
          <ExpenseCard item={item} index={index} navigate={navigate} />
        ) : (
          <FlatListsCards item={item} navigate={navigate} />
        );
        // <TouchableOpacity
        //   onPress={() => navigation.navigate(navigate ? navigate : 'Home')}
        //   className="bg-white p-[17px] rounded-2xl shadow-sm mb-2">
        //   <View className="">
        //     <Image
        //       source={
        //         randomImage()
        //           ? randomImage()
        //           : require('../assets/images/12.png')
        //       }
        //       className="w-32 h-32 mb-2 mx-auto"
        //       alt="loading"
        //     />
        //     <Text className={` text-gray-700 text-sm shadow-sm font-bold`}>
        //       {item.Place}
        //     </Text>
        //     <Text className={` text-gray-500 text-xs shadow-sm font-normal`}>
        //       {item.Country}
        //     </Text>
        //   </View>
        // </TouchableOpacity>
      }}
    />
  );
}
