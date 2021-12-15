import React, { useState } from 'react';
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

  const addRow = () => {
    LayoutAnimation.configureNext(rowsLayoutAnimation);
    setRows(rows.concat([Math.round(Math.random() * 100)]));
  };

  const deleteRow = () => {
    LayoutAnimation.configureNext(rowsLayoutAnimation);
    setRows(r => r.slice(0, r.length - 1));
  };

  const sortRows = () => {
    LayoutAnimation.configureNext(rowsLayoutAnimation);
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
