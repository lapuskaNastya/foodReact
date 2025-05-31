const express = require('express')
const router = express.Router();    // Просто создаем роутер, не нужно использовать 'new'
const typeController = require('../controllers/typeController');
const checkRole = require ( '../middleware/checkRoleMiddleware')


router.post('/', typeController.create )

router.get('/', typeController.getAll)



module.exports = router