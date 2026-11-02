import Dados from "../Dados"
import { View, Alert, Button } from "react-native"

// Função que roda quando o usuário começa o jogo

function Start({programa}) {
  const iniciar = () => {

    // De acordo com o programa que o usuario selecionar, pega um dos gabaritos da matriz e passa pra variavel gabaritoProgramaSelecionado

    if(programa == '151') {
        Dados.gabaritoProgramaSelecionado = Dados.gabaritos[0]
        Dados.pergunta = 1
    }

    else if(programa == '152'){
        Dados.gabaritoProgramaSelecionado = Dados.gabaritos[1]
        Dados.pergunta = 31
    }

    else if(programa == '153'){
        Dados.gabaritoProgramaSelecionado = Dados.gabaritos[2]
        Dados.pergunta = 61
    }

    else if(programa == '154'){
        Dados.gabaritoProgramaSelecionado = Dados.gabaritos[3]
        Dados.pergunta = 91
    }

    else if(programa == '155'){
        Dados.gabaritoProgramaSelecionado = Dados.gabaritos[4]
        Dados.pergunta = 121
    }

    else {
      Alert.alert('Código de programa inválido!\nDigite um código entre 151 e 155!')

      return
    }

    Dados.programa = programa
    Dados.tentativa = 1
    Dados.pontuacao = 0
    Dados.i = 0
  }

  return(
    <View>

        <Button title="START/RESET" onPress={iniciar} />

    </View>
  )
}

export default Start