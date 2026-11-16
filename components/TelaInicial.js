import React, {useState} from 'react'
import {View, Image, Text, Pressable, TextInput} from 'react-native'
import Styles from '../Styles'
import Start from './Start'
import PenseBemJr from './PenseBemJr';

function TelaInicial() {
  const [programa, setPrograma] = useState('')

  return(
    <View style={Styles.principal}>

        <Image
            source={require('../assets/Logo.png')}
            style={Styles.logo}
        />

        <PenseBemJr />

    </View>
  )
}

export default TelaInicial