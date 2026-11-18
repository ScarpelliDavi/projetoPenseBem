
import React, {
  useState,
  useEffect,
  useCallback,
} from 'react';

import { View } from 'react-native';

import ModoQuiz from './ModoQuiz';
import ModoLivro from './ModoLivro';
import ModoSuspenso from './ModoSuspenso';

function PenseBemJr({
  onTransicaoIniciada,
  onBookAnimationEnd,
  cutsceneFinalizada,
}) {

  // =================================
  // ESTADOS PRINCIPAIS
  // =================================

  const [modo, setModo] = useState('quiz');

  const [codigoLivro, setCodigoLivro] = useState(null);
  const [codigoPendente, setCodigoPendente] = useState(null);

  const [computadorSuspenso, setComputadorSuspenso] = useState(false);
  const [transicaoAtiva, setTransicaoAtiva] = useState(false);

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

      <ModoSuspenso
        modo={modo}
        onEstadoChange={atualizarSuspensao}
        bloqueado={transicaoAtiva}
      />

    </View>

  );

}

export default PenseBemJr;
