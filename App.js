import React from 'react';
import {Text, View} from 'react-native';
import AppNavigation from './Navigation/appNavigation';
import MainContextProvider from './context/Main';

function App() {
  return (
    <MainContextProvider>
      <AppNavigation />
    </MainContextProvider>
  );
}

export default App;
