const express = require('express');
const router = express.Router();
const { addToCart } = require('../controllers/cartController');
const { validateCartItem } = require('../middleware/validation');

// POST /api/cart - Add item to cart
router.post('/', validateCartItem, addToCart);

module.exports = router;
