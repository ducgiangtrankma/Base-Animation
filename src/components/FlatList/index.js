/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {Animated, View} from 'react-native';
import Item from './Item';
import {SPACING, ITEM_SIZE} from './Item';
export default function List() {
  let currentPage = React.useRef(1);
  const [data, setData] = React.useState([]);
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const keyExtractor = React.useCallback((item, index) => `${index}`, []);
  const renderItem = React.useCallback(
    ({item, index}) => {
      const inputRange = [-1, 0, ITEM_SIZE * index, ITEM_SIZE * (index + 1)];
      const opacityInputRange = [
        -1,
        0,
        ITEM_SIZE * index,
        ITEM_SIZE * (index + 0.5),
      ];
      const scale = scrollY.interpolate({
        inputRange,
        outputRange: [1, 1, 1, 0],
      });
      const opacity = scrollY.interpolate({
        inputRange: opacityInputRange,
        outputRange: [1, 1, 1, 0],
      });
      return <Item item={item} index={index} scale={scale} opacity={opacity} />;
    },
    [scrollY],
  );
  const getList = React.useCallback(async (page) => {
    try {
      let response = await fetch(
        `https://api.stackexchange.com/2.2/users?page=${page}&order=desc&sort=reputation&site=stackoverflow`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );
      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(`Error is : ${error}`);
    }
  }, []);
  React.useEffect(() => {
    getList(currentPage.current).then((res) => {
      setData([...data, ...res.items]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleLoadMore = () => {
    currentPage.current = currentPage.current + 1;
    getList(currentPage.current).then((res) => {
      setData([...data, ...res.items]);
    });
  };
  const getItemLayout = React.useCallback(
    (data, index) => ({
      length: ITEM_SIZE,
      offset: ITEM_SIZE * index,
      index,
    }),
    [],
  );
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#FFFFFF',
      }}>
      <Animated.FlatList
        data={data}
        keyExtractor={keyExtractor}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: true},
        )}
        contentContainerStyle={{
          padding: SPACING,
        }}
        renderItem={renderItem}
        maxToRenderPerBatch={15}
        updateCellsBatchingPeriod={50}
        onEndReachedThreshold={0.75}
        onEndReached={handleLoadMore}
        getItemLayout={getItemLayout}
      />
    </View>
  );
}
