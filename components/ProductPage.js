import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image, Modal } from 'react-native';
import { getProducts, addToBasket } from './services/authServices';

export default function ProductPage({ navigation, route }) {
  const { typeId, basketId } = route.params;
  const [products, setProducts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      const productsData = await getProducts(typeId);
      setProducts(productsData);
    } catch (error) {
      console.error('Ошибка при загрузке продуктов', error);
    }
  };

  const handleAddToBasket = async (productId) => {
    try {
      await addToBasket(basketId, productId, 1);
      alert('Товар добавлен в корзину');
    } catch (error) {
      console.error('Ошибка при добавлении в корзину:', error);
    }
  };

  const openModal = (product) => {
    console.log('Открытие модального окна для продукта:', product);
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedProduct(null);
  };

  useEffect(() => {
    fetchProducts();
  }, [typeId]);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => openModal(item)}>
        <Image
          source={{ uri: `http://172.20.10.2:5000/staticCard/${item.img}` }}
          style={styles.cardImage}
          resizeMode="cover"
        />
      </TouchableOpacity>
      <Text style={styles.cardText1}>{item.price} ₽</Text>
      <Text style={styles.cardText}>{item.name}</Text>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => handleAddToBasket(item.id)}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.basketContainer}>
        <Image
          source={require('../assets/images/basket.png')}
          style={styles.basketImage}
          resizeMode="cover"
        />
      </View>

      <View style={styles.basketContainer1}>
        <Image
          source={require('../assets/images/user.png')}
          style={styles.userImage}
          resizeMode="cover"
        />
      </View>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedProduct && (
              <>
                <Image
                  source={{ uri: `http://172.20.10.2:5000/staticCard/${selectedProduct.img}` }}
                  style={styles.modalImage}
                  resizeMode="cover"
                />
                <Text style={styles.modalTitle}>{selectedProduct.name}</Text>
                <Text style={styles.modalPrice}>{selectedProduct.price} ₽</Text>

                {/* Проверяем наличие информации о товаре */}
                {selectedProduct.info && selectedProduct.info.length > 0 ? (
                  <View style={styles.infoContainer}>
                    {selectedProduct.info.map((infoItem, index) => {
                      console.log(infoItem); // Проверяем, что содержится в infoItem
                      return (
                        <View key={index} style={styles.infoItem}>
                          {infoItem.tittle && (  // Используем tittle вместо title
                            <Text style={styles.infoTitle}>{infoItem.tittle}</Text>
                          )}
                          {infoItem.description && (
                            <Text style={styles.infoDescription}>{infoItem.description}</Text>
                          )}
                        </View>
                      );
                    })}
                  </View>
                ) : (
                  <Text style={styles.noInfoText}>Нет подробной информации</Text>
                )}
                <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                  <Text style={styles.closeButtonText}>Закрыть</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>

      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  // стили для контейнера и прочих элементов
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 150,
    backgroundColor: 'black',
  },
  basketContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
  },
  basketContainer1: {
    position: 'absolute',
    top: 20,
    right: 70,
    zIndex: 1,
  },
  card: {
    flex: 1,
    margin: 5,
    padding: 5,
    backgroundColor: '#3a3a3a',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 1,
  },
  cardImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 15,
  },
  cardText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'gray',
  },
  cardText1: {
    fontSize: 20,
    fontWeight: '500',
    color: 'white',
  },
  addButton: {
    position: 'absolute',
    top: 3,
    right: 3,
    backgroundColor: 'transparent',
    borderRadius: 15,
    padding: 5,
  },
  basketImage: {
    width: 40,
    height: 40,
    borderRadius: 10,
    top: 50,
  },
  userImage: {
    width: 30,
    height: 30,
    top: 55,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalPrice: {
    fontSize: 25,
    color: 'green',
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: '#3a3a3a',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
  infoContainer: {
    marginTop: 10,
    width: '100%',
  },
  infoItem: {
    marginBottom: 10,
  },
  infoTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  infoDescription: {
    fontSize: 14,
    color: 'gray',
  },
  noInfoText: {
    fontSize: 14,
    color: 'gray',
    marginTop: 10,
  },
});
