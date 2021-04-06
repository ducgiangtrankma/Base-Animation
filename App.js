import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {FBStories, FBSearch, List, MovieCarousel} from './src/components';
import OverflowItems from './src/components/RNStackFlatlistCarousel';
export default function App(props) {
  return (
    <View style={styles.container}>
      {/* <FBSearch /> */}
      {/* <FBStories data={dataList} avatar={avatarUri} /> */}
      {/* <List /> */}
      {/* <MovieCarousel /> */}
      <OverflowItems />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
const avatarUri =
  'https://afamilycdn.com/thumb_w/650/150157425591193600/2021/3/29/ngoctrinh891661513371490499237942576920462979063487136n-1617008736620280771.jpg';
const dataList = [
  {
    id: 1,
    img:
      'https://afamilycdn.com/150157425591193600/2021/3/30/ngoc-trinh-giuong-chieu-6-16171144452971497976701.jpg',
  },
  {
    id: 2,
    img:
      'https://kenh14cdn.com/203336854389633024/2021/3/30/tong-tai-ngoc-trinh-kiem-tien-tu-nhung-cong-viec-nao-ma-thu-nhap-ca-ty-dong-moi-ngay-1-16171050837451017339613.jpg',
  },
  {
    id: 3,
    img:
      'https://kenh14cdn.com/thumb_w/660/2020/8/15/2-ngoc-trinh-6-2744-1589893027-8727-1589959533-15975041108311715339510.jpg',
  },
  {
    id: 4,
    img:
      'https://vcdn-ngoisao.vnecdn.net/2020/05/19/1-ngoc-trinh-1-4497-1589893026.jpg',
  },
  {
    id: 5,
    img:
      'https://image-us.eva.vn/upload/2-2019/images/2019-05-08/nhung-my-nhan-so-huu-co-bung-so-11-cuc-pham-nha-phuong-elly-tran-danh-bai-minh-tu-vi-nt2-min-1557306137-569-width600height900.jpg',
  },
];
