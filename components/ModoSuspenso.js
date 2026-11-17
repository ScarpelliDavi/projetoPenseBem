
import React, { useState, useEffect } from 'react';
import { View, Pressable, Platform } from 'react-native';
import { VideoView, useVideoPlayer } from 'expo-video';

import Styles from '../Styles';

function ModoSuspenso({ modo, onEstadoChange }) {

  const [estado, setEstado] = useState('ligado');

  // Detectar sistema operacional
  const isIOS = Platform.OS === 'ios';

  // Selecionar animações conforme o sistema
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

  // Players do ModoQuiz
  const goingABC = useVideoPlayer(
    animations.goingABC,
    (player) => {
      player.loop = false;
      player.muted = false;
    }
  );

  const sleepingABC = useVideoPlayer(
    animations.sleepingABC,
    (player) => {
      player.loop = true;
      player.muted = false;
    }
  );

  const wakingABC = useVideoPlayer(
    animations.wakingABC,
    (player) => {
      player.loop = false;
      player.muted = false;
    }
  );

  // Players do ModoLivro
  const goingBook = useVideoPlayer(
    animations.goingBook,
    (player) => {
      player.loop = false;
      player.muted = false;
    }
  );

  const sleepingBook = useVideoPlayer(
    animations.sleepingBook,
    (player) => {
      player.loop = true;
      player.muted = false;
    }
  );

  const wakingBook = useVideoPlayer(
    animations.wakingBook,
    (player) => {
      player.loop = false;
      player.muted = false;
    }
  );

  // Identificar os players do modo atual
  const playerGoing = modo === 'quiz'
    ? goingABC
    : goingBook;

  const playerSleeping = modo === 'quiz'
    ? sleepingABC
    : sleepingBook;

  const playerWaking = modo === 'quiz'
    ? wakingABC
    : wakingBook;

  // Estilos dos botões
  const estiloBotaoDesligar = modo === 'quiz'
    ? Styles.onOffButton
    : Styles.onOffButtonLivro;

  const estiloBotaoAcordar = modo === 'quiz'
    ? Styles.onOffB2
    : Styles.onOffB2Livro;

  // Avisar ao componente principal se está suspenso
  useEffect(() => {
    onEstadoChange(estado !== 'ligado');
  }, [estado, onEstadoChange]);

  // Iniciar automaticamente a animação correspondente
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

  // Detectar término das animações de desligamento
  useEffect(() => {

    const subscriptionABC = goingABC.addListener(
      'playToEnd',
      () => {
        if (modo !== 'quiz') return;

        setEstado((atual) =>
          atual === 'dormindo' ? 'suspenso' : atual
        );
      }
    );

    const subscriptionBook = goingBook.addListener(
      'playToEnd',
      () => {
        if (modo !== 'livro') return;

        setEstado((atual) =>
          atual === 'dormindo' ? 'suspenso' : atual
        );
      }
    );

    return () => {
      subscriptionABC.remove();
      subscriptionBook.remove();
    };

  }, [modo, goingABC, goingBook]);

  // Detectar término das animações de inicialização
  useEffect(() => {

    const subscriptionABC = wakingABC.addListener(
      'playToEnd',
      () => {
        if (modo !== 'quiz') return;

        setEstado((atual) =>
          atual === 'acordando' ? 'ligado' : atual
        );
      }
    );

    const subscriptionBook = wakingBook.addListener(
      'playToEnd',
      () => {
        if (modo !== 'livro') return;

        setEstado((atual) =>
          atual === 'acordando' ? 'ligado' : atual
        );
      }
    );

    return () => {
      subscriptionABC.remove();
      subscriptionBook.remove();
    };

  }, [modo, wakingABC, wakingBook]);

  // Botão de desligar e acordar
  function pressionarDesligar() {

    if (estado === 'ligado') {
      setEstado('dormindo');
      return;
    }

    if (estado === 'suspenso') {
      setEstado('acordando');
    }

  }

  // Selecionar animação atual
  const playerAtual = estado === 'dormindo'
    ? playerGoing
    : estado === 'suspenso'
      ? playerSleeping
      : estado === 'acordando'
        ? playerWaking
        : null;

  // Computador funcionando normalmente
  if (estado === 'ligado') {

    return (
      <View
        pointerEvents="box-none"
        style={Styles.penseBem}
      >

        <Pressable
          onPress={pressionarDesligar}
          style={estiloBotaoDesligar}
        />

      </View>
    );

  }

  // Computador desligando, dormindo ou acordando
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
          style={estiloBotaoAcordar}
        />
      )}

    </View>
  );
}

export default ModoSuspenso;
