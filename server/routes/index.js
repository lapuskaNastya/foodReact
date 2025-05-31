const express = require('express');  // Используем express
const router = express.Router();     // Создаем роутер через express.Router()

const userRouter = require('./userRouter');
const productRouter = require('./productRouter');
const typeRouter = require('./typeRouter');
const basketRouter = require('./basketRouter');

router.use('/user', userRouter);
router.use('/type', typeRouter);
router.use('/product', productRouter);
router.use('/bascket',basketRouter )

module.exports = router;
