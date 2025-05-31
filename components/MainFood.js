import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import { getTypes } from './services/authServices';

export default function MainFood ({navigation}) {
  const [types, setTypes] = useState([]);

  useEffect(() => {
    // Загружаем типы продуктов при монтировании компонента
    const fetchTypes = async () => {
      try {
        const typesData = await getTypes();
        setTypes(typesData); // Сохраняем полученные данные в стейт
      } catch (error) {
        console.error('Ошибка при загрузке типов продуктов', error);
      }
    };
    fetchTypes();
  }, []);

   // Функция для рендера карточек типов продуктов с изображениями
   const renderItem = ({ item }) => (
  <TouchableOpacity 
    style={styles.card} 
    onPress={() => navigation.navigate('Product', { typeId: item.id })}
  >
    <Image 
  source={{ uri:  `http://172.20.10.2:5000/static/${item.img}` }} 
  style={styles.cardImage}
  resizeMode="cover"
/>
   
  </TouchableOpacity>
);


  return (
    <View style={styles.container}>
     
      <FlatList 
        data={types}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2} // Для двух колонок
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 100,
    backgroundColor: 'black',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 80,
    color: 'red',
    paddingTop: 100,
    fontFamily: '1',
  },
  card: {
    flex: 1,
    margin: 0,
    padding: 10,
    backgroundColor: 'transparent',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 1,
  },
  cardImage: {
    width: 150, // Ширина изображения
    height: 130, // Высота изображения
    borderRadius: 10, // Радиус скругления
    marginBottom: 10,
  },
  cardText: {
    fontSize: 18,
    fontWeight: '500',
  },
});
