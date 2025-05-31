const express = require('express')
const router = express.Router();    // Просто создаем роутер, не нужно использовать 'new'

const productController = require('../controllers/productController');


router.post('/', productController.create)

router.get('/', productController.getAll)
router.get('/:id', productController.getOne)



module.exports = router