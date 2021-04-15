import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  Animated,
  StyleSheet,
  Dimensions,
} from 'react-native';
const w = Dimensions.get('window');
const ProgressiveImage = ({thumbnailSource, source, style}) => {
  const thumbnailAnimated = new Animated.Value(0);

  const imageAnimated = new Animated.Value(0);
  const handleThumbnailLoad = () => {
    Animated.timing(thumbnailAnimated, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const onImageLoad = () => {
    Animated.timing(imageAnimated, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };
  return (
    <View style={styles.container}>
      <Animated.Image
        // {...props}
        source={thumbnailSource}
        style={[style, {opacity: thumbnailAnimated}]}
        onLoad={handleThumbnailLoad}
        blurRadius={1}
      />
      <Animated.Image
        // {...props}
        source={source}
        style={[styles.imageOverlay, {opacity: imageAnimated}, style]}
        onLoad={onImageLoad}
      />
    </View>
  );
};
export default function Test() {
  console.log('Re-render');
  const [value, setValue] = useState('');
  const typingTimeOut = useRef(null);
  const changeValue = (e) => {
    if (typingTimeOut.current) {
      clearTimeout(typingTimeOut.current);
    }
    typingTimeOut.current = setTimeout(() => {
      setValue(e);
    }, 300);
  };
  return (
    <View style={{padding: 40}}>
      <Text>{value}</Text>
      <TextInput placeholder="Typing" onChangeText={changeValue} />
      <ProgressiveImage
        thumbnailSource={{
          uri: `https://images.pexels.com/photos/671557/pexels-photo-671557.jpeg?w=50&buster=${Math.random()}`,
        }}
        source={{
          uri: `https://images.pexels.com/photos/671557/pexels-photo-671557.jpeg?w=${
            w.width * 2
          }&buster=${Math.random()}`,
        }}
        style={{width: w.width, height: w.width}}
        resizeMode="cover"
      />
    </View>
  );
}
const styles = StyleSheet.create({
  imageOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
  container: {
    backgroundColor: '#e1e4e8',
  },
});
