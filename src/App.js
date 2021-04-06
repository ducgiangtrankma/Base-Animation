import React, {Component} from 'react';
import {SafeAreaView, LogBox} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Root from './navigation';
LogBox.ignoreLogs([
  'Easing was renamed to EasingNode in Reanimated 2. Please use EasingNode instead',
]);
export default function App() {
  return (
    <SafeAreaProvider>
      <Root />
    </SafeAreaProvider>
  );
}
