const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productController');
const { checkAdmin } = require('../middleware/authMiddleware');
// Маршруты для продуктов
router.get('/products', productsController.getAllProducts);
router.get('/products/:id', productsController.getProductById);
router.post('/products', checkAdmin, productController.addProduct);
router.put('/products/:id', checkAdmin, productController.updateProduct);
router.delete('/products/:id', checkAdmin, productController.deleteProduct);
const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);
module.exports = router;