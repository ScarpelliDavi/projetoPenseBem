
import React, { useState, useEffect } from 'react';
import { View, Image, Pressable, Text } from 'react-native';
import { VideoView, useVideoPlayer } from 'expo-video';

import Styles from '../Styles';
import ListasPergunta from '../ListaPerguntas';

function ModoQuiz({ codigoLivro, onAbrirLivro }) {

  const [animando, setAnimando] = useState(false);

  // Controle das perguntas
  const [indicePergunta, setIndicePergunta] = useState(0);

  // Controle das tentativas
  const [tentativas, setTentativas] = useState(0);

  // Controle das animações
  const [animacaoResposta, setAnimacaoResposta] = useState(null);

  // Controle da pontuação
  const [pontuacao, setPontuacao] = useState(0);

  // Finalização do Quiz
  const [quizFinalizado, setQuizFinalizado] = useState(false);

  // Player ABC para Livro
  const player = useVideoPlayer(
    require('../assets/animations/ABCtoBook.webm'),
    (player) => {
      player.loop = false;
      player.muted = false;
    }
  );

  // Player de resposta errada
  const playerWrong = useVideoPlayer(
    require('../assets/animations/WrongAnswer.webm'),
    (player) => {
      player.loop = false;
      player.muted = false;
    }
  );

  // Player de todas as respostas erradas
  const playerAllWrong = useVideoPlayer(
    require('../assets/animations/AllAnswersWrong.webm'),
    (player) => {
      player.loop = false;
      player.muted = false;
    }
  );

  // Player de resposta correta
  const playerRight = useVideoPlayer(
    require('../assets/animations/RightAnswer.webm'),
    (player) => {
      player.loop = false;
      player.muted = false;
    }
  );

  // Perguntas do livro selecionado
  const perguntas = codigoLivro !== null
    ? ListasPergunta[String(codigoLivro)]
    : null;

  const perguntaAtual = perguntas?.[indicePergunta];

  // Identificar player da animação atual
  const playerAnimacao =
    animacaoResposta === 'errada'
      ? playerWrong
      : animacaoResposta === 'todasErradas'
        ? playerAllWrong
        : animacaoResposta === 'correta'
          ? playerRight
          : null;

  // Detectar término da animação ABC
  useEffect(() => {

    const subscription = player.addListener('playToEnd', () => {
      setAnimando(false);
      onAbrirLivro();
    });

    return () => subscription.remove();

  }, [player, onAbrirLivro]);

  // Reiniciar Quiz quando selecionar outro livro
  useEffect(() => {

    setIndicePergunta(0);
    setTentativas(0);
    setPontuacao(0);
    setAnimacaoResposta(null);
    setQuizFinalizado(false);

  }, [codigoLivro]);

  // Abrir livro
  function abrirLivro() {

    if (animando) return;

    player.pause();
    player.currentTime = 0;
    player.play();

    setAnimando(true);
  }

  // Iniciar animação de resposta
  function executarAnimacao(tipo) {

    const players = [
      playerWrong,
      playerAllWrong,
      playerRight
    ];

    players.forEach(p => {
      p.pause();
      p.currentTime = 0;
    });

    setAnimacaoResposta(tipo);
  }

  // Autoplay das animações de resposta
  useEffect(() => {

    if (animacaoResposta === null || !playerAnimacao) return;

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

  // Avançar pergunta
  function avancarPergunta() {

    if (indicePergunta < perguntas.length - 1) {

      setIndicePergunta(atual => atual + 1);
      setTentativas(0);

    } else {

      setQuizFinalizado(true);

    }

    setAnimacaoResposta(null);
  }

  // Selecionar resposta
  function selecionarResposta(letra) {

    if (
      !perguntaAtual ||
      animacaoResposta !== null ||
      quizFinalizado
    ) {
      return;
    }

    const novasTentativas = tentativas + 1;

    setTentativas(novasTentativas);

    // Resposta correta
    if (letra === perguntaAtual.correta) {

      const pontos = 4 - novasTentativas;

      setPontuacao(atual => atual + pontos);

      executarAnimacao('correta');

      return;
    }

    // Terceiro erro
    if (novasTentativas >= 3) {

      executarAnimacao('todasErradas');

      return;
    }

    // Primeiro ou segundo erro
    executarAnimacao('errada');
  }

  // Detectar término das animações de resposta
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

  }, [
    animacaoResposta,
    playerAnimacao,
    indicePergunta,
    perguntas
  ]);

  // Verificar se o Quiz está ativo
  const quizAtivo =
    !animando &&
    animacaoResposta === null &&
    codigoLivro !== null &&
    perguntaAtual &&
    !quizFinalizado;

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

      {/* Imagem do computador */}
      {!animando && animacaoResposta === null && (

        <Image
          source={
            codigoLivro !== null
              ? require('../assets/PBStill.png')
              : require('../assets/PBStillSmile.png')
          }
          style={Styles.computer}
          resizeMode="contain"
          fadeDuration={0}
        />

      )}

      {/* Botão para abrir o modo livro */}
      {!animando && (

        <Pressable
          onPress={abrirLivro}
          style={Styles.bookButton}
        />

      )}

      {/* Elementos do Quiz */}
      {quizAtivo && (

        <>

          {/* Visor */}
          <View style={Styles.quizVisor}>

            <Text style={Styles.numPergunta}>
              {perguntaAtual.numero}
            </Text>

          </View>

          {/* Botão A */}
          <Pressable
            onPress={() => selecionarResposta('A')}
            style={Styles.buttonA}
          />

          {/* Botão B */}
          <Pressable
            onPress={() => selecionarResposta('B')}
            style={Styles.buttonB}
          />

          {/* Botão C */}
          <Pressable
            onPress={() => selecionarResposta('C')}
            style={Styles.buttonC}
          />

          {/* Botão D */}
          <Pressable
            onPress={() => selecionarResposta('D')}
            style={Styles.buttonD}
          />

          {/* Contador de tentativas */}
          <Text style={Styles.contadorErros}>
            {tentativas + 1}
          </Text>

          {/* Pontuação acumulada */}
          <Text style={Styles.pontuacao}>
            {pontuacao}
          </Text>

        </>

      )}

      {/* Animações de resposta */}
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

      {/* Final do Quiz */}
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
