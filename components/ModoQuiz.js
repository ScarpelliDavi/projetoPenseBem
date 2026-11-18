
import React, { useState, useEffect } from 'react';
import { View, Image, Pressable, Text } from 'react-native';
import { VideoView, useVideoPlayer } from 'expo-video';

import Styles from '../Styles';
import ListasPergunta from '../ListaPerguntas';

function ModoQuiz({ codigoLivro, onAbrirLivro }) {

  const [modoQuiz, setModoQuiz] = useState('NoBookSelected');
  const [animando, setAnimando] = useState(false);

  const [indicePergunta, setIndicePergunta] = useState(0);
  const [tentativas, setTentativas] = useState(0);
  const [animacaoResposta, setAnimacaoResposta] = useState(null);
  const [pontuacao, setPontuacao] = useState(0);
  const [quizFinalizado, setQuizFinalizado] = useState(false);

  const player = useVideoPlayer(
    require('../assets/animations/ABCtoBook.webm'),
    player => {
      player.loop = false;
      player.muted = false;
    }
  );

  const playerWrong = useVideoPlayer(
    require('../assets/animations/WrongAnswer.webm'),
    player => {
      player.loop = false;
      player.muted = false;
    }
  );

  const playerAllWrong = useVideoPlayer(
    require('../assets/animations/AllAnswersWrong.webm'),
    player => {
      player.loop = false;
      player.muted = false;
    }
  );

  const playerRight = useVideoPlayer(
    require('../assets/animations/RightAnswer.webm'),
    player => {
      player.loop = false;
      player.muted = false;
    }
  );

  const perguntas = codigoLivro != null
    ? ListasPergunta[String(codigoLivro)]
    : null;

  const perguntaAtual = perguntas?.[indicePergunta];

  const playerAnimacao =
    animacaoResposta === 'errada'
      ? playerWrong
      : animacaoResposta === 'todasErradas'
        ? playerAllWrong
        : animacaoResposta === 'correta'
          ? playerRight
          : null;

  // FINAL ABC TO BOOK

  useEffect(() => {

    const subscription = player.addListener(
      'playToEnd',
      () => {
        setAnimando(false);
        onAbrirLivro?.();
      }
    );

    return () => subscription.remove();

  }, [player, onAbrirLivro]);

  // RECEBER LIVRO

  useEffect(() => {

    if (codigoLivro == null) {
      setModoQuiz('NoBookSelected');
    } else {
      setModoQuiz('Quiz');
    }

    setIndicePergunta(0);
    setTentativas(0);
    setPontuacao(0);
    setAnimacaoResposta(null);
    setQuizFinalizado(false);

  }, [codigoLivro]);

  // ABRIR LIVRO

  function abrirLivro() {

    if (animando || animacaoResposta !== null) return;

    setAnimando(true);

    player.pause();
    player.currentTime = 0;
    player.play();

  }

  // EXECUTAR ANIMAÇÃO

  function executarAnimacao(tipo) {

    [playerWrong, playerAllWrong, playerRight].forEach(p => {
      p.pause();
      p.currentTime = 0;
    });

    setAnimacaoResposta(tipo);
  }

  // AUTOPLAY

  useEffect(() => {

    if (!animacaoResposta || !playerAnimacao) return;

    async function iniciarAnimacao() {
      try {
        playerAnimacao.pause();
        playerAnimacao.currentTime = 0;
        await playerAnimacao.play();
      } catch (error) {
        console.log('Erro ao iniciar animação:', error);
      }
    }

    iniciarAnimacao();

  }, [animacaoResposta, playerAnimacao]);

  // AVANÇAR PERGUNTA

  function avancarPergunta() {

    if (!perguntas) return;

    if (indicePergunta < perguntas.length - 1) {
      setIndicePergunta(atual => atual + 1);
      setTentativas(0);
    } else {
      setQuizFinalizado(true);
    }

    setAnimacaoResposta(null);
  }

  // SELECIONAR RESPOSTA

  function selecionarResposta(letra) {

    if (
      modoQuiz !== 'Quiz' ||
      !perguntaAtual ||
      animacaoResposta !== null ||
      quizFinalizado ||
      animando
    ) return;

    const novasTentativas = tentativas + 1;
    setTentativas(novasTentativas);

    if (letra === perguntaAtual.correta) {

      const pontos = 4 - novasTentativas;
      setPontuacao(atual => atual + pontos);

      executarAnimacao('correta');
      return;
    }

    if (novasTentativas >= 3) {
      executarAnimacao('todasErradas');
      return;
    }

    executarAnimacao('errada');
  }

  // FINAL DAS ANIMAÇÕES

  useEffect(() => {

    if (!animacaoResposta || !playerAnimacao) return;

    const subscription = playerAnimacao.addListener(
      'playToEnd',
      () => {

        if (
          animacaoResposta === 'correta' ||
          animacaoResposta === 'todasErradas'
        ) {
          avancarPergunta();
        } else {
          setAnimacaoResposta(null);
        }

      }
    );

    return () => subscription.remove();

  }, [animacaoResposta, playerAnimacao, indicePergunta, perguntas]);

  const noBookSelected = modoQuiz === 'NoBookSelected';

  const quizAtivo =
    modoQuiz === 'Quiz' &&
    !animando &&
    animacaoResposta === null &&
    codigoLivro != null &&
    perguntaAtual &&
    !quizFinalizado;

  return (

    <View style={[Styles.penseBem, { position: 'relative' }]}>

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

      {!animando && animacaoResposta === null && (
        <Image
          source={
            noBookSelected
              ? require('../assets/PBStillSmile.png')
              : require('../assets/PBStill.png')
          }
          style={Styles.computer}
          resizeMode="contain"
          fadeDuration={0}
        />
      )}

      {!animando && animacaoResposta === null && (
        <Pressable
          onPress={abrirLivro}
          style={Styles.bookButton}
        />
      )}

      {quizAtivo && (
        <>

          <View style={Styles.quizVisor}>
            <Text style={Styles.numPergunta}>
              {perguntaAtual.numero}
            </Text>
          </View>

          <Pressable onPress={() => selecionarResposta('A')} style={Styles.buttonA} />
          <Pressable onPress={() => selecionarResposta('B')} style={Styles.buttonB} />
          <Pressable onPress={() => selecionarResposta('C')} style={Styles.buttonC} />
          <Pressable onPress={() => selecionarResposta('D')} style={Styles.buttonD} />

          <Text style={Styles.contadorErros}>
            {tentativas + 1}
          </Text>

          <Text style={Styles.pontuacao}>
            {pontuacao}
          </Text>

        </>
      )}

      {animacaoResposta !== null && (
        <View style={Styles.computer}>
          <VideoView
            key={animacaoResposta}
            player={playerAnimacao}
            style={Styles.computerAnim}
            contentFit="contain"
            nativeControls={false}
            allowsFullscreen={false}
          />
        </View>
      )}

      {quizFinalizado && (
        <View style={Styles.quizContainer}>
          <Text style={Styles.numeroPergunta}>
            PARABÉNS!
          </Text>

          <Text style={Styles.pontuacaoFinal}>
            Pontuação: {pontuacao}
          </Text>
        </View>
      )}

    </View>
  );
}

export default ModoQuiz;
