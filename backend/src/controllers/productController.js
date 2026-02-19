// In-memory product store (temporary solution without MongoDB)
let productsStore = [];

// Sample products
const sampleProducts = [
    {
        _id: '1',
        name: 'Diamond Necklace',
        price: 45000,
        image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400',
        description: 'Elegant diamond necklace with 18K gold',
        category: 'Necklaces',
        stock: 5
    },
    {
        _id: '2',
        name: 'Gold Earrings',
        price: 12000,
        image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400',
        description: 'Traditional gold earrings with intricate design',
        category: 'Earrings',
        stock: 10
    },
    {
        _id: '3',
        name: 'Pearl Bracelet',
        price: 8500,
        image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400',
        description: 'Beautiful pearl bracelet with silver clasp',
        category: 'Bracelets',
        stock: 8
    },
    {
        _id: '4',
        name: 'Ruby Ring',
        price: 25000,
        image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400',
        description: 'Stunning ruby ring set in platinum',
        category: 'Rings',
        stock: 3
    },
    {
        _id: '5',
        name: 'Emerald Pendant',
        price: 18000,
        image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400',
        description: 'Exquisite emerald pendant with gold chain',
        category: 'Pendants',
        stock: 6
    },
    {
        _id: '6',
        name: 'Silver Anklet',
        price: 3500,
        image: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=400',
        description: 'Delicate silver anklet with traditional bells',
        category: 'Anklets',
        stock: 15
    }
];

// Initialize with sample products
productsStore = [...sampleProducts];

// Get all products
const getProducts = async (req, res, next) => {
    try {
        res.status(200).json({
            success: true,
            count: productsStore.length,
            data: productsStore
        });
    } catch (error) {
        next(error);
    }
};

// Add new product
const addProduct = async (req, res, next) => {
    try {
        const { name, price, category, description, stock, image } = req.body;

        if (!name || !price || !category || !description || stock === undefined || !image) {
            return res.status(400).json({
                success: false,
                error: 'Missing required fields'
            });
        }

        const newProduct = {
            _id: (productsStore.length + 1).toString(),
            name,
            price: parseFloat(price),
            category,
            description,
            stock: parseInt(stock),
            image
        };

        productsStore.push(newProduct);

        res.status(201).json({
            success: true,
            message: 'Product added successfully',
            data: newProduct
        });
    } catch (error) {
        next(error);
    }
};

// Seed initial products (for demo purposes)
const seedProducts = async (req, res, next) => {
    try {
        productsStore = [...sampleProducts];

        res.status(201).json({
            success: true,
            message: 'Products seeded successfully',
            count: productsStore.length
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
