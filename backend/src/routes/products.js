const express = require('express');
const router = express.Router();
const { getProducts, seedProducts, addProduct } = require('../controllers/productController');

// GET /api/products - Get all products
router.get('/', getProducts);

// POST /api/products/seed - Seed sample products (for demo)
router.post('/seed', seedProducts);

// POST /api/products/add - Add new product
router.post('/add', addProduct);

module.exports = router;
