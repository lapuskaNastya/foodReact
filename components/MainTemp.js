import { Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import { asStyle } from '../style';

export default function MainTemp({navigation}) {
  return (
    <ImageBackground
      source={require('../assets/images/main.png')} // путь к изображению
      style={asStyle.background} // стиль, чтобы картинка занимала весь экран
    >
      <View style={asStyle.container}>
        <TouchableOpacity
          style={asStyle.blockHeader}
          onPress={() => navigation.navigate('Registration')}
        >
          <Text style={asStyle.blockHeaderText}>Зарегистрироваться</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={asStyle.blockHeader2}
          onPress={() => navigation.navigate('Enter')}
        >
          <Text style={asStyle.blockHeaderText2}>Войти</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  
  );
}
