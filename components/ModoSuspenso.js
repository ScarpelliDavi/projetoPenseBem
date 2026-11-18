
import React, { useState, useEffect } from 'react';

import {
  View,
  Pressable,
  Platform,
} from 'react-native';

import {
  VideoView,
  useVideoPlayer,
} from 'expo-video';

import Styles from '../Styles';

function ModoSuspenso({
  modo,
  onEstadoChange,
  bloqueado = false,
}) {

  const [estado, setEstado] = useState('ligado');

  // =================================
  // SISTEMA OPERACIONAL
  // =================================

  const isIOS = Platform.OS === 'ios';

  const animations = isIOS
    ? {
        goingABC: require('../assets/animations/iOS/GoingSleepABC.mov'),
        sleepingABC: require('../assets/animations/iOS/SleepingABC.mov'),
        wakingABC: require('../assets/animations/iOS/WakingUpABC.mov'),

        goingBook: require('../assets/animations/iOS/GoingSleepBook.mov'),
        sleepingBook: require('../assets/animations/iOS/SleepingBook.mov'),
        wakingBook: require('../assets/animations/iOS/WakingUpBook.mov'),
      }
    : {
        goingABC: require('../assets/animations/Android/GoingSleepABC.webm'),
        sleepingABC: require('../assets/animations/Android/SleepingABC.webm'),
        wakingABC: require('../assets/animations/Android/WakingUpABC.webm'),

        goingBook: require('../assets/animations/Android/GoingSleepBook.webm'),
        sleepingBook: require('../assets/animations/Android/SleepingBook.webm'),
        wakingBook: require('../assets/animations/Android/WakingUpBook.webm'),
      };

  // =================================
  // PLAYERS QUIZ
  // =================================

  const goingABC = useVideoPlayer(
    animations.goingABC,
    player => {
      player.loop = false;
      player.muted = false;
    }
  );

  const sleepingABC = useVideoPlayer(
    animations.sleepingABC,
    player => {
      player.loop = true;
      player.muted = false;
    }
  );

  const wakingABC = useVideoPlayer(
    animations.wakingABC,
    player => {
      player.loop = false;
      player.muted = false;
    }
  );

  // =================================
  // PLAYERS LIVRO
  // =================================

  const goingBook = useVideoPlayer(
    animations.goingBook,
    player => {
      player.loop = false;
      player.muted = false;
    }
  );

  const sleepingBook = useVideoPlayer(
    animations.sleepingBook,
    player => {
      player.loop = true;
      player.muted = false;
    }
  );

  const wakingBook = useVideoPlayer(
    animations.wakingBook,
    player => {
      player.loop = false;
      player.muted = false;
    }
  );

  // =================================
  // SELECIONAR PLAYERS
  // =================================

  const playerGoing = modo === 'quiz'
    ? goingABC
    : goingBook;

  const playerSleeping = modo === 'quiz'
    ? sleepingABC
    : sleepingBook;

  const playerWaking = modo === 'quiz'
    ? wakingABC
    : wakingBook;

  // =================================
  // BOTÕES
  // =================================

  const estiloBotaoDesligar = modo === 'quiz'
    ? Styles.onOffButton
    : Styles.onOffButtonLivro;

  const estiloBotaoAcordar = modo === 'quiz'
    ? Styles.onOffB2
    : Styles.onOffB2Livro;

  // =================================
  // COMUNICAR ESTADO
  // =================================

  useEffect(() => {

    onEstadoChange?.(estado !== 'ligado');

  }, [estado, onEstadoChange]);

  // =================================
  // EXECUTAR ANIMAÇÕES
  // =================================

  useEffect(() => {

    if (estado === 'dormindo') {

      playerGoing.pause();
      playerGoing.currentTime = 0;
      playerGoing.play();

    }

    if (estado === 'suspenso') {

      playerSleeping.pause();
      playerSleeping.currentTime = 0;
      playerSleeping.play();

    }

    if (estado === 'acordando') {

      playerSleeping.pause();

      playerWaking.pause();
      playerWaking.currentTime = 0;
      playerWaking.play();

    }

  }, [estado, modo]);

  // =================================
  // FINAL DO DESLIGAMENTO
  // =================================

  useEffect(() => {

    const subscriptionABC = goingABC.addListener(
      'playToEnd',
      () => {

        if (modo !== 'quiz') return;

        setEstado(atual =>
          atual === 'dormindo' ? 'suspenso' : atual
        );

      }
    );

    const subscriptionBook = goingBook.addListener(
      'playToEnd',
      () => {

        if (modo !== 'livro') return;

        setEstado(atual =>
          atual === 'dormindo' ? 'suspenso' : atual
        );

      }
    );

    return () => {
      subscriptionABC.remove();
      subscriptionBook.remove();
    };

  }, [modo, goingABC, goingBook]);

  // =================================
  // FINAL DA INICIALIZAÇÃO
  // =================================

  useEffect(() => {

    const subscriptionABC = wakingABC.addListener(
      'playToEnd',
      () => {

        if (modo !== 'quiz') return;

        setEstado(atual =>
          atual === 'acordando' ? 'ligado' : atual
        );

      }
    );

    const subscriptionBook = wakingBook.addListener(
      'playToEnd',
      () => {

        if (modo !== 'livro') return;

        setEstado(atual =>
          atual === 'acordando' ? 'ligado' : atual
        );

      }
    );

    return () => {
      subscriptionABC.remove();
      subscriptionBook.remove();
    };

  }, [modo, wakingABC, wakingBook]);

  // =================================
  // BOTÃO DESLIGAR / ACORDAR
  // =================================

  function pressionarDesligar() {

    if (bloqueado) return;

    if (estado === 'ligado') {

      setEstado('dormindo');
      return;

    }

    if (estado === 'suspenso') {

      setEstado('acordando');

    }

  }

  // =================================
  // PLAYER ATUAL
  // =================================

  const playerAtual = estado === 'dormindo'
    ? playerGoing
    : estado === 'suspenso'
      ? playerSleeping
      : estado === 'acordando'
        ? playerWaking
        : null;

  // =================================
  // COMPUTADOR LIGADO
  // =================================

  if (estado === 'ligado') {

    return (

      <View
        pointerEvents="box-none"
        style={Styles.penseBem}
      >

        <Pressable
          onPress={pressionarDesligar}
          disabled={bloqueado}
          style={estiloBotaoDesligar}
        />

      </View>

    );

  }

  // =================================
  // COMPUTADOR SUSPENSO
  // =================================

  return (

    <View
      pointerEvents="auto"
      style={Styles.penseBemDormindo}
    >

      <VideoView
        player={playerAtual}
        style={Styles.computerAnim}
        contentFit="contain"
        nativeControls={false}
        allowsFullscreen={false}
      />

      {estado === 'suspenso' && (

        <Pressable
          onPress={pressionarDesligar}
          disabled={bloqueado}
          style={estiloBotaoAcordar}
        />

      )}

    </View>

  );

}

export default ModoSuspenso;
