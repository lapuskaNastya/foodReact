require('dotenv').config(); // Загрузка переменных среды

const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Basket } = require('../models/models');


const generateJwt = (id,email,role) => {
    return jwt.sign({ id, email: email, role }, process.env.SECRET_KEY, { expiresIn: '24h' });
}
const emailValidator = (email) => {
    if (!email) return false;  // Проверка на пустую строку
  
    // Регулярное выражение для проверки корректности email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(ru|com|net|org)$/;
  
    return emailRegex.test(email);  // Возвращает true, если email валиден, иначе false
  };

class UserController {
    async registration(req, res, next) {
        const { email, password, role, name, numbering,lastName, adress } = req.body;
        
        if (!email || !password) {
            return next(ApiError.badRequest('Некорректный email или пароль'));
        }
       
          if (!emailValidator(email)) {
            return next(ApiError.badRequest('"Email не валиден"'));
          } 
        
        const candidate = await User.findOne({ where: { email } });
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'));
        }
        const hashPassword = await bcrypt.hash(password, 5);
        const user = await User.create({ email, role, password: hashPassword,name,lastName, numbering, adress });
 
        const basket = await Basket.create({ userId: user.id });

        // Проверка на загрузку секретного ключа
        console.log('SECRET_KEY:', process.env.SECRET_KEY);

        const token = generateJwt(user.id, user.id, user.role)
        

        return res.json({ token });
    }
    
    async login(req, res, next) {
        const {email, password} = req.body
        const user = await User.findOne({ where: { email } })
        if (!emailValidator(email)) {
            return next(ApiError.badRequest('"Email не валиден"'));
          } 
        
        if (!user){
            return next(ApiError.internal('Пользователь не найден'));
        }
        let comparePassword = bcrypt.compareSync(password, user.password);
        if (!comparePassword){
            return next(ApiError.internal('Не верный пароль'));
        }
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }
}

module.exports = new UserController();
