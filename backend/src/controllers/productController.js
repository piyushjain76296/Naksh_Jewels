const Product = require('../models/Product');

// Get all products
const getProducts = async (req, res, next) => {
    try {
        const products = await Product.find();

        res.status(200).json({
            success: true,
            count: products.length,
            data: products
        });
    } catch (error) {
        next(error);
    }
};

// Seed initial products (for demo purposes)
const seedProducts = async (req, res, next) => {
    try {
        const count = await Product.countDocuments();

        if (count > 0) {
            return res.status(200).json({
                success: true,
                message: 'Products already exist'
            });
        }

        const sampleProducts = [
            {
                name: 'Diamond Necklace',
                price: 45000,
                image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400',
                description: 'Elegant diamond necklace with 18K gold',
                category: 'Necklaces',
                stock: 5
            },
            {
                name: 'Gold Earrings',
                price: 12000,
                image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400',
                description: 'Traditional gold earrings with intricate design',
                category: 'Earrings',
                stock: 10
            },
            {
                name: 'Pearl Bracelet',
                price: 8500,
                image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400',
                description: 'Beautiful pearl bracelet with silver clasp',
                category: 'Bracelets',
                stock: 8
            },
            {
                name: 'Ruby Ring',
                price: 25000,
                image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400',
                description: 'Stunning ruby ring set in platinum',
                category: 'Rings',
                stock: 3
            },
            {
                name: 'Emerald Pendant',
                price: 18000,
                image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400',
                description: 'Exquisite emerald pendant with gold chain',
                category: 'Pendants',
                stock: 6
            },
            {
                name: 'Silver Anklet',
                price: 3500,
                image: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=400',
                description: 'Delicate silver anklet with traditional bells',
                category: 'Anklets',
                stock: 15
            }
        ];

        const products = await Product.insertMany(sampleProducts);

        res.status(201).json({
            success: true,
            message: 'Products seeded successfully',
            count: products.length
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getProducts,
    seedProducts
};
