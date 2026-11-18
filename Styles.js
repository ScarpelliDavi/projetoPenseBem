import { StyleSheet } from 'react-native'

const Styles = StyleSheet.create({

  principal: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#f6b51d'
  },

  patternBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },

  pattern: {
    width: '100%',
    height: '100%',
    opacity: 0.07,
  },

  // Logo + aparelho: altura real do desenho, para poder centralizar
  conjunto: {
    height: 554,
    alignItems: 'center',
  },

  logo: {
    width: 190,
    height: 87,
    marginTop: 30,
    marginBottom: 30,
    position: 'absolute',
    top: -30,
    zIndex: 1
  },

  onOffButton: {
    position: 'absolute',
    width: 21,
    height: 21,
    top: 326,
    left: 73,
    zIndex: 10,
    backgroundColor: 'transparent',
  },

  onOffB2: {
    position: 'absolute',
    width: 21,
    height: 21,
    top: 276,
    left: 78,
    zIndex: 10,
    backgroundColor: 'transparent',
  },


  bookButton: {
    position: 'absolute',
    width: 21,
    height: 21,
    top: 326,
    left: 45,
    zIndex: 10,
    backgroundColor: 'transparent',
  },

  penseBem: {
    alignItems: 'center',
    width: 15,
    height: 15,
    marginTop: 3,
    marginBottom: 3,
    position: 'absolute',
    top: -20
  },

  penseBemDormindo: {
    alignItems: 'center',
    width: 15,
    height: 15,
    marginTop: 3,
    marginBottom: 3,
    position: 'absolute',
    top: 35,
    left: -8,
  },

  computer: {
    alignItems: 'center',
    width: 370,
    height: 670,
    marginTop: 3,
    marginBottom: 3
  },

  computerAnim: {
    alignItems: 'center',
    width: 370,
    height: 670,
    marginTop: 3,
    marginBottom: 3,
    top: 54
  },
  quizButton: {
    position: 'absolute',
    width: 21,
    height: 21,
    top: 349,
    left: 45,
    zIndex: 10,
    backgroundColor: 'transparent',
  },

  visorBook: {
    position: 'absolute',
    width: 84,
    height: 36,
    top: 215,
    left: 19,
    zIndex: 10,
    backgroundColor: 'tranparent',
  },

  textVisorBook: {
    fontFamily: 'Digital',
    fontSize: 49,
    textAlign: 'right',
    color: '#FF4D4D',
    opacity: 0.5,
    letterSpacing: 4
  },

  
  onOffButtonLivro: {
    position: 'absolute',
    width: 21,
    height: 21,
    top: 349,
    left: 73,
    zIndex: 10,
    backgroundColor: 'transparent',
  },

  onOffB2Livro: {
    position: 'absolute',
    width: 21,
    height: 21,
    top: 298,
    left: 78,
    zIndex: 10,
    backgroundColor: 'transparent',
  },


  num1: {
    position: 'absolute',
    width: 35,
    height: 35,
    top: 376,
    left: -78,
    zIndex: 10,
    backgroundColor: 'transparent',
  },

  num2: {
    position: 'absolute',
    width: 35,
    height: 35,
    top: 376,
    left: -32,
    zIndex: 10,
    backgroundColor: 'transparent',
  },

  num3: {
    position: 'absolute',
    width: 35,
    height: 35,
    top: 376,
    left: 13,
    zIndex: 10,
    backgroundColor: 'transparent',
  },

  num0: {
    position: 'absolute',
    width: 35,
    height: 35,
    top: 376,
    left: 58,
    zIndex: 10,
    backgroundColor: 'transparent',
  },

  num4: {
    position: 'absolute',
    width: 35,
    height: 35,
    top: 422,
    left: -78,
    zIndex: 10,
    backgroundColor: 'transparent',
  },

  num5: {
    position: 'absolute',
    width: 35,
    height: 35,
    top: 422,
    left: -32,
    zIndex: 10,
    backgroundColor: 'transparent',
  },

  num6: {
    position: 'absolute',
    width: 35,
    height: 35,
    top: 422,
    left: 13,
    zIndex: 10,
    backgroundColor: 'transparent',
  },

  num7: {
    position: 'absolute',
    width: 35,
    height: 35,
    top: 467,
    left: -78,
    zIndex: 10,
    backgroundColor: 'transparent',
  },

  num8: {
    position: 'absolute',
    width: 35,
    height: 35,
    top: 467,
    left: -32,
    zIndex: 10,
    backgroundColor: 'transparent',
  },

  num9: {
    position: 'absolute',
    width: 35,
    height: 35,
    top: 467,
    left: 13,
    zIndex: 10,
    backgroundColor: 'transparent',
  },

  enter1: {
    position: 'absolute',
    width: 35,
    height: 80,
    top: 422,
    left: 58,
    zIndex: 10,
    backgroundColor: 'transparent',
  },

  quizVisor: {
    position: 'absolute',
    width: 190,
    height: 43,
    top: 218,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    backgroundColor: 'transparent',
  },

  numPergunta: {
    position: 'absolute',
    width: 83,
    height:45,
    top: -3,
    left: 1,
    fontFamily: 'Digital',
    fontSize: 49,
    textAlign: 'right',
    color: '#FF4D4D',
    opacity: 0.5,
    letterSpacing: 4,
    zIndex: 10,
    backgroundColor: 'transparent'
 },

  buttonA: {
    position: 'absolute',
    top: 358,
    left: -75,
    width: 82,
    height: 72,
    zIndex: 10,
    backgroundColor: 'transparent'
  },

  buttonB: {
    position: 'absolute',
    top: 358,
    left: 22,
    width: 64,
    height: 65,
    zIndex: 10,
    backgroundColor: 'transparent'
  },

  buttonC: {
    position: 'absolute',
    top: 439,
    left: 5,
    width: 82,
    height: 72,
    zIndex: 10,
    backgroundColor: 'transparent'
  },

  buttonD: {
    position: 'absolute',
    top: 444,
    left: -73,
    width: 64,
    height: 65,
    zIndex: 10,
    backgroundColor: 'transparent'
  },

  // Tentativa atual (1 dígito âmbar no visor)
  contadorErros: {
    position: 'absolute',
    top: 215,
    left: -3,
    width: 26,
    height: 45,
    fontFamily: 'Digital',
    fontSize: 49,
    textAlign: 'right',
    color: '#FFC94D',
    opacity: 0.6,
    letterSpacing: 4,
    zIndex: 10,
  },

  // Pontuação acumulada (últimos dígitos do visor)
  pontuacao: {
    position: 'absolute',
    top: 215,
    left: 19,
    width: 83,
    height: 45,
    fontFamily: 'Digital',
    fontSize: 49,
    textAlign: 'right',
    color: '#FF4D4D',
    opacity: 0.5,
    letterSpacing: 4,
    zIndex: 10,
  },

  // Painel de fim de programa, sobre o teclado
  quizContainer: {
    position: 'absolute',
    top: 372,
    width: 190,
    paddingVertical: 18,
    alignItems: 'center',
    backgroundColor: '#1B0E0F',
    borderRadius: 12,
    borderWidth: 3,
    borderColor: '#3A3F4B',
    zIndex: 20,
  },

  numeroPergunta: {
    color: '#FFE7A3',
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 2,
  },

  pontuacaoFinal: {
    marginTop: 6,
    color: '#FF4D4D',
    fontSize: 20,
    fontWeight: 'bold',
  },

  titulo: {
    fontWeight: 'bold',
    fontSize: 25,
    textAlign: 'center'
  },

  inputPrograma: {
    height: 30,
    width: 500,
    textAlign: 'center',
    color: 'blue',
    backgroundColor: 'white'
  },
})

export default Styles