
import React, {
  useState,
  useEffect,
  useCallback,
} from 'react';

import { View } from 'react-native';

import ModoQuiz from './ModoQuiz';
import ModoLivro from './ModoLivro';
import ModoSuspenso from './ModoSuspenso';
import ModoStart from './ModoStart';

function PenseBemJr({
  onTransicaoIniciada,
  onBookAnimationEnd,
  cutsceneFinalizada,
}) {

  // =================================
  // ESTADOS PRINCIPAIS
  // =================================

  // 'start' = tela inicial com o aparelho pequeno e o botão de play
  const [modo, setModo] = useState('start');

  const [codigoLivro, setCodigoLivro] = useState(null);
  const [codigoPendente, setCodigoPendente] = useState(null);

  const [computadorSuspenso, setComputadorSuspenso] = useState(false);
  const [transicaoAtiva, setTransicaoAtiva] = useState(false);

  // =================================
  // SAIR DA TELA DE START
  // =================================

  const iniciarAparelho = useCallback(() => {

    setCodigoLivro(null);
    setModo('quiz');

  }, []);

  // =================================
  // ABRIR MODO LIVRO
  // =================================

  const abrirModoLivro = useCallback(() => {

    if (transicaoAtiva) return;

    setModo('livro');

  }, [transicaoAtiva]);

  // =================================
  // INICIAR TRANSIÇÃO
  // =================================

  const iniciarTransicao = useCallback(() => {

    setTransicaoAtiva(true);

    onTransicaoIniciada?.();

  }, [onTransicaoIniciada]);

  // =================================
  // LIVRO SELECIONADO
  // =================================

  const finalizarAnimacaoLivro = useCallback((codigo) => {

    setCodigoPendente(String(codigo));

    onBookAnimationEnd?.();

  }, [onBookAnimationEnd]);

  // =================================
  // CUTSCENE FINALIZADA
  // =================================

  useEffect(() => {

    if (
      !cutsceneFinalizada ||
      codigoPendente === null
    ) return;

    setCodigoLivro(codigoPendente);
    setCodigoPendente(null);

    setModo('quiz');

    setTransicaoAtiva(false);

  }, [cutsceneFinalizada, codigoPendente]);

  // =================================
  // RETORNAR AO QUIZ SEM LIVRO
  // =================================

  const voltarParaQuiz = useCallback(() => {

    setCodigoLivro(null);
    setCodigoPendente(null);

    setModo('quiz');

    setTransicaoAtiva(false);

  }, []);

  // =================================
  // SUSPENSÃO
  // =================================

  const atualizarSuspensao = useCallback((suspenso) => {

    setComputadorSuspenso(suspenso);

  }, []);

  // =================================
  // INTERFACE
  // =================================

  return (

    <View style={{ flex: 1, position: 'relative' }}>

      {/* MODOS PRINCIPAIS */}

      <View
        style={{
          flex: 1,
          display: computadorSuspenso ? 'none' : 'flex',
        }}
      >

        {modo === 'start' && (

          <ModoStart
            onIniciar={iniciarAparelho}
          />

        )}

        {modo === 'quiz' && (

          <ModoQuiz
            codigoLivro={codigoLivro}
            onAbrirLivro={abrirModoLivro}
          />

        )}

        {modo === 'livro' && (

          <ModoLivro
            onTransicaoIniciada={iniciarTransicao}
            onLivroSelecionado={finalizarAnimacaoLivro}
            onVoltarQuiz={voltarParaQuiz}
          />

        )}

      </View>

      {/* SISTEMA DE SUSPENSÃO */}

      {/* Na tela de start o aparelho ainda está desligado: sem botão de liga/desliga */}

      {modo !== 'start' && (

        <ModoSuspenso
          modo={modo}
          onEstadoChange={atualizarSuspensao}
          bloqueado={transicaoAtiva}
        />

      )}

    </View>

  );

}

export default PenseBemJr;
