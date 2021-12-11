import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { useSharedValue, runOnJS } from 'react-native-reanimated';

const Worklet = () => {
  const someWorklet = (greeting: string) => {
    'worklet';
    console.log("Hey I'm running on the UI thread" + greeting);
    return greeting;
  };

  // only use state setter to trigger a re-render
  const [, setValue] = useState(0);

  const sharedVal = useSharedValue(0);

  return (
    <View>
      <Button
        onPress={() => {
          const newRandomValue = Math.random();
          setValue(newRandomValue);
          sharedVal.value = newRandomValue;
        }}
        title="Randomize"
      />
      <Text>Shared Value: {sharedVal.value}</Text>
      <Text>Worklet: {runOnJS(someWorklet)('Hello!')}</Text>
    </View>
  );
};

export default Worklet;
