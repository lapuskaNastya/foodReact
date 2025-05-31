import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View, TextInput, Alert, Image } from 'react-native';
import { asStyle } from '../style';
import { login } from './services/authServices';


export default function Enter({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleLogin = async () => {
    try {
      const token = await login(email, password);
      if (token) {
        Alert.alert("Успех", "Вы успешно вошли в систему!");
      
        navigation.navigate('MainFood');  
      }
    } catch (error) {
      Alert.alert("Ошибка", error.message);
    }
  };

  return (
    
   
    <View style = {asStyle.background1}> 
      <View style = {asStyle.cub} >
      <Image 
      source={require('../assets/images/main.png')} 
      style={asStyle.logo} 
    />
    <Text style={asStyle.TextAc}>Sign in</Text>
  
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
     
      <TouchableOpacity
          style={asStyle.blockHeaderRegister}
          onPress={handleLogin}
        >
          <Text style={asStyle.blockHeaderTextRegister}>Войти</Text>
      </TouchableOpacity>
      </View>
      
    </View>
    
  );
}
