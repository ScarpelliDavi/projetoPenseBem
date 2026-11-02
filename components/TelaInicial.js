import React, {useState} from 'react'
import {View, Image, Text, TextInput} from 'react-native'
import Styles from '../Styles'
import Start from './Start'

function TelaInicial() {
  const [programa, setPrograma] = useState('')

  return(
    <View style={Styles.principal}>

        <Image
            source={require('../assets/LogoTectoy.png')}
            style={Styles.logo}
        />

        <Text style={Styles.titulo}>Pense Bem</Text>

        <TextInput
          style={Styles.inputPrograma}
          value={programa}
          onChangeText={setPrograma}
          placeholder='Para selecionar um programa, digite um numero entre 151 e 155'
          keyboardType='numeric'
        />

        <Start programa={programa}/>

    </View>
  )
}

export default TelaInicial