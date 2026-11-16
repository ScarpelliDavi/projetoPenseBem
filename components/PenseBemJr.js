
import React, { useState, useEffect } from 'react';
import { View, Image, Pressable, Text } from 'react-native';
import { VideoView, useVideoPlayer } from 'expo-video';
import { useFonts } from 'expo-font';

import Styles from '../Styles';
import ListasPergunta from '../ListaPerguntas';

function PenseBemJr() {
  const [fontsLoaded] = useFonts({
    Digital: require('../assets/fonts/digital-7 (mono).ttf'),
  });

  const [animando, setAnimando] = useState(false);
  const [animandoVolta, setAnimandoVolta] = useState(false);
  const [finalizada, setFinalizada] = useState(false);

  // Estado do visor
  const [numeroDigitado, setNumeroDigitado] = useState('');

  // Estado da imagem do livro
  const [livroSelecionado, setLivroSelecionado] = useState(false);

  // Estado para controlar a imagem após o retorno
  const [retornoConcluido, setRetornoConcluido] = useState(false);

  // Player ABC para Livro
  const player = useVideoPlayer(
    require('../assets/animations/ABCtoBook.webm'),
    (player) => {
      player.loop = false;
      player.muted = false;
    }
  );

  // Player Livro para ABC
  const playerVolta = useVideoPlayer(
    require('../assets/animations/BooktoABC.webm'),
    (player) => {
      player.loop = false;
      player.muted = false;
    }
  );

  // Detectar término da animação ABC para Livro
  useEffect(() => {
    const subscription = player.addListener('playToEnd', () => {
      setAnimando(false);
      setFinalizada(true);
    });

    return () => subscription.remove();
  }, [player]);

  // Detectar término da animação Livro para ABC
  useEffect(() => {
    const subscription = playerVolta.addListener('playToEnd', () => {
      setAnimandoVolta(false);
      setFinalizada(false);
      setLivroSelecionado(false);
      setNumeroDigitado('');

      // Exibir PBStill.png após o retorno
      setRetornoConcluido(true);
    });

    return () => subscription.remove();
  }, [playerVolta]);

  // Iniciar animação ABC para Livro
  function initAnim() {
    if (animando || finalizada || animandoVolta) return;

    setRetornoConcluido(false);

    player.pause();
    player.currentTime = 0;
    player.play();

    setAnimando(true);
  }

  // Adicionar número ao visor
  function adicionarNumero(numero) {
    if (numeroDigitado.length >= 3 || animandoVolta) return;

    setLivroSelecionado(true);

    setNumeroDigitado((atual) => atual + numero);
  }

  // Limpar visor
  function limparVisor() {
    setNumeroDigitado('');
  }

  // Verificar código digitado
  function verificarResposta(numero) {
    const perguntaExiste = Object.prototype.hasOwnProperty.call(
      ListasPergunta,
      numero
    );

    if (perguntaExiste) {
      console.log('Código encontrado:', numero);

      // Iniciar animação Livro para ABC
      playerVolta.pause();
      playerVolta.currentTime = 0;
      playerVolta.play();

      setAnimandoVolta(true);

    } else {
      console.log('Código não encontrado:', numero);

      setNumeroDigitado('');
    }
  }

  // Botão ENTER
  function pressionarEnter() {
    if (numeroDigitado.length !== 3 || animandoVolta) return;

    console.log('Código selecionado:', numeroDigitado);

    verificarResposta(numeroDigitado);
  }

  return (
    <View style={[Styles.penseBem, { position: 'relative' }]}>

      {/* Animação ABC para Livro */}
      <VideoView
        player={player}
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

      {/* Imagens do computador */}
      {!animando && !animandoVolta && (
        <Image
          source={
            retornoConcluido
              ? require('../assets/PBStill.png')
              : livroSelecionado
                ? require('../assets/PBBook.png')
                : finalizada
                  ? require('../assets/PBBSmile.png')
                  : require('../assets/PBStillSmile.png')
          }
          style={Styles.computer}
          resizeMode="contain"
          fadeDuration={0}
        />
      )}

      {/* Botão Invisível: Livro */}
      {!animando && !finalizada && !animandoVolta && (
        <Pressable
          onPress={initAnim}
          style={Styles.bookButton}
        />
      )}

      {/* Visor e teclado */}
      {finalizada && !animandoVolta && (
        <>
          {/* Visor */}
          <View style={Styles.visorBook}>
            <Text style={Styles.textVisorBook}>
              {numeroDigitado}
            </Text>
          </View>

          {/* Teclado numérico */}
          <Pressable
            style={Styles.num1}
            onPress={() => adicionarNumero('1')}
          />

          <Pressable
            style={Styles.num2}
            onPress={() => adicionarNumero('2')}
          />

          <Pressable
            style={Styles.num3}
            onPress={() => adicionarNumero('3')}
          />

          <Pressable
            style={Styles.num4}
            onPress={() => adicionarNumero('4')}
          />

          <Pressable
            style={Styles.num5}
            onPress={() => adicionarNumero('5')}
          />

          <Pressable
            style={Styles.num6}
            onPress={() => adicionarNumero('6')}
          />

          <Pressable
            style={Styles.num7}
            onPress={() => adicionarNumero('7')}
          />

          <Pressable
            style={Styles.num8}
            onPress={() => adicionarNumero('8')}
          />

          <Pressable
            style={Styles.num9}
            onPress={() => adicionarNumero('9')}
          />

          <Pressable
            style={Styles.num0}
            onPress={() => adicionarNumero('0')}
          />

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

export default PenseBemJr;
