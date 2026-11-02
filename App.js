import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Home from './components/Home'

const Pilha = createStackNavigator()

const App = () => {
  return(
    <NavigationContainer>
      <Pilha.Navigator initialRouteName="Início">
        <Pilha.Screen name="Início" component={ Home } />
      </Pilha.Navigator>
    </NavigationContainer>
  )
}

export default App