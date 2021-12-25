
## [react-navigation](https://reactnavigation.org/)
 
### Setup

1. Copy/paste these dependencies into your `package.json`:
 
  ```
  "@react-navigation/bottom-tabs": "^6.0.9",
  "@react-navigation/devtools": "^6.0.4",
  "@react-navigation/native": "^6.0.6",
  "@react-navigation/native-stack": "^6.2.5",
  "react-native-safe-area-context": "^3.3.2",
  "react-native-screens": "^3.10.1",
  ```
  
2. And this one under `devDependencies`:
  
  ```
  "react-native-flipper": "^0.125.0",
  ```

3. Run `yarn` to install these new dependencies.
4. Run `cd ios && pod install` to install the new native ios dependencies
5. Restart the packager (kill the current packager process and run `yarn start` again) and re-build your project (`yarn ios` / `yarn android`).
 
### Basic project structure

`App.tsx`:

```tsx
import { useFlipper } from '@react-navigation/devtools';

const App = () => {
  const navigationRef = useNavigationContainerRef();

  useFlipper(navigationRef);

  return (
    <NavigationContainer ref={navigationRef}>
      <RootNavigator />
    </NavigationContainer>
  );
};

export default App;
```

`navigation/index.tsx`:
	
```tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigator from './BottomTabNavigator';
import ModalScreen from '../screens/ModalScreen';

const RootStack = createNativeStackNavigator();

export type RootStackParamList = {
  Tabs: undefined;
  ModalScreen: undefined;
};

const RootNavigator: React.FC = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Group>
        <RootStack.Screen
          name="Tabs"
          component={BottomTabNavigator}
          options={{
            headerShown: false,
          }}
        />
      </RootStack.Group>
      <RootStack.Group
        screenOptions={{ presentation: 'modal', headerShown: false }}>
        <RootStack.Screen name="ModalScreen" component={ModalScreen} />
      </RootStack.Group>
    </RootStack.Navigator>
  );
};

export default RootNavigator;
```

`navigation/BottomTabNavigator.tsx`:

```tsx
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import ExampleScreen from '../screens/ExampleScreen';

const Tab = createBottomTabNavigator();

export type BottomTabNavigatorParamList = {
  Example: undefined;
};

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Example" component={ExampleScreen} />
      {/* Add your other tab screens here */ }
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
```

`screens/ModalScreen.tsx`

```tsx
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Button, Text } from 'react-native';
import styled from 'styled-components/native';
import AnimatedCards from '../components/AnimatedCards';
import { RootStackParamList } from '../navigation';

type ModalScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'ModalScreen'
>;

const ModalScreen: React.FC<ModalScreenProps> = ({ navigation }) => {
  return (
    <ModalWrapper>
	 <Text>Modal</Text>
      <Button onPress={() => navigation.goBack()} title="Dismiss" />
    </ModalWrapper>
  );
};

const ModalWrapper = styled.View`
  flex: 1;
  justify-content: space-evenly;
  align-items: center;
`;

export default ModalScreen;
```

`screens/ExampleScreen.tsx`: Example Screen with `navigate` call:

```tsx
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Button } from 'react-native';
import styled from 'styled-components/native';
import { RootStackParamList } from '../navigation';

type ExampleScreenProps = BottomTabScreenProps<
  RootStackParamList,
  'ModalScreen'
>;

const ExampleScreen: React.FC<ExampleScreenProps> = ({
  navigation,
}) => {
  return (
    <ScreenWrapper>
      <Button
        onPress={() => navigation.navigate('ModalScreen')}
        title="Open Modal"
      />
    </ScreenWrapper>
  );
};

const ScreenWrapper = styled.View`
  flex: 1;
  justify-content: space-around;
  align-items: center;
`;

export default ExampleScreen;
```

**Task**: Create `screen/PhotosScreen.tsx`, `screen/PhotosDetailScreen.tsx` (displays `author`) -> `PhotosStackNavigator`.


### Tips

#### Updating the header title from within a screen

```tsx
const { item } = route.params;

React.useLayoutEffect(() => {
  navigation.setOptions({
    title: item.author,
  });
}, [navigation, item]);
```

#### `useFocusEffect`

`useFocusEffect` is called on every render when the screen is **in focus**.

```tsx
useFocusEffect(
  useCallback(() => {
    console.log('[PhotosScreen] focused');
    return () => {
      console.log('[PhotosScreen] unfocused');
    };
  }, []),
);
```

**Note**: `useCallback` causes it to be only called when focused/unfocused
  
### Topics

- Installation
- General intro (stack navigators, tab navigators and screens)
- nesting navigators
- `navigate` vs. `pop`, `push`, `moveTo` etc.
- `navigation` object, `useNavigation` hook and "navigate from anywhere"
- Android back button
- Modals & Overlays
- [Flipper integration](https://reactnavigation.org/docs/devtools/#useflipper)

### Stack Navigators
  
- **Note**: Screens in StackNavigator don't unmount when routing away from them.
- Use `useFocusEffect` instead of `useEffect` to do things when routing to/routing away from screen (e.g. start/stop music/video on stacked screen)
- New option: Enable [react-freeze](https://github.com/software-mansion/react-freeze) (part of `react-native-screens` option)
