/* eslint-disable max-len */
import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Animated, {Extrapolate, interpolateNode} from 'react-native-reanimated';

import {HEADER_IMAGE_HEIGHT} from './HeaderImage';
import {MIN_HEADER_HEIGHT} from './Header';

const {height} = Dimensions.get('window');
const items = [
  {
    title: 'Long Hongdae Nights',
    description:
      'Gà rán Hàn Quốc tráng men Gochujang, trang trí với vừng và hành lá, ăn kèm với khoai tây chiên & Miss Miu Mayo',
    price: '260,000 đ',
  },
  {
    title: 'Late Sunset',
    description:
      'Món khai vị gà rán Hàn Quốc với sốt phô mai bẩn và sốt Artisan - phiên bản nghịch ngợm mới, được yêu thích',
    price: '260,000 đ',
  },
  {
    title: 'Cabbage Kimchi',
    description: 'Phần ăn, thuần chay',
    price: '260,000 đ',
  },
  {
    title: 'Namur by Pieces',
    description:
      'Dim sum hấp tự làm với thịt lợn băm, nấm đông cô và hương vị mật ong khói, 4 miếng',
    price: '260,000 đ',
  },
  {
    title: 'Silim Lights',
    description:
      'Bibimbap bò, dầu mè, cơm, đậu, rau bina, cà rốt, hành lá, cải thảo, nấm đông cô, hành tây nướng và trứng',
    price: '260,000 đ',
  },
];

const menu = [
  {name: 'Khai vị', items},
  {name: 'Gọi nhiều', items},
  {name: 'Gợi ý cho bạn', items},
  {name: 'Món Nhật', items},
];
export const defaultTabs = menu.map(({name}) => ({name, anchor: 0}));
const styles = StyleSheet.create({
  section: {
    padding: 16,
  },
  placeholder: {
    height: HEADER_IMAGE_HEIGHT,
    marginBottom: MIN_HEADER_HEIGHT,
  },
  text: {
    fontSize: 14,
  },
  title1: {
    fontSize: 24,
    fontWeight: '700',
  },
  title2: {
    fontSize: 16,
  },
  divider: {
    height: 2,
    backgroundColor: '#e2e3e4',
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  ratings: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 8,
  },
  link: {
    color: '#247A00',
  },
  item: {
    borderBottomColor: '#e2e3e4',
    borderBottomWidth: 1,
    marginTop: 16,
  },
  title: {
    fontSize: 16,
    marginBottom: 8,
  },
  description: {
    marginBottom: 8,
  },
  price: {
    marginBottom: 16,
  },
});

export default ({y, onMeasurement}) => {
  const opacity = interpolateNode(y, {
    inputRange: [
      HEADER_IMAGE_HEIGHT - MIN_HEADER_HEIGHT - 100,
      HEADER_IMAGE_HEIGHT - MIN_HEADER_HEIGHT,
    ],
    outputRange: [1, 0],
    extrapolate: Extrapolate.CLAMP,
  });
  return (
    <>
      <View style={styles.placeholder} />
      <Animated.View style={[styles.section, {opacity}]}>
        <Text style={styles.text}>$$ • Châu Á • Hàn Quốc • Nhật Bản</Text>
        <View style={styles.info}>
          <Text style={styles.text}>Mở cửa 11:30 AM</Text>
          <View style={styles.ratings}>
            <AntDesign
              name="star"
              color="#f4c945"
              size={24}
              style={styles.icon}
            />
            <Text style={styles.text}>(186)</Text>
          </View>
        </View>
      </Animated.View>
      <View style={styles.divider} />
      <View style={styles.section}>
        <Text style={styles.title2}>Thông tin cửa hàng</Text>
        <View style={styles.info}>
          <Text style={styles.text}>131 Trần Phú, Hà Đông, Hà Nội</Text>
          <Text style={styles.link}>Chỉ đường</Text>
        </View>
      </View>
      <View style={styles.divider} />
      {menu.map(({name, items: menuItems}, index) => (
        <View
          style={styles.section}
          key={index}
          onLayout={({
            nativeEvent: {
              layout: {y: anchor},
            },
          }) => onMeasurement(index, {name, anchor: anchor - 142})}>
          <Text style={styles.title1}>{name}</Text>
          {menuItems.map(({title, description, price}, j) => (
            <View style={styles.item} key={j}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.description} numberOfLines={2}>
                {description}
              </Text>
              <Text style={styles.price}>{price}</Text>
            </View>
          ))}
        </View>
      ))}
      <View style={{height}} />
    </>
  );
};
