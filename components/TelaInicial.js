
import React, { useEffect, useState, useCallback } from 'react';

import {
  View,
  Image,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { VideoView, useVideoPlayer } from 'expo-video';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
  runOnJS,
} from 'react-native-reanimated';

import Styles from '../Styles';
import PenseBemJr from './PenseBemJr';

function TelaInicial() {

  const { width, height } = useWindowDimensions();

  const escala = Math.min(width / 320, height / 620, 1.5);
  const ajusteCutscene = width / height < 0.75 ? 'cover' : 'contain';

  // =================================
  // ANIMAÇÃO DO BACKGROUND
  // =================================

  const bgX = useSharedValue(0);
  const bgY = useSharedValue(0);

  // =================================
  // WIGGLE DO PENSEBEMJR
  // =================================

  const contentX = useSharedValue(0);
  const contentY = useSharedValue(0);
  const contentRotate = useSharedValue(0);
  const contentScale = useSharedValue(1);

  // =================================
  // CONTROLE DA CUTSCENE
  // =================================

  const [cutsceneVisivel, setCutsceneVisivel] = useState(false);
  const [cutsceneFinalizada, setCutsceneFinalizada] = useState(false);

  const [whiteReady, setWhiteReady] = useState(false);
  const [bookFinished, setBookFinished] = useState(false);
  const [cutsceneStarted, setCutsceneStarted] = useState(false);

  const whiteOpacity = useSharedValue(0);

  const whiteStyle = useAnimatedStyle(() => ({
    opacity: whiteOpacity.value,
  }));

  // =================================
  // PLAYER MP4 (720 x 1280)
  // =================================

  const playerCutscene = useVideoPlayer(
    require('../assets/PenseBemIntro.mp4'),
    (player) => {
      player.loop = false;
      player.muted = false;
    }
  );

  // =================================
  // INICIAR TRANSIÇÃO
  // =================================

  const iniciarTransicao = useCallback(() => {

    setCutsceneFinalizada(false);
    setCutsceneVisivel(false);

    setWhiteReady(false);
    setBookFinished(false);
    setCutsceneStarted(false);

    whiteOpacity.value = 0;

    // Esperar 1 segundo após o início do BookFound
    const timeout = setTimeout(() => {

      // Fade in branco
      whiteOpacity.value = withTiming(
        1,
        {
          duration: 700,
          easing: Easing.inOut(Easing.ease),
        },
        (finished) => {

          if (finished) {
            runOnJS(setWhiteReady)(true);
          }

        }
      );

    }, 1000);

  }, [whiteOpacity]);

  // =================================
  // BOOKTOABC TERMINOU
  // =================================

  const finalizarBookAnimation = useCallback(() => {

    setBookFinished(true);

  }, []);

  // =================================
  // PREPARAR CUTSCENE
  // =================================

  useEffect(() => {

    if (
      !whiteReady ||
      !bookFinished ||
      cutsceneStarted
    ) return;

    setCutsceneStarted(true);
    setCutsceneVisivel(true);

    // Fade out branco
    whiteOpacity.value = withTiming(
      0,
      {
        duration: 900,
        easing: Easing.out(Easing.ease),
      }
    );

  }, [
    whiteReady,
    bookFinished,
    cutsceneStarted,
    whiteOpacity,
  ]);

  // =================================
  // INICIAR MP4 QUANDO ESTIVER PRONTO
  // =================================

  useEffect(() => {

    if (!cutsceneVisivel) return;

    let iniciado = false;

    function tocarVideo() {

      if (iniciado) return;

      iniciado = true;

      try {

        playerCutscene.currentTime = 0;
        playerCutscene.play();

      } catch (error) {

        console.log('Erro ao iniciar cutscene:', error);

      }

    }

    if (playerCutscene.status === 'readyToPlay') {
      tocarVideo();
    }

    const subscription = playerCutscene.addListener(
      'statusChange',
      ({ status }) => {

        if (status === 'readyToPlay') {
          tocarVideo();
        }

      }
    );

    return () => subscription.remove();

  }, [cutsceneVisivel, playerCutscene]);

  // =================================
  // FINAL DA CUTSCENE
  // =================================

  useEffect(() => {

    const subscription = playerCutscene.addListener(
      'playToEnd',
      () => {

        setCutsceneVisivel(false);
        setCutsceneFinalizada(true);

        setWhiteReady(false);
        setBookFinished(false);
        setCutsceneStarted(false);

      }
    );

    return () => subscription.remove();

  }, [playerCutscene]);

  // =================================
  // ANIMAÇÕES ORIGINAIS
  // =================================

  useEffect(() => {

    bgX.value = withRepeat(
      withTiming(12, {
        duration: 7000,
        easing: Easing.inOut(Easing.sin),
      }),
      -1,
      true
    );

    bgY.value = withRepeat(
      withTiming(-10, {
        duration: 9000,
        easing: Easing.inOut(Easing.sin),
      }),
      -1,
      true
    );

    contentX.value = withRepeat(
      withTiming(5, {
        duration: 4000,
        easing: Easing.inOut(Easing.sin),
      }),
      -1,
      true
    );

    contentY.value = withRepeat(
      withTiming(-7, {
        duration: 5000,
        easing: Easing.inOut(Easing.sin),
      }),
      -1,
      true
    );

    contentRotate.value = withRepeat(
      withTiming(1, {
        duration: 4500,
        easing: Easing.inOut(Easing.sin),
      }),
      -1,
      true
    );

    contentScale.value = withRepeat(
      withTiming(1.015, {
        duration: 3500,
        easing: Easing.inOut(Easing.sin),
      }),
      -1,
      true
    );

  }, []);

  // =================================
  // ESTILOS ANIMADOS
  // =================================

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

  // =================================
  // INTERFACE
  // =================================

  return (

    <View style={Styles.principal}>

      {/* GRADIENT */}

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

      {/* BACKGROUND PATTERN */}

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
            resizeMode="repeat"
          />

        </Animated.View>

      </View>

      {/* CONJUNTO ORIGINAL */}

      <View
        style={[
          Styles.conjunto,
          {
            transform: [
              { translateY: -12 * escala },
              { scale: escala },
            ],
          },
        ]}
      >

        <Image
          source={require('../assets/Logo.png')}
          style={Styles.logo}
          resizeMode="contain"
        />

        <Animated.View style={contentStyle}>

          <PenseBemJr
            onTransicaoIniciada={iniciarTransicao}
            onBookAnimationEnd={finalizarBookAnimation}
            cutsceneFinalizada={cutsceneFinalizada}
          />

        </Animated.View>

      </View>

      {/* CUTSCENE MP4 */}

      <View
        pointerEvents={cutsceneVisivel ? 'auto' : 'none'}
        style={[
          styles.cutscene,
          {
            opacity: cutsceneVisivel ? 1 : 0,
          },
        ]}
      >

        <LinearGradient
          colors={['#E1DAC7', '#B5B1A3']}
          style={StyleSheet.absoluteFillObject}
        />

        <View style={styles.videoCamada}>
          <VideoView
            player={playerCutscene}
            style={styles.video}
            contentFit={ajusteCutscene}
            nativeControls={false}
            allowsFullscreen={false}
          />
        </View>

      </View>

      {/* FLASH BRANCO */}

      <Animated.View
        pointerEvents="none"
        style={[
          StyleSheet.absoluteFillObject,
          styles.whiteOverlay,
          whiteStyle,
        ]}
      />

    </View>

  );

}

// =================================
// ESTILOS
// =================================

const styles = StyleSheet.create({

  cutscene: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#B5B1A3',
    zIndex: 50,
    elevation: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },

  videoCamada: {
    width: '100%',
    height: '100%',
    position: 'relative',
    zIndex: 1,
  },

  video: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
  },

  whiteOverlay: {
    backgroundColor: '#FFFFFF',
    zIndex: 100,
    elevation: 100,
  },

});

export default TelaInicial;
