const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
    itemName: {
        type: String,
        required: true
    },
    category: {
        type: String, // e.g., "Medicine", "Equipment", "Consumable"
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 0
    },
    unitPrice: {
        type: Number,
        required: true
    },
    supplier: String,
    expiryDate: Date,
    lowStockThreshold: {
        type: Number,
        default: 10
    },
    barcode: {
        type: String,
        unique: true,
        sparse: true
    },
    manufacturer: String,
    location: String // Shelf/Rack location
}, { timestamps: true });

module.exports = mongoose.model('Inventory', inventorySchema);
