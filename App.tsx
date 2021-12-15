import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import { useFlipper } from '@react-navigation/devtools';

import Worklet from './src/components/Worklet';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Animation01 from './src/components/Animation01';
// import Animation02_only_interruptible_once from './src/components/Animation02_only_interruptible_once';
import Animation02_interruptible_and_cancellable from './src/components/Animation02_interruptible_and_cancellable';
import AnimatedCards from './src/components/AnimatedCards';
import AnimatedCards_useSpring from './src/components/AnimatedCards_useSpring';
import TapEvents from './src/components/TapEvents';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import LayoutAnimationBox from './src/components/LayoutAnimationBox';
import PanEvents from './src/components/PanEvents';
import RootNavigator from './src/navigation';
import LayoutAnimationNew from './src/components/LayoutAnimationNew';
import TouchingBall from './src/components/TouchingBall';

const styles = StyleSheet.create({
  wrapper: { flex: 1, alignItems: 'center', justifyContent: 'space-around' },
});

const App = () => {
  const navigationRef = useNavigationContainerRef();

  useFlipper(navigationRef);

  return (
    // <GestureHandlerRootView style={{ flex: 1 }}>
    <NavigationContainer ref={navigationRef}>
      <RootNavigator />
    </NavigationContainer>
    // </GestureHandlerRootView>
  );
};

export default App;

const AppFormer = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <View style={styles.wrapper}>
        {/* <Worklet />
      <Animation01 />
      <Animation02_interruptible_and_cancellable /> */}
        {/* <AnimatedCards_useSpring /> */}
        {/* <TapEvents /> */}
        {/* <PanEvents /> */}
        <TouchingBall />
        {/* <LayoutAnimationNew /> */}
      </View>
    </SafeAreaView>
  );
};
