// controllers/HotelController.js
const { validationResult } = require('express-validator');
const Hotel = require('../models/Hotel');

exports.createHotel = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { location, name, area, type, subType='', owner_id, lat, lng } = req.body;
        const hotel = await Hotel.create({
            location,
            name,
            area,
            type,
            subType,
            owner_id,
            lat,
            lng,
        });
        return res.status(201).json(hotel);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getHotels = async (req, res) => {
    try {
        const hotels = await Hotel.findAll();
        return res.json(hotels);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getHotelById = async (req, res) => {
    try {
        const { id } = req.params;
        const hotel = await Hotel.findByPk(id);
        if (!hotel) {
            return res.status(404).json({ message: 'Hotel not found' });
        }
        return res.json(hotel);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};

exports.updateHotel = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { id } = req.params;
        const { location, name, area, type, subType, lat, lng } = req.body;
        const hotel = await Hotel.findByPk(id);
        if (!hotel) {
            return res.status(404).json({ message: 'Hotel not found' });
        }
        hotel.location = location;
        hotel.name = name;
        hotel.area = area;
        hotel.type = type;
        hotel.subType = subType;
        hotel.lat = lat;
        hotel.lng = lng;
        await hotel.save();

        return res.json(hotel);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};

exports.deleteHotel = async (req, res) => {
    try {
        const { id } = req.params;
        const hotel = await Hotel.findByPk(id);
        if (!hotel) {
            return res.status(404).json({ message: 'Hotel not found' });
        }
        await hotel.destroy();
        return res.json({ message: 'Hotel deleted successfully' });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};
