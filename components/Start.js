import Dados from "../Dados"
import { View, Alert, Button, StyleSheet } from "react-native"
import { useNavigation } from "@react-navigation/native"
import React from "react";
import ListasPerguntas from "../ListaPerguntas";

function Start({programa}) {

  // esse objeto navigation serve pra trocar a tela
  const navigation = useNavigation()
  
  const iniciar = () => {
    const codigo = programa.trim();
    const perguntasDolivros = ListasPerguntas[codigo];
    
    if (!perguntasDolivros) {
      Alert.alert(
        "Código inválido!",
        "Digite um número de programa entre 151 e 155!"
      );
      return
    }

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
    </View>
  )
}
const styles = StyleSheet.create({
  container:{
    width: "100%",
    marginTop: 15,
  },
});

export default Start