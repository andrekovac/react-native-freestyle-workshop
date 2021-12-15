## Animations

### Animations with [Animated](https://reactnative.dev/docs/animated)

Basic animation example:

```tsx
import React, {useRef} from 'react';
import {View, Text, Button, Animated} from 'react-native';
import styled from 'styled-components/native';

const FadingBox = () => {
  const animValue = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    Animated.timing(animValue, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View>
      <Text>FadingBox</Text>
      <Box style={{opacity: animValue}} />
      <Button title="Show/Hide" onPress={fadeIn} />
    </View>
  );
};

const Box = styled(Animated.View)<{opacity?: number}>`
  width: 100px;
  height: 100px;
  background-color: yellow;
`;

export default FadingBox;
```

<img width="282" alt="image" src="https://user-images.githubusercontent.com/1945462/146077126-198cc8d9-e727-4071-9a33-cb193ab21c82.png">


With **interpolation**:

```tsx
import React, {useRef} from 'react';
import {View, Text, Button, Animated} from 'react-native';
import styled from 'styled-components/native';

const FadingBox = () => {
  const animValue = useRef(new Animated.Value(0)).current;

  const BigSmallAnim = {
    inputRange: [0, 0.5, 1],
    outputRange: [0.5, 2, 1],
  };

  const fadeIn = () => {
    Animated.sequence([
      Animated.timing(animValue, {
        toValue: 0.5,
        duration: 200,
        // Easing: https://reactnative.dev/docs/easing
        useNativeDriver: true,
      }),
      Animated.timing(animValue, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const fadeOut = () => {
    Animated.timing(animValue, {
      toValue: 0,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View>
      <Text>FadingBox</Text>
      <Box
        style={{
          opacity: animValue,

          transform: [
            {
              scale: animValue.interpolate(BigSmallAnim),
            },
          ],
        }}
      />
      <Button title="Show" onPress={fadeIn} />
      <Button title="Hide" onPress={fadeOut} />
    </View>
  );
};

const Box = styled(Animated.View)<{opacity?: number}>`
  width: 100px;
  height: 100px;
  background-color: yellow;
`;

export default FadingBox;
```

**Task**: Create an animation which 

  1. ...starts on mount of a component
  2. ...makes an element move out of the screen when pressing a button

### [LayoutAnimation](https://reactnative.dev/docs/layoutanimation)

```tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Animated,
  LayoutAnimation,
  Button,
  Platform,
  UIManager,
} from 'react-native';
import styled from 'styled-components/native';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// Reference: https://reactnative.dev/docs/layoutanimation
const rowsLayoutAnimation = {
  duration: 200,
  create: {
    type: LayoutAnimation.Types.linear,
    property: LayoutAnimation.Properties.scaleXY,
  },
  delete: {
    type: LayoutAnimation.Types.linear,
    property: LayoutAnimation.Properties.opacity,
    delay: 500,
  },
  update: {
    type: LayoutAnimation.Types.linear,
    property: LayoutAnimation.Properties.scaleX,
    duration: 1000,
  },
};

const TouchingBall = () => {
  const [checked, setChecked] = useState(false);
  const [rows, setRows] = useState<number[]>([0, 1, 2]);

  useEffect(() => {
    LayoutAnimation.configureNext(rowsLayoutAnimation);
  }, [rows]);

  const addRow = () => {
    setRows(rows.concat([Math.round(Math.random() * 100)]));
    setChecked(!checked);
  };

  const deleteRow = () => {
    // LayoutAnimation.configureNext(rowsLayoutAnimation);
    setRows(r => r.slice(0, r.length - 1));
  };

  const sortRows = () => {
    // LayoutAnimation.configureNext(rowsLayoutAnimation);
    setRows(r => {
      return [...r.sort((one, two) => one - two)];
    });
  };

  return (
    <View style={{ width: '100%', flex: 1 }}>
      <Text>Catch the ball</Text>
      <BallTouchable
        onPress={() => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          setChecked(!checked);
        }}
        style={{
          alignSelf: checked ? 'flex-end' : 'flex-start',
        }}>
        <Ball />
      </BallTouchable>

      <Text>Rows</Text>
      <ButtonWrapper>
        <Button
          title="Add row"
          onPress={() => {
            addRow();
          }}
        />
        <Button
          title="Delete row"
          onPress={() => {
            deleteRow();
          }}
        />
        <Button
          title="Sort"
          onPress={() => {
            sortRows();
          }}
        />
      </ButtonWrapper>
      {rows.map(row => (
        <Row key={row} {...{ row }}>
          <Text>{row}</Text>
        </Row>
      ))}
    </View>
  );
};

const ButtonWrapper = styled.View`
  flex-direction: row;
  justify-content: center;
`;

const Row = styled.View`
  width: 100%;
  background-color: #4d7;
  border: 1px solid green;
  padding: 10px;
`;

const BallTouchable = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  border-radius: 40px;
`;

const Ball = styled(Animated.View)`
  width: 40px;
  height: 40px;
  background-color: blue;
  border-radius: 40px;
`;

export default TouchingBall;
```

<image width="282" alt="image" src="https://user-images.githubusercontent.com/1945462/146076924-9c8f1724-be1b-44f7-9f2c-a73df9d388c8.png">
