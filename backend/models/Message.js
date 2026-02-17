const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiver: { // Can be User ref or Room ID (if group chat)
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    read: {
        type: Boolean,
        default: false
    },
    attachments: [{
        fileName: String,
        fileUrl: String,
        fileType: String
    }]
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);
