import {Dimensions, Platform} from 'react-native';
const {width, height} = Dimensions.get('window');
const SPACING = 10;
const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 0.74;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;
const BACKDROP_HEIGHT = height * 0.65;
export {width, height, ITEM_SIZE, EMPTY_ITEM_SIZE, BACKDROP_HEIGHT, SPACING};
