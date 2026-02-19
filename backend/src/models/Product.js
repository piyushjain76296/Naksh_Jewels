const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    images: [{
        type: String,
        required: true
    }],
    image: {
        type: String
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    owner: {
        type: String,
        default: 'admin'
    }
}, {
    timestamps: true
});

// Set primary image to first image if not set
productSchema.pre('save', function(next) {
    if (!this.image && this.images && this.images.length > 0) {
        this.image = this.images[0];
    }
    next();
});

module.exports = mongoose.model('Product', productSchema);
