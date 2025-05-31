const uuid = require('uuid')
const path = require('path')
const {Type} = require('../models/models')
const ApiError = require('../error/ApiError')

class TypeController {
    async create(req, res) {
        try{
        const {name}=req.body
        const {img}=req.files
        let fileName = uuid.v4() + ".jpg"// для генерации уникального имени файла
        img.mv(path.resolve(__dirname, '..', 'static', fileName))
        const type = await Type.create({name,  img: fileName})
        
        return res.json(type)
        }
        catch(e){
           next(ApiError.badRequest(e.message))
        }
        
    }
    async getAll(req, res) {
        try {
            // Получаем все типы продуктов
            const types = await Type.findAll();
            
            // Преобразуем данные типа с правильным URL для изображения
            const typesWithImageUrls = types.map(type => ({
                ...type.toJSON(),
                imgUrl: `http://10.185.225.126:5000/static/${type.img}` // предполагаем, что сервер работает на порту 5000
            }));
    
            return res.json(typesWithImageUrls); // Отправляем данные на клиент
        } catch (error) {
            console.error('Ошибка при получении типов продуктов:', error);
            return res.status(500).json({ message: 'Ошибка при получении типов продуктов', error });
        }
    }
    


}
 
module.exports = new TypeController();