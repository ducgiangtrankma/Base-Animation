import React, {useCallback} from 'react';
import {View, Image, FlatList} from 'react-native';
import {styles} from './styles';
const AnimatedList = Animated.createAnimatedComponent(FlatList);
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';
import AnimatedCard from './Helper';
const FBStories = ({data, avatar}) => {
  const x = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    },
  });
  const renderCard = useCallback(({item, index}) => {
    return (
      <View style={styles.card}>
        <Image source={{uri: item.img}} style={{flex: 1}} />
      </View>
    );
  }, []);

  return (
    <View style={{paddingTop: 20, paddingBottom: 20}}>
      <AnimatedList
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
      <AnimatedCard x={x} avatarUri={avatar} />
    </View>
  );
};

export default React.memo(FBStories);
