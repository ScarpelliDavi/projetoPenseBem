import React from 'react'
import { View, Image, Text, Button } from 'react-native'
import Estilos from '../Styles'

const Home = ({ navigation }) => {
  return(
    <View style={ Estilos.principal }>

      <Text style={ Estilos.titulo }>aaaaaaaaaaaaaaaaaaaaa</Text>

      <Text style={ Estilos.paragrafo }>aaaaaaaaaaaaaaaaaaaaaaaaaa</Text>

      <Button
        title="Contatos"
        onPress={ () => navigation.navigate('Contatos') }
      />
    </View>
  )
}

export default Home