const Router = require('express');
const basketController = require('../controllers/basketController');
const router = new Router();

// Получение содержимого корзины
router.get('/:basketId', basketController.getBasket);

// Добавление товара в корзину
router.post('/add', basketController.addToBasket);

// Удаление товара из корзины
router.delete('/remove', basketController.removeFromBasket);

// Очистка корзины
router.post('/clear', basketController.clearBasket);

module.exports = router;
