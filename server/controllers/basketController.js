const { Basket_Product, Product } = require('../models/models');

class BasketController {
  // Получение содержимого корзины пользователя
  async getBasket(req, res) {
    try {
      const { basketId } = req.params;

      const basketProducts = await Basket_Product.findAll({
        where: { basketId },
        include: [{ model: Product, attributes: ['id', 'name', 'price', 'img'] }],
      });

      const result = basketProducts.map((item) => ({
        id: item.id,
        productId: item.productId,
        name: item.product.name,
        price: item.product.price,
        img: item.product.img,
        quantity: item.quantity,
      }));

      return res.json(result);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Ошибка при получении корзины' });
    }
  }

  // Добавление товара в корзину
  async addToBasket(req, res) {
    try {
      const { basketId, productId, quantity } = req.body;

      // Проверяем, есть ли уже этот товар в корзине
      let basketProduct = await Basket_Product.findOne({ where: { basketId, productId } });

      if (basketProduct) {
        // Обновляем количество, если товар уже есть
        basketProduct.quantity += quantity;
        await basketProduct.save();
      } else {
        // Добавляем новый товар
        basketProduct = await Basket_Product.create({ basketId, productId, quantity });
      }

      return res.json(basketProduct);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Ошибка при добавлении товара в корзину' });
    }
  }

  // Удаление товара из корзины
  async removeFromBasket(req, res) {
    try {
      const { basketId, productId } = req.body;

      const basketProduct = await Basket_Product.findOne({ where: { basketId, productId } });

      if (!basketProduct) {
        return res.status(404).json({ message: 'Товар не найден в корзине' });
      }

      await basketProduct.destroy();

      return res.json({ message: 'Товар успешно удалён из корзины' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Ошибка при удалении товара из корзины' });
    }
  }

  // Очистка корзины
  async clearBasket(req, res) {
    try {
      const { basketId } = req.body;

      await Basket_Product.destroy({ where: { basketId } });

      return res.json({ message: 'Корзина очищена' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Ошибка при очистке корзины' });
    }
  }
}

module.exports = new BasketController();
