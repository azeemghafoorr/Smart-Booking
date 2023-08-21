// controllers/NotificationController.js
const { validationResult } = require('express-validator');
const Notification = require('../models/Notification');

exports.createNotification = async (req, res) => {
    try {
        const { message, hotel_id, sender_id, booking_id, receiver_id } = req.body;
        const notification = await Notification.create({
            message,
            hotel_id,
            sender_id,
            booking_id,
            receiver_id,
        });
        return res.status(201).json(notification);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.findAll();
        return res.json(notifications);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getNotificationById = async (req, res) => {
    try {
        const { id } = req.params;
        const notification = await Notification.findByPk(id);
        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }
        return res.json(notification);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};

exports.updateNotification = async (req, res) => {
    try {
        const { id } = req.params;
        const { message, hotel_id, sender_id, booking_id, receiver_id } = req.body;
        const notification = await Notification.findByPk(id);
        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }
        notification.message = message;
        notification.hotel_id = hotel_id;
        notification.sender_id = sender_id;
        notification.booking_id = booking_id;
        notification.receiver_id = receiver_id;
        await notification.save();
        return res.json(notification);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};

exports.deleteNotification = async (req, res) => {
    try {
        const { id } = req.params;
        const notification = await Notification.findByPk(id);
        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }
        await notification.destroy();
        return res.json({ message: 'Notification deleted successfully' });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};
