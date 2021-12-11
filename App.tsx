import React from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';

import Worklet from './src/components/Worklet';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Worklet />
    </SafeAreaView>
  );
};

export default App;
