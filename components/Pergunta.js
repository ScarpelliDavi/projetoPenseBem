import { View, Text, Image, StyleSheet } from "react-native"
import Dados from "../Dados"
import React from "react"

function Pergunta() {

  const perguntaAtual = Dados.perguntasAtuais[Dados.indiceAtual];

  if(!perguntaAtual){
    return(
      <View style={styles.container}>
        <Text style={styles.enunciado}>Fim das perguntas deste livro</Text>
      </View>
    )
  }
  
  const coresLetras = ["#c93b2b", "#b8a028", "#2980b9", "#27ae60"];
  const letras = ["A", "B", "C", "D"];


 return (
    <View style={styles.container}>
      <Text style={styles.enunciado}>
        <Text style={styles.numero}>{perguntaAtual.numero}. </Text>
        {perguntaAtual.enunciado}
      </Text>

      {perguntaAtual.imagem && (
        <View style={styles.containerImagem}>
          <Image
            source={perguntaAtual.imagem}
            style={styles.imagemRecorte}
            resizeMode="contain"
          />
        </View>

      )}
      <View style={styles.listaAlternativas}>
        {perguntaAtual.alternativas.map((textoAlternativa, idx) => (
          <View key={idx} style={styles.linhaAlternativa}>
            <View
              style={[
                styles.quadradoCor,
                { backgroundColor: coresLetras[idx] },
              ]}
            >
              <Text style={styles.letraBotao}>{letras[idx]}</Text>
            </View>
            <Text style={styles.textoAlternativa}>{textoAlternativa}</Text>
          </View>
        ))}
      </View>
    </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      padding: 10,
      width: "100%",
    },

    numero: {
      fontWeight: "bold",
      color: "#c93b2b"
    },
    enunciado: {
      fontSize: 15,
      fontWeight: "600",
      color: "#2c3e50",
      marginBottom: 10,
    },
    containerImagem: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 6,
    marginBottom: 10,
    height: 130,
    borderWidth: 1,
    borderColor: "#e0d8c5"
    },
    containerImagem: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 6,
    marginBottom: 10,
    height: 130,
    borderWidth: 1,
    borderColor: "#e0d8c5",
  }

  })
            

export default Pergunta