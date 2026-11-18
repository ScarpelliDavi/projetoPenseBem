
import React, { useState, useEffect } from 'react';
import { View, Image, Pressable, Platform } from 'react-native';
import { VideoView, useVideoPlayer } from 'expo-video';

import Styles from '../Styles';

// =================================
// ANIMAÇÃO (iOS usa .mov; Android e web usam .webm)
// =================================

const isIOS = Platform.OS === 'ios';

const animacaoStart = isIOS
  ? require('../assets/animations/iOS/StartAnim.mov')
  : require('../assets/animations/StartAnim.webm');

function ModoStart({ onIniciar }) {

  // =================================
  // ESTADO
  // =================================

  const [animando, setAnimando] = useState(false);

  // =================================
  // PLAYER STARTANIM
  // =================================

  const playerStart = useVideoPlayer(
    animacaoStart,
    player => {
      player.loop = false;
      player.muted = false;
    }
  );

  // =================================
  // FINAL DA STARTANIM -> MODOQUIZ (NoBookSelected)
  // =================================

  useEffect(() => {

    const subscription = playerStart.addListener(
      'playToEnd',
      () => {
        onIniciar?.();
      }
    );

    return () => subscription.remove();

  }, [playerStart, onIniciar]);

  // =================================
  // APERTAR PLAY
  // =================================

  function iniciar() {

    if (animando) return;

    setAnimando(true);

    playerStart.pause();
    playerStart.currentTime = 0;
    playerStart.play();

  }

  // =================================
  // INTERFACE
  // =================================

  return (

    <View style={[Styles.penseBem, { position: 'relative' }]}>

      {/* STARTANIM (fica carregada e invisível até apertar o play) */}

      <VideoView
        player={playerStart}
        style={[
          Styles.computerAnim,
          {
            opacity: animando ? 1 : 0,
            position: animando ? 'relative' : 'absolute',
          }
        ]}
        contentFit="contain"
        nativeControls={false}
        allowsFullscreen={false}
      />

      {/* APARELHO PEQUENO PARADO */}

      {!animando && (

        <Image
          source={require('../assets/PBStartStill.png')}
          style={Styles.computer}
          resizeMode="contain"
          fadeDuration={0}
        />

      )}

      {/* PRESSABLE INVISÍVEL SOBRE O BOTÃO VERDE DE PLAY */}

      {!animando && (

        <Pressable
          onPress={iniciar}
          style={Styles.startButton}
        />

      )}

    </View>

  );

}

export default ModoStart;
