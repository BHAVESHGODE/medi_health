const Message = require('../models/Message');

// @desc    Send message
// @route   POST /api/chat
// @access  Private
exports.sendMessage = async (req, res, next) => {
    try {
        const { receiver, content } = req.body;

        const message = await Message.create({
            sender: req.user.id,
            receiver,
            content
        });

        // Populate sender details for the UI
        await message.populate('sender', 'name role');

        // Real-time send to receiver
        const io = req.app.get('io');
        // Assuming we room by User ID: socket.join(userId)
        // io.to(receiver).emit('new_message', message);
        // For simple prototype without rooms, broadcast with receiver ID
        io.emit('new_message', message);

        res.status(201).json({
            success: true,
            data: message
        });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// @desc    Get conversation between two users
// @route   GET /api/chat/:userId
// @access  Private
exports.getMessages = async (req, res, next) => {
    try {
        const otherUserId = req.params.userId;

        const messages = await Message.find({
            $or: [
                { sender: req.user.id, receiver: otherUserId },
                { sender: otherUserId, receiver: req.user.id }
            ]
        })
            .sort('createdAt')
            .populate('sender', 'name role')
            .populate('receiver', 'name role');

        res.status(200).json({
            success: true,
            count: messages.length,
            data: messages
        });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};
