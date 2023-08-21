// controllers/RoomController.js
const { validationResult } = require('express-validator');
const Room = require('../models/Room');

exports.createRoom = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { room_no, type, description, price, capacity, hotel_id } = req.body;
        const room = await Room.create({
            room_no,
            type,
            description,
            price,
            capacity,
            hotel_id,
        });
        return res.status(201).json(room);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getRooms = async (req, res) => {
    try {
        const rooms = await Room.findAll();
        return res.json(rooms);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getRoomById = async (req, res) => {
    try {
        const { id } = req.params;
        const room = await Room.findByPk(id);
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }
        return res.json(room);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};

exports.updateRoom = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { id } = req.params;
        const { room_no, type, description, price, capacity } = req.body;
        const room = await Room.findByPk(id);
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }
        room.room_no = room_no;
        room.type = type;
        room.description = description;
        room.price = price;
        room.capacity = capacity;
        await room.save();
        return res.json(room);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};

exports.deleteRoom = async (req, res) => {
    try {
        const { id } = req.params;
        const room = await Room.findByPk(id);
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }
        await room.destroy();
        return res.json({ message: 'Room deleted successfully' });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};
