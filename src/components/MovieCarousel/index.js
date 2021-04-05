import React, {useCallback} from 'react';
import {
  StatusBar,
  Text,
  View,
  StyleSheet,
  Image,
  Animated,
  Platform,
} from 'react-native';
import {getMovies} from './Helper/api';
import Rating from './Helper/Rating';
import Genres from './Helper/Genres';
import Backdrop from './Helper/Backdrop';
import {ITEM_SIZE, EMPTY_ITEM_SIZE, SPACING} from './constant';
export default function MovieCarousel() {
  const [movies, setMovies] = React.useState([]);
  const scrollX = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    const fetchData = async () => {
      const moviesList = await getMovies();
      // Add empty items to create fake space
      setMovies([{key: 'empty-left'}, ...moviesList, {key: 'empty-right'}]);
    };

    if (movies.length === 0) {
      fetchData(movies);
    }
  }, [movies]);
  const renderItem = useCallback(
    ({item, index}) => {
      if (!item.poster) {
        return <View style={{width: EMPTY_ITEM_SIZE}} />;
      }

      const inputRange = [
        (index - 2) * ITEM_SIZE,
        (index - 1) * ITEM_SIZE,
        index * ITEM_SIZE,
      ];

      const translateY = scrollX.interpolate({
        inputRange,
        outputRange: [100, 50, 100],
        extrapolate: 'clamp',
      });

      return (
        <View style={{width: ITEM_SIZE}}>
          <Animated.View style={[styles.item, {transform: [{translateY}]}]}>
            <Image source={{uri: item.poster}} style={styles.posterImage} />
            <Text style={styles.txtTitle} numberOfLines={1}>
              {item.title}
            </Text>
            <Rating rating={item.rating} />
            <Genres genres={item.genres} />
            <Text style={styles.txtDescription} numberOfLines={3}>
              {item.description}
            </Text>
          </Animated.View>
        </View>
      );
    },
    [scrollX],
  );
  return (
    <View style={styles.container}>
      <Backdrop movies={movies} scrollX={scrollX} />
      <StatusBar hidden />
      <Animated.FlatList
        showsHorizontalScrollIndicator={false}
        data={movies}
        keyExtractor={(item) => item.key}
        horizontal
        bounces={false}
        decelerationRate={Platform.OS === 'ios' ? 0 : 0.98}
        renderToHardwareTextureAndroid
        contentContainerStyle={styles.baseCenter}
        snapToInterval={ITEM_SIZE}
        snapToAlignment="start"
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}
        scrollEventThrottle={16}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  posterImage: {
    width: '100%',
    height: ITEM_SIZE * 1.2,
    resizeMode: 'cover',
    borderRadius: 24,
    margin: 0,
    marginBottom: 10,
  },
  txtDescription: {fontSize: 12},
  baseCenter: {alignItems: 'center'},
  txtTitle: {fontSize: 24},
  item: {
    marginHorizontal: SPACING,
    padding: SPACING * 2,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 34,
  },
});
