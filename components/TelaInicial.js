
import React, { useEffect } from 'react';

import {
  View,
  Image,
  StyleSheet,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';

import Styles from '../Styles';
import PenseBemJr from './PenseBemJr';

function TelaInicial() {

  const bgX = useSharedValue(0);
  const bgY = useSharedValue(0);

  const contentX = useSharedValue(0);
  const contentY = useSharedValue(0);
  const contentRotate = useSharedValue(0);
  const contentScale = useSharedValue(1);

  useEffect(() => {

    // Background horizontal
    bgX.value = withRepeat(
      withTiming(12, {
        duration: 7000,
        easing: Easing.inOut(Easing.sin),
      }),
      -1,
      true
    );

    // Background vertical
    bgY.value = withRepeat(
      withTiming(-10, {
        duration: 9000,
        easing: Easing.inOut(Easing.sin),
      }),
      -1,
      true
    );

    // PenseBemJr horizontal
    contentX.value = withRepeat(
      withTiming(5, {
        duration: 4000,
        easing: Easing.inOut(Easing.sin),
      }),
      -1,
      true
    );

    // PenseBemJr vertical
    contentY.value = withRepeat(
      withTiming(-7, {
        duration: 5000,
        easing: Easing.inOut(Easing.sin),
      }),
      -1,
      true
    );

    // Rotação suave
    contentRotate.value = withRepeat(
      withTiming(1, {
        duration: 4500,
        easing: Easing.inOut(Easing.sin),
      }),
      -1,
      true
    );

    // Efeito de respiração
    contentScale.value = withRepeat(
      withTiming(1.015, {
        duration: 3500,
        easing: Easing.inOut(Easing.sin),
      }),
      -1,
      true
    );

  }, []);

  const backgroundStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: bgX.value },
      { translateY: bgY.value },
      { scale: 1.08 },
    ],
  }));

  const contentStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: contentX.value },
      { translateY: contentY.value },
      { rotate: `${contentRotate.value}deg` },
      { scale: contentScale.value },
    ],
  }));

  return (

    <View style={Styles.principal}>
      <LinearGradient
        colors={[
          '#fcbd5f',
          '#d3840f',
          '#956214',
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />
      <View
        pointerEvents="none"
        style={StyleSheet.absoluteFillObject}
      >

        <Animated.View
          style={[
            StyleSheet.absoluteFillObject,
            backgroundStyle,
          ]}
        >

          <Image
            source={require('../assets/QMarkPatternBig.png')}
            style={Styles.pattern}
          />

        </Animated.View>

      </View>

      {/* ==========================
          3. LOGO
      ========================== */}

      <Image
        source={require('../assets/Logo.png')}
        style={Styles.logo}
        resizeMode="contain"
      />

      {/* ==========================
          4. PENSEBEMJR
      ========================== */}

      <Animated.View style={contentStyle}>
        <PenseBemJr />
      </Animated.View>

    </View>

  );
}

export default TelaInicial;
