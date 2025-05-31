import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, TouchableOpacity, View, TextInput, Alert, Button, ImageBackground , Image} from 'react-native'; // Добавлен Button
import { asStyle } from '../style';
import { register } from './services/authServices';

export default function Registration({ navigation }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [numbering, setNumbering] = useState('');
  const [adress, setAdress] = useState('');

  const handleRegistration = async () => {
    try {
      const token = await register(email, password, name,lastName, numbering, adress);  // Проверьте правильность функции
      if (token) {
        Alert.alert("Успех", "Вы успешно зарегистрировались!");
        navigation.navigate('MainFood');  // Переход на главную страницу
      }
    } catch (error) {
      Alert.alert("Ошибка", error.message);
    }
  };

  return (
    
    <View style = {asStyle.background1}> 
      <View style = {asStyle.cub} >
      <Image 
      source={require('../assets/images/main.png')} // Путь к вашему логотипу
      style={asStyle.logo} 
    />
    <Text style={asStyle.TextAc}>Create accaunt!</Text>
    <Text style= {asStyle.Texting}> Имя</Text>
      <View style={asStyle.inputView}>
        <TextInput
          style={asStyle.TextInput}
          placeholder="Введите имя"
          value={name}  
          onChangeText={setName}
        />
      </View>
      <Text style= {asStyle.Texting}> Фамилия</Text>
      <View style={asStyle.inputView}>
        <TextInput
          style={asStyle.TextInput}
          placeholder="Введите фамилию"
          value={lastName}  
          onChangeText={setLastName}
        />
      </View>

    <Text style= {asStyle.Texting}>Email</Text>
    
      <View style={asStyle.inputView}>
       
        <TextInput
          style={asStyle.TextInput}
          placeholder="Введите email"
          value={email}  
          onChangeText={setEmail}
        />
      </View>
      <Text style= {asStyle.Texting}> Пароль</Text>
      <View style={asStyle.inputView}>
        <TextInput 
          style={asStyle.TextInput}
          placeholder="Введите пароль"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
      </View>
      
      <Text style= {asStyle.Texting}>Номер телефона</Text>
      <View style={asStyle.inputView}>
        <TextInput
          style={asStyle.TextInput}
          placeholder="Введите номер телефона"
          value={numbering}  
          onChangeText={setNumbering}
        />
      </View>
      <Text style= {asStyle.Texting}> Адрес проживания</Text>
      <View style={asStyle.inputView}>
        <TextInput
          style={asStyle.TextInput}
          placeholder="Введите адресс"
          value={adress}  
          onChangeText={setAdress}
        />
      </View>
      <TouchableOpacity
          style={asStyle.blockHeaderRegister}
          onPress={handleRegistration}
        >
          <Text style={asStyle.blockHeaderTextRegister}>Зарегистрироваться</Text>
      </TouchableOpacity>
      </View>
      
    </View>
    
  );
}
