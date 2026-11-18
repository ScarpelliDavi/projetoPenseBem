
import React, { useState, useEffect } from 'react';
import { View, Image, Pressable, Text, Platform } from 'react-native';
import { VideoView, useVideoPlayer } from 'expo-video';
import { useFonts } from 'expo-font';

import Styles from '../Styles';
import ListasPergunta from '../ListaPerguntas';

// =================================
// ANIMAÇÕES (iOS usa .mov; Android e web usam .webm)
// =================================

const isIOS = Platform.OS === 'ios';

const animations = isIOS
  ? {
      bookFound: require('../assets/animations/iOS/BookFound.mov'),
      bookToABC: require('../assets/animations/iOS/BooktoABC.mov'),
      whatBook: require('../assets/animations/iOS/WhatBook.mov'),
    }
  : {
      bookFound: require('../assets/animations/BookFound.webm'),
      bookToABC: require('../assets/animations/BooktoABC.webm'),
      whatBook: require('../assets/animations/WhatBook.webm'),
    };

function ModoLivro({
  onTransicaoIniciada,
  onLivroSelecionado,
  onVoltarQuiz,
}) {

  // =================================
  // FONTES
  // =================================

  const [fontsLoaded] = useFonts({
    Digital: require('../assets/fonts/digital-7 (mono).ttf'),
  });

  // =================================
  // ESTADOS
  // =================================

  const [estado, setEstado] = useState('NoBookSelected');

  const [numeroDigitado, setNumeroDigitado] = useState('');
  const [livroSelecionado, setLivroSelecionado] = useState(false);
  const [codigoConfirmado, setCodigoConfirmado] = useState(null);

  // =================================
  // PLAYER BOOKFOUND
  // =================================

  const playerBookFound = useVideoPlayer(
    animations.bookFound,
    player => {
      player.loop = false;
      player.muted = false;
    }
  );

  // =================================
  // PLAYER BOOKTOABC
  // =================================

  const playerBookToABC = useVideoPlayer(
    animations.bookToABC,
    player => {
      player.loop = false;
      player.muted = false;
    }
  );

  // =================================
  // PLAYER WHATBOOK
  // =================================

  const playerErro = useVideoPlayer(
    animations.whatBook,
    player => {
      player.loop = false;
      player.muted = false;
    }
  );

  // =================================
  // FINAL BOOKFOUND
  // =================================

  useEffect(() => {

    const subscription = playerBookFound.addListener(
      'playToEnd',
      () => {

        if (codigoConfirmado !== null) {
          onLivroSelecionado?.(codigoConfirmado);
        }

      }
    );

    return () => subscription.remove();

  }, [playerBookFound, codigoConfirmado, onLivroSelecionado]);

  // =================================
  // FINAL BOOKTOABC
  // =================================

  useEffect(() => {

    const subscription = playerBookToABC.addListener(
      'playToEnd',
      () => {

        setNumeroDigitado('');
        setLivroSelecionado(false);
        setCodigoConfirmado(null);
        setEstado('NoBookSelected');

        // RETORNAR AO MODOQUIZ
        onVoltarQuiz?.();

      }
    );

    return () => subscription.remove();

  }, [playerBookToABC, onVoltarQuiz]);

  // =================================
  // FINAL WHATBOOK
  // =================================

  useEffect(() => {

    const subscription = playerErro.addListener(
      'playToEnd',
      () => {

        setEstado('NoBookSelected');
        setNumeroDigitado('');
        setLivroSelecionado(false);

      }
    );

    return () => subscription.remove();

  }, [playerErro]);

  // =================================
  // EXECUTAR BOOKTOABC
  // =================================

  function executarBookToABC() {

    if (estado !== 'NoBookSelected') return;

    setEstado('BookToABC');

    playerBookToABC.pause();
    playerBookToABC.currentTime = 0;
    playerBookToABC.play();

  }

  // =================================
  // ADICIONAR NÚMERO
  // =================================

  function adicionarNumero(numero) {

    if (
      numeroDigitado.length >= 3 ||
      estado !== 'NoBookSelected'
    ) return;

    setLivroSelecionado(true);

    setNumeroDigitado(atual => atual + numero);

  }

  // =================================
  // VERIFICAR RESPOSTA
  // =================================

  function verificarResposta(numero) {

    const perguntaExiste = Object.prototype.hasOwnProperty.call(
      ListasPergunta,
      numero
    );

    if (perguntaExiste) {

      setCodigoConfirmado(numero);
      setEstado('BookFound');

      onTransicaoIniciada?.();

      playerBookFound.pause();
      playerBookFound.currentTime = 0;
      playerBookFound.play();

    } else {

      setEstado('WhatBook');

      playerErro.pause();
      playerErro.currentTime = 0;
      playerErro.play();

    }

  }

  // =================================
  // ENTER
  // =================================

  function pressionarEnter() {

    if (
      numeroDigitado.length !== 3 ||
      estado !== 'NoBookSelected'
    ) return;

    verificarResposta(numeroDigitado);

  }

  // =================================
  // ESTADOS DAS ANIMAÇÕES
  // =================================

  const animandoBookToABC = estado === 'BookToABC';
  const animandoBookFound = estado === 'BookFound';
  const animandoErro = estado === 'WhatBook';

  // =================================
  // INTERFACE
  // =================================

  return (

    <View style={[Styles.penseBem, { position: 'relative' }]}>

      {/* BOOKTOABC */}

      <VideoView
        player={playerBookToABC}
        style={[
          Styles.computerAnim,
          {
            opacity: animandoBookToABC ? 1 : 0,
            position: animandoBookToABC ? 'relative' : 'absolute',
          }
        ]}
        contentFit="contain"
        nativeControls={false}
        allowsFullscreen={false}
      />

      {/* BOOKFOUND */}

      <VideoView
        player={playerBookFound}
        style={[
          Styles.computerAnim,
          {
            opacity: animandoBookFound ? 1 : 0,
            position: animandoBookFound ? 'relative' : 'absolute',
          }
        ]}
        contentFit="contain"
        nativeControls={false}
        allowsFullscreen={false}
      />

      {/* WHATBOOK */}

      <VideoView
        player={playerErro}
        style={[
          Styles.computerAnim,
          {
            opacity: animandoErro ? 1 : 0,
            position: animandoErro ? 'relative' : 'absolute',
          }
        ]}
        contentFit="contain"
        nativeControls={false}
        allowsFullscreen={false}
      />

      {/* COMPUTADOR */}

      {!animandoBookToABC &&
       !animandoBookFound &&
       !animandoErro && (

        <Image
          source={
            livroSelecionado
              ? require('../assets/PBBook.png')
              : require('../assets/PBBSmile.png')
          }
          style={Styles.computer}
          resizeMode="contain"
          fadeDuration={0}
        />

      )}

      {/* PRESSABLE INVISÍVEL BOOKTOABC */}

      {estado === 'NoBookSelected' && (

        <Pressable
          style={Styles.quizButton}
          onPress={executarBookToABC}
        />

      )}

      {/* VISOR E TECLADO */}

      {estado === 'NoBookSelected' && (

        <>

          <View style={Styles.visorBook}>
            <Text style={Styles.textVisorBook}>
              {numeroDigitado}
            </Text>
          </View>

          <Pressable style={Styles.num1} onPress={() => adicionarNumero('1')} />
          <Pressable style={Styles.num2} onPress={() => adicionarNumero('2')} />
          <Pressable style={Styles.num3} onPress={() => adicionarNumero('3')} />
          <Pressable style={Styles.num4} onPress={() => adicionarNumero('4')} />
          <Pressable style={Styles.num5} onPress={() => adicionarNumero('5')} />
          <Pressable style={Styles.num6} onPress={() => adicionarNumero('6')} />
          <Pressable style={Styles.num7} onPress={() => adicionarNumero('7')} />
          <Pressable style={Styles.num8} onPress={() => adicionarNumero('8')} />
          <Pressable style={Styles.num9} onPress={() => adicionarNumero('9')} />
          <Pressable style={Styles.num0} onPress={() => adicionarNumero('0')} />

          <Pressable
            style={Styles.enter1}
            onPress={pressionarEnter}
          />

        </>

      )}

    </View>

  );

}

export default ModoLivro;
