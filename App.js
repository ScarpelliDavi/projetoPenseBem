import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import TelaInicial from './components/TelaInicial'

const Pilha = createStackNavigator()

const App = () => {
  return(
    <NavigationContainer>
      <Pilha.Navigator initialRouteName="Início">
        <Pilha.Screen name="Início" component={ TelaInicial } />
      </Pilha.Navigator>
    </NavigationContainer>
  )
}

export default App