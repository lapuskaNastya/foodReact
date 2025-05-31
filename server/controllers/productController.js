const uuid = require('uuid')
const path = require('path')
const {Product, Product_Info, Type} = require('../models/models');
const ApiError = require('../error/ApiError')

class ProductController {
    async create(req, res, next) {
        try {
          let { name, price, typeId, info } = req.body;
          const { img } = req.files;
    
          // Генерация уникального имени для изображения
          let fileName = uuid.v4() + ".jpg";
          img.mv(path.resolve(__dirname, '..', 'staticCard', fileName));
    
          // Создаем продукт
          const product = await Product.create({ name, price, typeId, img: fileName });
    
          if (info) {
            // Парсим массив с блоками title и description
            info = JSON.parse(info);
            info.forEach(i => {
              Product_Info.create({
                title: i.title,
                description: i.description,
                productId: product.id,
              });
            });
          }
    
          return res.json(product);
        } catch (e) {
          next(ApiError.badRequest(e.message));
        }
      }
      async getAll(req, res) {
        let { typeId, limit, page } = req.query;
        page = page || 1;
        limit = limit || 30;
        let offset = page * limit - limit;
    
        try {
            // Запрос с учетом фильтрации по типу (если typeId передан)
            let products = await Product.findAndCountAll({
                where: typeId ? { typeId } : {}, // Если typeId есть - добавляем фильтр по типу
                limit, // Ограничиваем количество
                offset, // Пагинация
                include: [
                    {
                        model: Product_Info, // Включаем связанную таблицу Product_Info
                        as: 'info', // Alias для связи с таблицей Product_Info
                        attributes: ['tittle', 'description'], // Указываем, какие поля брать из Product_Info
                    },
                ],
            });
    
            // Преобразуем данные типа с правильным URL для изображения
            const productsWithImageUrls = products.rows.map((product) => ({
                ...product.toJSON(),
                imgUrl: `http://172.20.10.2:8081/staticCard/${product.img}`, // Формируем URL изображения
            }));
    
            return res.json(productsWithImageUrls); // Отправляем результат
        } catch (error) {
            console.error('Ошибка при загрузке продуктов:', error);
            return res.status(500).json({ message: 'Ошибка при загрузке продуктов', error });
        }
    }
    
    async getOne(req, res) {
      const { id } = req.params;
      try {
          const product = await Product.findOne({
              where: { id },
              include: [{ model: Product_Info, as: 'info' }],
          });
  
          if (!product) {
              return res.status(404).json({ message: 'Продукт не найден' });
          }
  
          return res.json(product);
      } catch (error) {
          console.error('Ошибка при получении продукта:', error);
          return res.status(500).json({ message: 'Ошибка при получении продукта', error });
      }
  }
  


}
 
module.exports = new ProductController();