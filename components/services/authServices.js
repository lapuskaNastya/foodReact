// authServices.js
import axios from 'axios';

const API_URL_USER = 'http://172.20.10.2:5000/api/user';
const API_URL = 'http://172.20.10.2:5000/api';
export const register = async (email, password, name, lastName, numbering, adress) => {
  try {
    const response = await axios.post(`${API_URL_USER}/registration`, { email, password, name,lastName, numbering, adress });

    return response.data.token;
  } catch (error) {
    throw new Error(error.response.data.message || 'Что-то пошло не так');
  }
};
export const login = async (email, password) => {
  console.log("Выполняю запрос логина...");
  try {
    console.log('Отправляю данные на сервер:', { email, password });
    const response = await axios.post(`${API_URL_USER}/login`, { email, password });
    console.log('Ответ от сервера:', response);  // Логируем весь ответ от сервера
    return response.data.token;  // Если всё прошло успешно, возвращаем token
  } catch (error) {
    console.error('Ошибка при логине:', error);  // Логируем ошибку, если она возникла
    if (error.response) {
      console.error('Ответ от сервера:', error.response);
      console.error('Статус ошибки:', error.response.status);  // Логируем статус ошибки
      console.error('Сообщение ошибки:', error.response.data);
    } else {
      console.error('Ошибка сетевого запроса:', error.message);  // Логируем сетевую ошибку
    }
    throw new Error(error.response?.data?.message || 'Что-то пошло не так');
  }
};



export const getTypes = async () => {
    try {
      const response = await axios.get(`${API_URL}/type`);
      return response.data;
    } catch (error) {
      console.error("Ошибка при загрузке типов продуктов:", error);
      throw error;
    }
};

export const getProducts = async (typeId) => {
  try {
    const response = await axios.get(`${API_URL}/product`, {
      params: { typeId }, // Передаём typeId как параметр запроса
    });
    return response.data;
  } catch (error) {
    console.error("Ошибка при загрузке продуктов:", error);
    throw error;
  }
};
export const addToBasket = async (basketId, productId, quantity = 1) => {
  try {
    const response = await axios.post(`${API_URL}/basket/add`, {
      basketId,
      productId,
      quantity,
    });
    return response.data; // Возвращаем сообщение об успешном добавлении
  } catch (error) {
    console.error("Ошибка при добавлении в корзину:", error);
    throw error; // Пробрасываем ошибку
  }
};

export const getBasketItems = async (basketId) => {
  try {
    const response = await axios.get(`${API_URL}/basket/items`, {
      params: { basketId },
    });
    return response.data; // Возвращаем список товаров корзины
  } catch (error) {
    console.error("Ошибка при загрузке товаров корзины:", error);
    throw error; // Пробрасываем ошибку
  }
};




