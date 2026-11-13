class Dados {
  static programa = 0
  static numeroPergunta = 0
  static tentativa = 1
  static pontuacao = 0

  // matriz de gabaritos

  static gabaritos = [
    //151
    ['C','D','D','B','A','A','D','C','B','D','A','A','D','C','B','C','C','B','D','A','B','A','B','D','A','C','A','C','C','B'],
    // 152 
    ['D','D','D','B','D','A','B','A','B','D','A','C','A','C','C','A','A','B','A','D','B','B','B','C','D','C','D','D','D','A'],
    // 153
    ['C','A','A','B','C','A','A','B','A','D','B','B','B','C','D','A','D','B','A','D','B','B','D','C','C','C','B','A','D','B'],
    // 154 
    ['A','D','B','B','D','C','A','A','B','A','D','B','A','D','B','D','D','C','C','D','D','A','A','C','D','B','B','D','D','A'],
    // 155
    ['B','D','A','B','D','A','B','C','C','A','B','C','C','D','D','C','B','B','B','A','C','A','D','D','D','C','D','C','A','B']
  ]

  // quando o usuario selecionar um programa, o array do programa vem pra essa variavel
  
  static gabaritoProgramaSelecionado = []

  // essa variavel serve pra iterar sobre o gabarito
  
  static i = 0
}

export default Dados