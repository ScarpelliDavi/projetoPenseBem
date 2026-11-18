import React, { useState, useEffect, useRef } from 'react';
import { View } from 'react-native';

import ModoQuiz from './ModoQuiz';
import ModoLivro from './ModoLivro';
import ModoSuspenso from './ModoSuspenso';

function PenseBemJr() {
  const [modo, setModo] = useState('quiz');
  const [codigoLivro, setCodigoLivro] = useState(null);

  // Controlar a visibilidade do modo atual
  const [computadorSuspenso, setComputadorSuspenso] = useState(false);

  const estavaSuspenso = useRef(false);

  useEffect(() => {
    if (estavaSuspenso.current && !computadorSuspenso) {
      setCodigoLivro(null);
      setModo('quiz');
    }
    estavaSuspenso.current = computadorSuspenso;
  }, [computadorSuspenso]);

  // Abrir modo de seleção de livro
  function abrirModoLivro() {
    setModo('livro');
  }

  // Retornar ao quiz com o livro selecionado
  function iniciarQuiz(codigo) {
    setCodigoLivro(codigo);
    setModo('quiz');
  }

  return (
    <View style={{ flex: 1, position: 'relative' }}>

      {/* Modos principais */}
      <View
        style={{
          flex: 1,
          display: computadorSuspenso ? 'none' : 'flex',
        }}
      >

        {/* Modo Quiz */}
        {modo === 'quiz' && (
          <ModoQuiz
            codigoLivro={codigoLivro}
            onAbrirLivro={abrirModoLivro}
          />
        )}

        {/* Modo Livro */}
        {modo === 'livro' && (
          <ModoLivro
            onLivroSelecionado={iniciarQuiz}
          />
        )}

      </View>

      {/* Sistema de suspensão */}
      <ModoSuspenso
        modo={modo}
        onEstadoChange={setComputadorSuspenso}
      />

    </View>
  );
}

export default PenseBemJr;
