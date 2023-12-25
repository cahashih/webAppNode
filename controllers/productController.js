const productModel = require('../models/productModel');

// Контроллер для управления продуктами
const productsController = {
async getAllProducts(req, res) {
try {
const products = await productModel.getAllProducts();
res.json(products);
} catch (error) {
res.status(500).json({ error: error.message });
}
},

async getProductById(req, res) {
try {
const product = await productModel.getProductById(req.params.id);
res.json(product);
} catch (error) {
res.status(500).json({ error: error.message });
}
},

async createProduct(req, res) {
try {
const newProduct = await productModel.createProduct(req.body);
res.status(201).json(newProduct);
} catch (error) {
res.status(500).json({ error: error.message });
}
},

async updateProduct(req, res) {
try {
const updatedProduct = await productModel.updateProduct(req.params.id, req.body);
res.json(updatedProduct);
} catch (error) {
res.status(500).json({ error: error.message });
}
},

async deleteProduct(req, res) {
try {
await productModel.deleteProduct(req.params.id);
res.send('Product deleted successfully');
} catch (error) {
res.status(500).json({ error: error.message });
}
}
};

module.exports = productsController;