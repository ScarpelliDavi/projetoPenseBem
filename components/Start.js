import Dados from "../Dados"
import { View, Text, Button, StyleSheet } from "react-native"
import { useNavigation } from "@react-navigation/native"
import React, { useState } from "react";
import ListasPerguntas from "../ListaPerguntas";

function Start({programa}) {

  // esse objeto navigation serve pra trocar a tela
  const navigation = useNavigation()
  const [erro, setErro] = useState('')
  
  const iniciar = () => {
    const codigo = programa.trim();
    const perguntasDolivros = ListasPerguntas[codigo];
    
    if (!perguntasDolivros) {
      setErro("Código inválido! Digite um número de programa entre 151 e 155.")
      return
    }

    setErro('')
    Dados.programa = codigo
    Dados.perguntasAtuais = perguntasDolivros
    Dados.indiceAtual = 0;
    Dados.tentativa = 1;
    Dados.pontuacao = 0;


    navigation.navigate("TelaPergunta")
  }

  return(
    <View style={styles.container}>
        <Button title="START / ENTER" onPress={iniciar} color ="#c93b2b" />
        {erro !== '' && <Text style={styles.erro}>{erro}</Text>}
    </View>
  )
}
const styles = StyleSheet.create({
  container:{
    width: "100%",
    marginTop: 15,
  },
  erro: {
    color: "#c93b2b",
    textAlign: "center",
    marginTop: 10,
  },
});

export default Start