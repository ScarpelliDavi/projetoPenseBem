import React, {useState} from 'react'
import {View, Image, Text, TextInput} from 'react-native'
import Styles from '../Styles'
import Botoes from './Botoes'
import Pergunta from './Pergunta'

function TelaPergunta() {

  return(
    <View style={Styles.principal}>

        <Text style={Styles.titulo}>Tela de perguntas</Text>

    </View>
  )
}

export default TelaPergunta