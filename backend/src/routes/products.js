const express = require('express');
const router = express.Router();
const { getProducts, seedProducts } = require('../controllers/productController');

// GET /api/products - Get all products
router.get('/', getProducts);

// POST /api/products/seed - Seed sample products (for demo)
router.post('/seed', seedProducts);

module.exports = router;
