import React, {useCallback} from 'react';
import {View, FlatList, Animated, StyleSheet, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {BACKDROP_HEIGHT, width, height, ITEM_SIZE} from '../constant';
const Backdrop = ({movies, scrollX}) => {
  const renderItem = useCallback(
    ({item, index}) => {
      if (!item.backdrop) {
        return null;
      }
      const translateX = scrollX.interpolate({
        inputRange: [(index - 2) * ITEM_SIZE, (index - 1) * ITEM_SIZE],
        outputRange: [0, width],
        // extrapolate:'clamp'
      });
      return (
        <Animated.View
          removeClippedSubviews={false}
          style={[styles.container, {width: translateX}]}>
          <Image source={{uri: item.backdrop}} style={styles.image} />
        </Animated.View>
      );
    },
    [scrollX],
  );
  return (
    <View style={styles.backdrop}>
      <FlatList
        data={movies.reverse()}
        keyExtractor={(item) => item.key + '-backdrop'}
        removeClippedSubviews={false}
        contentContainerStyle={{width, height: BACKDROP_HEIGHT}}
        renderItem={renderItem}
      />
      <LinearGradient
        colors={['rgba(0, 0, 0, 0)', 'white']}
        style={styles.linearView}
      />
    </View>
  );
};
export default React.memo(Backdrop);
const styles = StyleSheet.create({
  backdrop: {height: BACKDROP_HEIGHT, width, position: 'absolute'},

  container: {
    position: 'absolute',
    height,
    overflow: 'hidden',
  },
  image: {
    width,
    height: BACKDROP_HEIGHT,
    position: 'absolute',
  },
  linearView: {
    height: BACKDROP_HEIGHT,
    width,
    position: 'absolute',
    bottom: 0,
  },
});
