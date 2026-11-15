import React, {useState} from 'react'
import {View, Text, Button, StyleSheet} from 'react-native'
import { useNavigation } from "@react-navigation/native"
import Styles from '../Styles'
import Botoes from './Botoes'
import Pergunta from './Pergunta'
import Dados from '../Dados'


function TelaPergunta() {

  const [, forcarAtualizacao] = useState(0)
  const navigation = useNavigation()
  const [mensagem, setMensagem] = useState('')

  const jogar = (letraEscolhida) => {
    const perguntaAtual = Dados.perguntasAtuais[Dados.indiceAtual]
    if(!perguntaAtual) return

    if(letraEscolhida === perguntaAtual.correta) {
      let pontosGanhos = 0
      if (Dados.tentativa === 1) pontosGanhos = 3
      else if(Dados.tentativa === 2) pontosGanhos = 2
      else if(Dados.tentativa === 3) pontosGanhos = 1

      Dados.pontuacao += pontosGanhos
      setMensagem(`Certo! +${pontosGanhos} pontos na questão ${perguntaAtual.numero}.`)
      avancarPergunta()
    } else {
      Dados.tentativa++

      if (Dados.tentativa > 3) {
        setMensagem(`Errou as 3 tentativas. A resposta da questão ${perguntaAtual.numero} era ${perguntaAtual.correta}.`)
        avancarPergunta()
      } else {
        setMensagem("Errado! Tente de novo.")
        forcarAtualizacao((n) => n + 1)
      }
    }
  }

  const avancarPergunta = () => {
    Dados.indiceAtual++
    Dados.tentativa = 1
    forcarAtualizacao((n) => n + 1)
  }

  const terminou = Dados.indiceAtual >= Dados.perguntasAtuais.length

  if (terminou) {
    return (
      <View style={Styles.principal}>
        <Text style={Styles.titulo}>Fim do Programa {Dados.programa}!</Text>
        <Text style={styleLocal.resultado}>
          Você concluiu o programa com {Dados.pontuacao} de {Dados.perguntasAtuais.length * 3} pontos.
        </Text>
        <Button title="Voltar ao início" onPress={() => navigation.navigate("Início")} color="#c93b2b" />
      </View>
    )
  }

  return (
    <View style={Styles.principal}>
      <Text style={styleLocal.statusHeader}>
        Programa {Dados.programa} | Questão {Dados.indiceAtual + 1}/30 | Tentativa: {Dados.tentativa}/3 | Pontos: {Dados.pontuacao}
      </Text>

      <Pergunta />

      {mensagem !== '' && <Text style={styleLocal.mensagem}>{mensagem}</Text>}

      <Botoes jogar={jogar} />
    </View>
  );
}

const styleLocal = StyleSheet.create({
  statusHeader: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginVertical: 6,
  },
  resultado: {
    fontSize: 16,
    textAlign: "center",
    marginVertical: 20,
  },
  mensagem: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 8,
  },
});

export default TelaPergunta