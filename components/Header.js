import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { asStyle } from '../style';

export default function Header({ navigation }) {
  const onClick = () => {
    navigation.navigate('Registration');
  };

  return (
    <View >
      <TouchableOpacity 
        style={asStyle.blockHeader} 
        onPress={onClick}>
        <Text style={asStyle.blockHeaderText}>Регистрация</Text>
      </TouchableOpacity>   
    </View> 
  );
}
