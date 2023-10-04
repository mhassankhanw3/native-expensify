import React, {useState, createContext, useContext, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Pressable,
  Alert,
  Image,
} from 'react-native';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import Snackbar from 'react-native-snackbar';
import firestore from '@react-native-firebase/firestore';

const MyContext = createContext();
export const useMainContext = () => useContext(MyContext);

export default MainContextProvider = props => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [timestampField, setTimestampField] = useState('');

  //                 Error handlers

  const ERROR_EMAIL_ALREADY_IN_USE = 'auth/email-already-in-use';
  const ERROR_INVALID_EMAIL = 'auth/invalid-email';
  const ERROR_INVALID_LOGIN = 'auth/invalid-login';

  const handleAuthError = error => {
    let errorMessage = 'Something went wrong!';

    switch (error.code) {
      case ERROR_EMAIL_ALREADY_IN_USE:
        errorMessage = 'That email address is already in use!';
        break;
      case ERROR_INVALID_EMAIL:
        errorMessage = 'That email address is invalid!';
        break;
      case ERROR_INVALID_LOGIN:
        errorMessage = 'Invalid Login!';
        break;
      default:
        break;
    }

    Snackbar.show({
      text: errorMessage,
      textColor: '#b91c1c',
      backgroundColor: '#fecaca',
      action: {
        text: 'ok',
        textColor: '#b91c1c',
      },
    });
  };

  //                              USER SIGNUP

  const newUser = async (email, password, displayName, navigation) => {
    setLoading(true);
    await auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async res => {
        console.log('User account created & signed in!');
        console.log(res, 'res User account created & signed in!');
        setLoading(false);
        await auth().currentUser.updateProfile({
          displayName: displayName,
        });
        setUser(auth().currentUser);
      })
      .catch(error => {
        setLoading(false);
        handleAuthError(error);
        navigation.navigate('SignUp');
        console.error(error);
      });
  };

  //                              USER SIGNIN

  const signIn = async (email, password, navigation) => {
    setLoading(true);

    await auth()
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        console.log(res, 'User account created & signed in!');
        navigation?.navigate('Home');
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        handleAuthError(error);
        navigation.navigate('SignIn');
        console.error(error);
      });
  };

  //                              USER LOGOUT

  const Logout = async (email, password, navigation) => {
    await auth()
      .signOut(email, password)
      .then(res => {
        console.log('User signed out!');
        console.log(res);
      })
      .catch(error => {
        console.error(error);
      });
  };

  //                              PASSWORD RESET

  const resetPassword = async email => {
    // setLoading(true);
    await auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        // Password reset email sent successfully
        console.log('Password reset email sent successfully:', email);
        Snackbar.show({
          text: 'Password reset email sent. Check your inbox.',
          textColor: 'green',
          backgroundColor: 'white',
          numberOfLines: 2,
          action: {
            text: 'OK',
            textColor: 'green',
          },
        });
        // setLoading(false);
      })
      .catch(error => {
        // setLoading(false);
        // Error sending the password reset email
        console.error('Error sending password reset email:', error);
        Snackbar.show({
          text: 'Error sending password reset email.',
          textColor: '#b91c1c',
          backgroundColor: '#fecaca',
          numberOfLines: 2,
          action: {
            text: 'OK',
            textColor: '#b91c1c',
          },
        });
      });
  };

  //                             FIREBASE CONFIG

  const config = {
    apiKey: 'AIzaSyC4pizNOC2j69AvzHelJl1JL6NQvps_ooY',
    authDomain: 'native-expensify-68792.firebaseapp.com',
    projectId: 'native-expensify-68792',
    storageBucket: 'native-expensify-68792.appspot.com',
    messagingSenderId: '965457606753',
    appId: '1:965457606753:web:9e99822d99a8c0a87bd220',
  };
  //                             INITIALIZE FIREBASE

  useEffect(() => {
    if (firebase.apps.length === 0) {
      firebase.initializeApp(config);
      const storage = firebase.storage();
    }
  }, []);

  //                             ADD USER ADD TRIPS COLLECTION

  const addUserTripsToFirestore = async (place, country, user) => {
    setLoading(true);
    try {
      const docRef = await firestore()
        .collection('Users') // Reference to the top-level 'Users' collection
        .doc(user.uid) // Reference to the document with the user's UID
        .collection('TripsRef')
        .add({
          place,
          country,
          user: user.uid,
        });
      const docId = docRef.id;
      // console.log(`Document ID: ${docId}`);
      setLoading(false);
      return docId; // Return the document ID
    } catch (error) {
      setLoading(false);
      console.log(error, 'error database response');
      throw error;
    }
  };

  //                             GET TRIPS DATA FROM DATABASE

  const getTripsFromFirestore = async user => {
    try {
      const querySnapshot = await firestore()
        .collection('Users') // Reference to the top-level 'Users' collection
        .doc(user.uid) // Reference to the document with the user's UID
        .collection('TripsRef')
        .get();

      const trips = [];
      querySnapshot.forEach(documentSnapshot => {
        const tripData = documentSnapshot.data();
        const tripId = documentSnapshot.id; // Get the document ID
        trips.push({id: tripId, ...tripData}); // Include the document ID in the object
      });

      // console.log('Trips retrieved:', trips);
      return trips;
    } catch (error) {
      console.error('Error fetching trips:', error);
      throw error;
    }
  };

  //                             ADD USER ADD TRIPS COLLECTION

  const addUserTripsExpenseToFirestore = async (
    title,
    amount,
    category,
    user,
  ) => {
    setLoading(true);
    try {
      const docRef = await firestore()
        .collection('Users')
        .doc(user.uid)
        .collection('TripsExpenseRef')
        .add({
          title,
          amount,
          category,
          user: user.uid,
        });
      const docId = docRef.id;
      // console.log(`Document ID: ${docId}`);
      setLoading(false);
      return docId; // Return the document ID
    } catch (error) {
      setLoading(false);
      console.log(error, 'error database response');
      throw error;
    }
  };

  //                             GET TRIPS DATA FROM DATABASE

  const getTripsExpenseFromFirestore = async user => {
    try {
      const querySnapshot = await firestore()
        .collection('Users')
        .doc(user.uid)
        .collection('TripsExpenseRef')
        .get();

      const expenses = [];
      querySnapshot.forEach(documentSnapshot => {
        const expenseData = documentSnapshot.data();
        const expenseId = documentSnapshot.id; // Get the document ID
        expenses.push({id: expenseId, ...expenseData}); // Include the document ID in the object
      });

      // console.log('Expenses retrieved:', expenses);
      return expenses;
    } catch (error) {
      console.error('Error fetching expenses:', error);
      throw error;
    }
  };

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  useEffect(() => {
    console.log(user, 'user');
  }, [user]);

  const {children} = props;
  return (
    <MyContext.Provider
      value={{
        success: success,
        setSuccess: setSuccess,
        loading: loading,
        setLoading: setLoading,
        user: user,
        setUser: setUser,
        func: {
          newUser,
          signIn,
          Logout,
          resetPassword,
          addUserTripsToFirestore,
          getTripsFromFirestore,
          addUserTripsExpenseToFirestore,
          getTripsExpenseFromFirestore,
        },
      }}>
      {children}
    </MyContext.Provider>
  );
};
