
import React, { useState, useEffect } from 'react';
import { View, Image, Pressable, Text } from 'react-native';
import { VideoView, useVideoPlayer } from 'expo-video';
import { useFonts } from 'expo-font';

import Styles from '../Styles';
import ListasPergunta from '../ListaPerguntas';

function ModoLivro({ onLivroSelecionado }) {

  const [fontsLoaded] = useFonts({
    Digital: require('../assets/fonts/digital-7 (mono).ttf'),
  });

  const [finalizada] = useState(true);

  const [animandoVolta, setAnimandoVolta] = useState(false);
  const [animandoErro, setAnimandoErro] = useState(false);

  const [numeroDigitado, setNumeroDigitado] = useState('');
  const [livroSelecionado, setLivroSelecionado] = useState(false);

  const [codigoConfirmado, setCodigoConfirmado] = useState(null);

  // Player Livro para ABC
  const playerVolta = useVideoPlayer(
    require('../assets/animations/BooktoABC.webm'),
    (player) => {
      player.loop = false;
      player.muted = false;
    }
  );

  // Player de código inexistente
  const playerErro = useVideoPlayer(
    require('../assets/animations/WhatBook.webm'),
    (player) => {
      player.loop = false;
      player.muted = false;
    }
  );

  // Detectar término da animação Livro para ABC
  useEffect(() => {
    const subscription = playerVolta.addListener('playToEnd', () => {

      setAnimandoVolta(false);
      setLivroSelecionado(false);
      setNumeroDigitado('');

      if (codigoConfirmado !== null) {
        onLivroSelecionado(codigoConfirmado);
      }

    });

    return () => subscription.remove();
  }, [playerVolta, codigoConfirmado, onLivroSelecionado]);

  // Detectar término da animação WhatBook
  useEffect(() => {
    const subscription = playerErro.addListener('playToEnd', () => {

      setAnimandoErro(false);

      // Limpar o visor somente após a animação terminar
      setNumeroDigitado('');

      // Voltar à imagem inicial
      setLivroSelecionado(false);

    });

    return () => subscription.remove();
  }, [playerErro]);

  // Adicionar número ao visor
  function adicionarNumero(numero) {
    if (
      numeroDigitado.length >= 3 ||
      animandoVolta ||
      animandoErro ||
      codigoConfirmado !== null
    ) return;

    setLivroSelecionado(true);

    setNumeroDigitado((atual) => atual + numero);
  }

  // Limpar visor
  function limparVisor() {
    if (
      animandoVolta ||
      animandoErro ||
      codigoConfirmado !== null
    ) return;

    setNumeroDigitado('');
    setLivroSelecionado(false);
  }

  // Verificar código digitado
  function verificarResposta(numero) {

    const perguntaExiste = Object.prototype.hasOwnProperty.call(
      ListasPergunta,
      numero
    );

    if (perguntaExiste) {

      console.log('Livro encontrado:', numero);

      setCodigoConfirmado(numero);

      playerVolta.pause();
      playerVolta.currentTime = 0;
      playerVolta.play();

      setAnimandoVolta(true);

    } else {

      console.log('Livro não encontrado:', numero);

      // Iniciar animação WhatBook
      playerErro.pause();
      playerErro.currentTime = 0;
      playerErro.play();

      setAnimandoErro(true);
    }
  }

  // Botão ENTER
  function pressionarEnter() {
    if (
      numeroDigitado.length !== 3 ||
      animandoVolta ||
      animandoErro ||
      codigoConfirmado !== null
    ) return;

    verificarResposta(numeroDigitado);
  }

  return (
    <View style={[Styles.penseBem, { position: 'relative' }]}>

      {/* Animação Livro para ABC */}
      <VideoView
        player={playerVolta}
        style={[
          Styles.computerAnim,
          {
            opacity: animandoVolta ? 1 : 0,
            position: animandoVolta ? 'relative' : 'absolute',
          }
        ]}
        contentFit="contain"
        nativeControls={false}
        allowsFullscreen={false}
      />

      {/* Animação de código inexistente */}
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

      {/* Imagens do computador */}
      {!animandoVolta && !animandoErro && (
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

      {/* Visor e teclado */}
      {finalizada && !animandoVolta && !animandoErro && (
        <>
          {/* Visor */}
          <View style={Styles.visorBook}>
            <Text style={Styles.textVisorBook}>
              {numeroDigitado}
            </Text>
          </View>

          {/* Teclado numérico */}
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

          {/* Botão ENTER */}
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
