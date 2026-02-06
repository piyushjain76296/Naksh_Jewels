const validateCartItem = (req, res, next) => {
    const { productId, quantity } = req.body;

    // Validate productId
    if (!productId || typeof productId !== 'string') {
        return res.status(400).json({
            success: false,
            error: 'Product ID is required and must be a string'
        });
    }

    // Validate quantity
    if (!quantity || typeof quantity !== 'number' || quantity < 1) {
        return res.status(400).json({
            success: false,
            error: 'Quantity must be a positive number'
        });
    }

    next();
};

const validateProduct = (req, res, next) => {
    const { name, price, image, description, category } = req.body;

    const errors = [];

    if (!name || typeof name !== 'string') {
        errors.push('Name is required and must be a string');
    }

    if (!price || typeof price !== 'number' || price < 0) {
        errors.push('Price must be a positive number');
    }

    if (!image || typeof image !== 'string') {
        errors.push('Image URL is required');
    }

    if (!description || typeof description !== 'string') {
        errors.push('Description is required');
    }

    if (!category || typeof category !== 'string') {
        errors.push('Category is required');
    }

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            errors
        });
    }

    next();
};

module.exports = {
    validateCartItem,
    validateProduct
};
