import React, { useEffect, useState } from 'react';
import { View, Text, Alert } from 'react-native';
import axios from 'axios';

const ProductTypes = () => {
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await axios.get('http://10.185.225.126:5000/api/type');
        setTypes(response.data);
      } catch (error) {
        console.error('Ошибка при загрузке типов:', error.message);
        Alert.alert('Ошибка', 'Не удалось загрузить типы продуктов.');
      } finally {
        setLoading(false);
      }
    };

    fetchTypes();
  }, []);

  if (loading) {
    return <Text>Загрузка...</Text>;
  }

  return (
    <View>
      {types.map((type) => (
        <Text key={type.id}>{type.name}</Text>
      ))}
    </View>
  );
};

export default ProductTypes;
