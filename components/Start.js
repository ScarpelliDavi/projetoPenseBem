import Dados from "../Dados"
import { View, Alert, Button } from "react-native"
import { useNavigation } from "@react-navigation/native"

function Start({programa}) {

  // esse objeto navigation serve pra trocar a tela
  const navigation = useNavigation()
  
  const iniciar = () => {

    // De acordo com o programa que o usuario selecionar, pega um dos gabaritos da matriz e passa pra variavel gabaritoProgramaSelecionado

    if(programa == '151') {
        Dados.gabaritoProgramaSelecionado = Dados.gabaritos[0]
        Dados.numeroPergunta = 0
    }

    else if(programa == '152'){
        Dados.gabaritoProgramaSelecionado = Dados.gabaritos[1]
        Dados.numeroPergunta = 30
    }

    else if(programa == '153'){
        Dados.gabaritoProgramaSelecionado = Dados.gabaritos[2]
        Dados.numeroPergunta = 60
    }

    else if(programa == '154'){
        Dados.gabaritoProgramaSelecionado = Dados.gabaritos[3]
        Dados.numeroPergunta = 90
    }

    else if(programa == '155'){
        Dados.gabaritoProgramaSelecionado = Dados.gabaritos[4]
        Dados.numeroPergunta = 120
    }

    else {
      
      Alert.alert('Código de programa inválido!\nDigite um código entre 151 e 155!')
      
      window.alert('Código de programa inválido!\nDigite um código entre 151 e 155!')

      return
    }

    // se o usuario digita um numero certo para o programa, ele atribui as variaveis e troca de tela, comecando o jogo

    Dados.programa = programa
    Dados.tentativa = 1
    Dados.pontuacao = 0
    Dados.i = 0
    navigation.navigate('TelaPergunta')
  }

  return(
    <View>

        <Button title="START/RESET" onPress={iniciar} />

    </View>
  )
}

export default Start