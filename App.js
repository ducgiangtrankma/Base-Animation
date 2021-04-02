import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  SafeAreaView,
  StyleSheet,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const data = new Array(30).fill('null').map((v, i) => i.toString());

const AnimatedFlatlist = Animated.createAnimatedComponent(FlatList);

import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
  set,
  useDerivedValue,
} from 'react-native-reanimated';

const styles = StyleSheet.create({
  card: {
    width: 120,
    height: 200,
    overflow: 'hidden',
    borderRadius: 12,
    marginLeft: 4,
    marginRight: 4,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'grey',
    backgroundColor: 'white',
  },
});

const renderCard = ({item, index}) => {
  const uri = 'https://loremflickr.com/120/240?lock=' + index;
  return (
    <View style={styles.card}>
      <Image source={{uri}} style={{flex: 1}} />
    </View>
  );
};

const AnimatedCard = ({x}) => {
  const v = useDerivedValue(() => {
    return interpolate(x.value, [0, 120], [0, 1], Extrapolate.CLAMP);
  });

  const containerStyle = useAnimatedStyle(() => {
    const width = interpolate(v.value, [0, 1], [120, 60], Extrapolate.CLAMP);
    const marginLeft = interpolate(v.value, [0, 1], [4, 0], Extrapolate.CLAMP);
    const borderLeftRadius = interpolate(
      v.value,
      [0, 1],
      [12, 0],
      Extrapolate.CLAMP,
    );
    const borderRightRadius = interpolate(
      v.value,
      [0, 1],
      [12, 30],
      Extrapolate.CLAMP,
    );
    const height = interpolate(v.value, [0, 1], [200, 60], Extrapolate.CLAMP);
    const top = interpolate(v.value, [0, 1], [20, 100], Extrapolate.CLAMP);

    return {
      width,
      height,
      overflow: 'hidden',
      borderTopLeftRadius: borderLeftRadius,
      borderBottomLeftRadius: borderLeftRadius,
      borderTopRightRadius: borderRightRadius,
      borderBottomRightRadius: borderRightRadius,
      marginLeft,
      marginRight: 4,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: 'grey',
      position: 'absolute',
      left: 0,
      top,
      backgroundColor: 'white',
    };
  });

  const imageStyle = useAnimatedStyle(() => {
    const size = interpolate(v.value, [0, 1], [120, 40], Extrapolate.CLAMP);
    const borderRadius = interpolate(
      v.value,
      [0, 1],
      [0, 20],
      Extrapolate.CLAMP,
    );
    const tx = interpolate(v.value, [0, 1], [0, 10], Extrapolate.CLAMP);
    const ty = interpolate(v.value, [0, 1], [0, 10], Extrapolate.CLAMP);

    return {
      width: size,
      height: size,
      borderRadius,
      transform: [{translateX: tx}, {translateY: ty}],
    };
  });

  const iconStyle = useAnimatedStyle(() => {
    const top = interpolate(v.value, [0, 1], [100, 35], Extrapolate.CLAMP);
    const left = interpolate(v.value, [0, 1], [40, 35], Extrapolate.CLAMP);
    const size = interpolate(v.value, [0, 1], [40, 16], Extrapolate.CLAMP);
    const borderWidth = interpolate(v.value, [0, 1], [2, 0], Extrapolate.CLAMP);

    return {
      backgroundColor: '#3f3fef',
      alignItems: 'center',
      justifyContent: 'center',
      width: size,
      height: size,
      borderRadius: 20,
      borderWidth,
      borderColor: 'white',
      position: 'absolute',
      top,
      left,
    };
  });

  const textStyle = useAnimatedStyle(() => {
    const opacity = interpolate(v.value, [0, 0.5], [1, 0], Extrapolate.CLAMP);
    return {
      textAlign: 'center',
      marginTop: 30,
      opacity,
    };
  });

  const uri =
    'https://avatars.githubusercontent.com/u/26770991?s=460&u=b6ae24bb0cbbc523d7020663a130289d9139e478&v=4';
  return (
    <Animated.View style={containerStyle}>
      <Animated.Image source={{uri}} style={imageStyle} />
      <Animated.View style={iconStyle}>
        <Icon name="plus" color="white" size={18} />
      </Animated.View>
      <Animated.Text style={textStyle}>Create a story</Animated.Text>
    </Animated.View>
  );
};

const FBStories = () => {
  const x = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    },
  });

  return (
    <View style={{backgroundColor: '#c2c2c9', flex: 1}}>
      <StatusBar backgroundColor="#FFFFFF" />
      <View
        style={{
          backgroundColor: 'white',
          paddingTop: 20,
          paddingBottom: 20,
          marginTop: 60,
        }}>
        <AnimatedFlatlist
          horizontal
          data={data}
          renderItem={renderCard}
          ListHeaderComponent={<View style={{width: 128}} />}
          keyExtractor={(item, index) => `${index}`}
          scrollEventThrottle={6}
          onScroll={scrollHandler}
          showsHorizontalScrollIndicator={false}
          bounces={false}
        />
        <AnimatedCard x={x} />
      </View>
    </View>
  );
};

export default FBStories;
