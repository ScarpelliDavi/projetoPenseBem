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

  const jogar = (letraEscolhida) => {
    const perguntaAtual = Dados.perguntasAtuais[Dados.indiceAtual]
    if(!perguntaAtual) return

    if(letraEscolhida === perguntaAtual.correta) {
      if (Dados.tentativa === 1) Dados.pontuacao += 3
      else if(Dados.tentativa === 2) Dados.pontuacao += 2
      else if(Dados.tentativa === 3) Dados.pontuacao += 1

      avancarPergunta()
    } else {
      Dados.tentativa++

      if (Dados.tentativa > 3) {
        avancarPergunta()
      } else {
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
});

export default TelaPergunta