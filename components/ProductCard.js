import React from 'react';
import { View, Text,StyleSheet } from 'react-native';


export default function ProductCard() {

  return (
    <View style={styles.container}>
      <Text>Карточка</Text>
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
    margin: 10,
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
    color: 'white', // Чтобы текст был виден на черном фоне
  },
});
