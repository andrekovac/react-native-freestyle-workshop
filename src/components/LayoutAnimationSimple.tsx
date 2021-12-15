import React, { useState } from 'react';
import { Platform, UIManager, Button, LayoutAnimation } from 'react-native';
import styled from 'styled-components/native';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const LayoutAnimationNew = () => {
  const [right, setRight] = useState(false);

  return (
    <>
      <Button
        title="Toggle"
        onPress={() => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          setRight(!right);
        }}
      />
      <Ball style={{ alignSelf: right ? 'flex-end' : 'flex-start' }} />
    </>
  );
};

const Ball = styled.View`
  width: 50px;
  height: 50px;
  border-radius: 50px;
  background-color: red;
  align-self: flex-start;
`;

export default LayoutAnimationNew;
