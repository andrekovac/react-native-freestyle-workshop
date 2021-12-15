## RN Basics

### Styles (Flexbox)

- flex-box in RN a bit different (e.g. default flex direction is `column`, not `row`)
- limited style inheritance (only nested `Text` components inherit)

	```jsx
	<Text style={styles.text}>
	  Colored Text<Text>color got inherited</Text>
	</Text>
	```

- `styled-components` in RN

1. **Task**: Build screen where three boxes are vertically evenly aligned and horizontally centered.
2. **Install styled-components**: 

  ```
  yarn add styled-components
  yarn add --dev @types/styled-components-react-native
  ```
  
3. `attrs` field:

	```tsx
	const List = styled.ScrollView.attrs(() => ({
	  contentContainerStyle: {
	    alignItems: 'center',
	    marginHorizontal: 20,
	  },
	}))`
	  padding: 20px;
	`;
	```

### Lists

#### ScrollView

**Task**: Use a `ScrollView` to map a list of 100 photos from <https://picsum.photos/v2/list?page=5&limit=100>. Use [RN Image Component](https://reactnative.dev/docs/image) to render an image.

  Additional requirements:
  
  - center photos horizontally 

_Intermediate Result_:

```jsx
import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, Image} from 'react-native';

type Photo = {
  id: string;
  author: string;
  download_url: string;
};

const ScrollList: React.VoidFunctionComponent = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      const response = await fetch(
        'https://picsum.photos/v2/list?page=2&limit=100',
      );
      const data = await response.json();
      console.log(data);
      setPhotos(data);
    };
    fetchPhotos();
  }, []);

  return (
    <View>
      <ScrollView>
        {photos.map(photo => {
          return (
            <>
              <Text>{photo.author}</Text>
              <Image
                source={{uri: photo.download_url}}
                style={{width: 200, height: 200}}
              />
            </>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default ScrollList;
```

<img width="282" alt="image" src="https://user-images.githubusercontent.com/1945462/145987626-59b985d4-7075-4e68-bae4-e2bfb41e8180.png">

##### Improve display of images


1. `useWindowDimensions` hook

```tsx
import React, {useEffect, useState} from 'react';
import {Text, useWindowDimensions} from 'react-native';
import styled from 'styled-components/native';

type Photo = {
  id: string;
  author: string;
  download_url: string;
};

const ScrollList: React.VoidFunctionComponent = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const dimensions = useWindowDimensions();

  useEffect(() => {
    const fetchPhotos = async () => {
      const response = await fetch(
        'https://picsum.photos/v2/list?page=2&limit=4',
      );
      const data = await response.json();
      console.log(data);
      setPhotos(data);
    };
    fetchPhotos();
  }, []);

  return (
    <ListWrapper>
      <List
        contentContainerStyle={{alignItems: 'center', marginHorizontal: 20}}>
        {photos.map(photo => {
          return (
            <ImageWrapper>
              <Text>{photo.author}</Text>
              <MyImage
                width={dimensions.width}
                source={{uri: photo.download_url}}
              />
            </ImageWrapper>
          );
        })}
      </List>
    </ListWrapper>
  );
};

type MyImageProps = {width: number};
const MyImage = styled.Image<MyImageProps>`
  height: 300px;
`;

const ImageWrapper = styled.View`
  width: 100%;
`;

const List = styled.ScrollView``;
const ListWrapper = styled.View``;

export default ScrollList;
```


2. [useLayout](https://github.com/react-native-community/hooks#uselayout) hook

#### FlatList