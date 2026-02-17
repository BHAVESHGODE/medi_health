const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    head: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor'
    },
    description: String,
    staffCount: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model('Department', departmentSchema);
