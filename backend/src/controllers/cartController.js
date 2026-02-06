const Product = require('../models/Product');

// Add item to cart (validate product exists and stock)
const addToCart = async (req, res, next) => {
    try {
        const { productId, quantity } = req.body;

        // Check if product exists
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                success: false,
                error: 'Product not found'
            });
        }

        // Check stock availability
        if (product.stock < quantity) {
            return res.status(400).json({
                success: false,
                error: `Insufficient stock. Only ${product.stock} items available`
            });
        }

        // Return success with product details
        res.status(200).json({
            success: true,
            message: 'Item added to cart successfully',
            data: {
                productId: product._id,
                name: product.name,
                price: product.price,
                quantity,
                total: product.price * quantity
            }
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    addToCart
};
