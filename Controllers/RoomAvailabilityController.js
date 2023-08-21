// controllers/HotelAvailabilityController.js
const { validationResult } = require('express-validator');
const RoomAvailability = require('../models/RoomAvailablity');
const User = require("../Models/User");
const Room = require("../Models/Room");

exports.createAvailability = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { from, to, hotel_id, room_id } = req.body;
        const availability = await RoomAvailability.create({
            from,
            to,
            hotel_id,
            room_id,
        });
        return res.status(201).json(availability);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};
exports.updateAvailability = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { id } = req.params;
        const { from, to, hotel_id, room_id } = req.body;
        const roomAvailability = await RoomAvailability.findByPk(id);
        if (!roomAvailability) {
            return res.status(404).json({ message: 'Room Availability not found' });
        }
        roomAvailability.from = from;
        roomAvailability.tor = to;
        roomAvailability.hotel_id = hotel_id;
        roomAvailability.room_id = room_id;
        await roomAvailability.save();
        return res.json(roomAvailability);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getAvailabilities = async (req, res) => {
    try {
        const availabilities = await RoomAvailability.findAll();
        return res.json(availabilities);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getAvailabilityById = async (req, res) => {
    try {
        const { id } = req.params;
        const availability = await RoomAvailability.findByPk(id);
        if (!availability) {
            return res.status(404).json({ message: 'Availability not found' });
        }
        return res.json(availability);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getAvailabilityByHotelId = async (req, res) => {
    try {
        const { id } = req.params;
        const availability = await RoomAvailability.findAll({where: {hotel_id: id}});
        if (!availability) {
            return res.status(404).json({ message: 'Availability not found' });
        }
        return res.json(availability);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getAvailabilityByRoomId = async (req, res) => {
    try {
        const { id } = req.params;
        const availability = await RoomAvailability.findAll({where: {room_id: id}});
        if (!availability) {
            return res.status(404).json({ message: 'Availability not found' });
        }
        return res.json(availability);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};

exports.deleteAvailability = async (req, res) => {
    try {
        const { id } = req.params;
        const availability = await RoomAvailability.findByPk(id);
        if (!availability) {
            return res.status(404).json({ message: 'Availability not found' });
        }
        await availability.destroy();
        return res.json({ message: 'Availability deleted successfully' });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};
