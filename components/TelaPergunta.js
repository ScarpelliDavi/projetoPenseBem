import React, {useState} from 'react'
import {View, Text} from 'react-native'
import Styles from '../Styles'
import Botoes from './Botoes'
import Pergunta from './Pergunta'
import Dados from '../Dados'


function TelaPergunta() {

  const jogar = (resposta) => {
    if(resposta == Dados.gabaritoProgramaSelecionado[Dados.i]) {

      if(Dados.tentativa == 1)
        Dados.pontuacao += 3
      else if(Dados.tentativa == 2)
        Dados.pontuacao += 2
      else if(Dados.tentativa == 3)
        Dados.pontuacao++

      Dados.i++
      Dados.numeroPergunta++
      Dados.tentativa = 1
    } 
    else {
      
      Dados.tentativa++

      if(Dados.tentativa > 3) {
        Dados.i++
        Dados.numeroPergunta++
        Dados.tentativa = 1
      }
    }   

    if(Dados.i == 30) {
      
    }
  }

  return(
    <View style={Styles.principal}>

            <Text style={Styles.titulo}>
                Tela de perguntas
            </Text>

            <Pergunta />

            <Botoes jogar={jogar} />

        </View>
  )
}

export default TelaPergunta