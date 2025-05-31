import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Header from './components/Header';
import { NavigationContainer } from '@react-navigation/native';
import MainTemp from './components/MainTemp';
import Registrations from './components/Registrations';
import Enter from './components/Enter';
import MainFood from './components/MainFood';
import ProductPage from './components/ProductPage';
import ProductCard from './components/ProductCard';


import * as Font from 'expo-font';
import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  // Функция для загрузки шрифтов
  const loadFonts = async () => {
    await Font.loadAsync({
      '1': require('./assets/fonts/1.ttf'), // Замените 'CustomFont' на имя вашего шрифта
    });
    setFontsLoaded(true);
  };

  useEffect(() => {
    loadFonts();
  }, []);

  // Отображение индикатора загрузки, пока шрифты не загружены
  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={MainTemp}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Registration"
          component={Registrations}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Enter"
          component={Enter}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="MainFood"
          component={MainFood}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Product"
          component={ProductPage}
          options={{
            headerShown: false,
          }}
        />
         <Stack.Screen
          name="ProductCards"
          component={ProductCard}
          options={{
            headerShown: false,
          }}
        />
        
        
         
      </Stack.Navigator>
    </NavigationContainer>
  );
}
