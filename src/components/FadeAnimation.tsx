import React, { useRef } from 'react';
import { Animated, View, Button } from 'react-native';

const FadeAnimation = () => {
  const animValue = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    Animated.timing(animValue, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View>
      <Animated.Text style={{ opacity: animValue }}>
        Fade Animation
      </Animated.Text>
      <Button title="Fade" onPress={() => fadeIn()} />
    </View>
  );
};

export default FadeAnimation;
