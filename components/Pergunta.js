import { View, Text, Image } from "react-native"
import Dados from "../Dados"
import ListaPerguntas from "../ListaPerguntas"

function Pergunta() {

  const perguntaAtual = ListaPerguntas[Dados.numeroPergunta]
  let imagem;

  if (perguntaAtual.imagem){
    imagem = <Image source={perguntaAtual.imagem} />;
  } else{
    imagem = null;
  }

    return(
    <View>

      <Text>{perguntaAtual.enunciado}</Text>
      {imagem}

    </View>
  )
}

export default Pergunta