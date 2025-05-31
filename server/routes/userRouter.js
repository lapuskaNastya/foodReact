const express = require('express');  // Используем express для создания роутера
const router = express.Router();    // Просто создаем роутер, не нужно использовать 'new'

const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware')

router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.get('/auth', authMiddleware, userController.check);

module.exports = router;
