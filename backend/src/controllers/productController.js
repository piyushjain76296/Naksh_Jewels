const Product = require('../models/Product');

// Sample products for seeding
const sampleProducts = [
    {
        name: 'Diamond Necklace',
        price: 45000,
        images: ['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400'],
        description: 'Elegant diamond necklace with 18K gold',
        category: 'Necklaces',
        stock: 5,
        owner: 'admin'
    },
    {
        name: 'Gold Earrings',
        price: 12000,
        images: ['https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400'],
        description: 'Traditional gold earrings with intricate design',
        category: 'Earrings',
        stock: 10,
        owner: 'admin'
    },
    {
        name: 'Pearl Bracelet',
        price: 8500,
        images: ['https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400'],
        description: 'Beautiful pearl bracelet with silver clasp',
        category: 'Bracelets',
        stock: 8,
        owner: 'admin'
    },
    {
        name: 'Ruby Ring',
        price: 25000,
        images: ['https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400'],
        description: 'Stunning ruby ring set in platinum',
        category: 'Rings',
        stock: 3,
        owner: 'admin'
    },
    {
        name: 'Emerald Pendant',
        price: 18000,
        images: ['https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400'],
        description: 'Exquisite emerald pendant with gold chain',
        category: 'Pendants',
        stock: 6,
        owner: 'admin'
    },
    {
        name: 'Silver Anklet',
        price: 3500,
        images: ['https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=400'],
        description: 'Delicate silver anklet with traditional bells',
        category: 'Anklets',
        stock: 15,
        owner: 'admin'
    }
];

// Get all products
const getProducts = async (req, res, next) => {
    try {
        const products = await Product.find().lean();
        res.status(200).json({
            success: true,
            count: products.length,
            data: products
        });
    } catch (error) {
        next(error);
    }
};

// Add new product
const addProduct = async (req, res, next) => {
    try {
        const { name, price, category, description, stock, images } = req.body;

        if (!name || !price || !category || !description || stock === undefined || !images || images.length === 0) {
            return res.status(400).json({
                success: false,
                error: 'Missing required fields. Images array is required.'
            });
        }

        const newProduct = new Product({
            name,
            price: parseFloat(price),
            category,
            description,
            stock: parseInt(stock),
            images: Array.isArray(images) ? images : [images],
            owner: req.body.owner || 'store-owner'
        });

        const savedProduct = await newProduct.save();

        res.status(201).json({
            success: true,
            message: 'Product added successfully',
            data: savedProduct
        });
    } catch (error) {
        next(error);
    }
};

// Seed initial products
const seedProducts = async (req, res, next) => {
    try {
        // Clear existing products
        await Product.deleteMany({});

        // Insert sample products
        const products = await Product.insertMany(sampleProducts);

        res.status(201).json({
            success: true,
            message: 'Products seeded successfully',
            count: products.length,
            data: products
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getProducts,
    seedProducts,
    addProduct
};
