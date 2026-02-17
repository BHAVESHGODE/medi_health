const Notification = require('../models/Notification');

exports.createNotification = async (req, res) => {
  try {
    const { user, title, message, type = 'info', meta } = req.body;
    const note = await Notification.create({ user, title, message, type, meta });

    // Emit realtime event
    const io = req.app.get('io');
    io.emit('notification:new', { ...note.toObject() });

    res.status(201).json({ success: true, data: note });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.getMyNotifications = async (req, res) => {
  try {
    const notes = await Notification.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, data: notes });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.markRead = async (req, res) => {
  try {
    const note = await Notification.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { $set: { read: true } },
      { new: true }
    );
    if (!note) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data: note });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.clearAll = async (req, res) => {
  try {
    await Notification.deleteMany({ user: req.user._id });
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
