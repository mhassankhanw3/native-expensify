import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import AddTripScreen from '../screens/AddTripScreen';
import AddExpenseScreen from '../screens/AddExpenseScreen';
import TripExpensesScreen from '../screens/TripExpensesScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import auth from '@react-native-firebase/auth';
import {initializeApp} from 'firebase/app';
import {useMainContext} from '../context/Main';

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  const {user} = useMainContext();

  // return (
  //   // <NavigationContainer>
  //   //   <Stack.Navigator initialRouteName="AuthSwitch">
  //   //     <Stack.Screen
  //   //       options={{headerShown: false, animation: 'slide_from_bottom'}}
  //   //       name="AuthSwitch"
  //   //       component={AuthSwitch}
  //   //     />
  //   //     <Stack.Screen
  //   //       options={{headerShown: false, animation: 'slide_from_right'}}
  //   //       name="Welcome"
  //   //       component={WelcomeScreen}
  //   //     />
  //   //     <Stack.Screen
  //   //       options={{headerShown: false, animation: 'slide_from_right'}}
  //   //       name="Home"
  //   //       component={HomeScreen}
  //   //     />
  //   //     <Stack.Screen
  //   //       options={{headerShown: false, animation: 'slide_from_bottom'}}
  //   //       name="SignIn"
  //   //       component={SignIn}
  //   //     />
  //   //     <Stack.Screen
  //   //       options={{headerShown: false, animation: 'slide_from_bottom'}}
  //   //       name="SignUp"
  //   //       component={SignUp}
  //   //     />
  //   //     <Stack.Screen
  //   //       options={{headerShown: false, animation: 'slide_from_bottom'}}
  //   //       name="AddTrip"
  //   //       component={AddTripScreen}
  //   //     />
  //   //     <Stack.Screen
  //   //       options={{headerShown: false, animation: 'slide_from_bottom'}}
  //   //       name="AddExpense"
  //   //       component={AddExpenseScreen}
  //   //     />
  //   //     <Stack.Screen
  //   //       options={{headerShown: false, animation: 'slide_from_right'}}
  //   //       name="TripExpenses"
  //   //       component={TripExpensesScreen}
  //   //     />
  //   //   </Stack.Navigator>
  //   // </NavigationContainer>
  //   <NavigationContainer>
  //     <Stack.Navigator initialRouteName="Home">
  //       <Stack.Screen
  //         options={{headerShown: false, animation: 'slide_from_right'}}
  //         name="Home"
  //         component={HomeScreen}
  //       />
  //       <Stack.Screen
  //         options={{headerShown: false, animation: 'slide_from_bottom'}}
  //         name="AddTrip"
  //         component={AddTripScreen}
  //       />
  //       <Stack.Screen
  //         options={{headerShown: false, animation: 'slide_from_bottom'}}
  //         name="AddExpense"
  //         component={AddExpenseScreen}
  //       />
  //       <Stack.Screen
  //         options={{headerShown: false, animation: 'slide_from_right'}}
  //         name="TripExpenses"
  //         component={TripExpensesScreen}
  //       />

  //       <Stack.Screen
  //         options={{headerShown: false, animation: 'slide_from_bottom'}}
  //         name="SignIn"
  //         component={SignIn}
  //       />
  //       <Stack.Screen
  //         options={{headerShown: false, animation: 'slide_from_bottom'}}
  //         name="SignUp"
  //         component={SignUp}
  //       />
  //       <Stack.Screen
  //         options={{headerShown: false, animation: 'slide_from_right'}}
  //         name="Welcome"
  //         component={WelcomeScreen}
  //       />
  //     </Stack.Navigator>
  //   </NavigationContainer>
  // );

  if (user) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            options={{headerShown: false, animation: 'slide_from_right'}}
            name="Home"
            component={HomeScreen}
          />

          <Stack.Screen
            options={{headerShown: false, animation: 'slide_from_bottom'}}
            name="AddTrip"
            component={AddTripScreen}
          />
          <Stack.Screen
            options={{headerShown: false, animation: 'slide_from_bottom'}}
            name="AddExpense"
            component={AddExpenseScreen}
          />
          <Stack.Screen
            options={{headerShown: false, animation: 'slide_from_right'}}
            name="TripExpenses"
            component={TripExpensesScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen
            options={{headerShown: false, animation: 'slide_from_bottom'}}
            name="SignIn"
            component={SignIn}
          />
          <Stack.Screen
            options={{headerShown: false, animation: 'slide_from_bottom'}}
            name="SignUp"
            component={SignUp}
          />
          <Stack.Screen
            options={{headerShown: false, animation: 'slide_from_right'}}
            name="Welcome"
            component={WelcomeScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

// return (
//   <NavigationContainer>
//     <Stack.Navigator initialRouteName="Home">
//       <Stack.Screen
//         options={{headerShown: false, animation: 'slide_from_right'}}
//         name="Home"
//         component={HomeScreen}
//       />

//       <Stack.Screen
//         options={{headerShown: false, animation: 'slide_from_bottom'}}
//         name="AddTrip"
//         component={AddTripScreen}
//       />
//       <Stack.Screen
//         options={{headerShown: false, animation: 'slide_from_bottom'}}
//         name="AddExpense"
//         component={AddExpenseScreen}
//       />
//       <Stack.Screen
//         options={{headerShown: false, animation: 'slide_from_right'}}
//         name="TripExpenses"
//         component={TripExpensesScreen}
//       />
//     </Stack.Navigator>
//   </NavigationContainer>
// );
