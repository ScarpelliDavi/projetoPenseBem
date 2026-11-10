import { View, Button } from "react-native"

function Botoes({ jogar }) {

  return(

    <View>

      <Button title="A" onPress={() => jogar('A')}/>
      <Button title="B" onPress={() => jogar('B')}/>
      <Button title="C" onPress={() => jogar('C')}/>
      <Button title="D" onPress={() => jogar('D')}/>

    </View>

  )
}

export default Botoes