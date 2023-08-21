// controllers/BookingController.js
const { validationResult } = require('express-validator');
const Booking = require('../models/Booking');


exports.createBooking = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { date, price, user_id, room_id, hotel_id, no_of_days, time_of_arrival, departure_date, status, no_of_guests } = req.body;
        const booking = await Booking.create({
            date,
            price,
            user_id,
            room_id,
            hotel_id,
            no_of_days,
            time_of_arrival,
            departure_date,
            status,
            no_of_guests,
        });
        return res.status(201).json(booking);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getBookings = async (req, res) => {
    try {
        const bookings = await Booking.findAll();
        return res.json(bookings);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getBookingById = async (req, res) => {
    try {
        const { id } = req.params;
        const booking = await Booking.findByPk(id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        return res.json(booking);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getBookingByHotelId = async (req, res) => {
    try {
        const { id } = req.params;
        const booking = await Booking.findAll({ where: { room_id: id } });
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        return res.json(booking);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getBookingByUserId = async (req, res) => {
    try {
        const { id } = req.params;
        const booking = await Booking.findAll({ where: { user_id: id } });
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        return res.json(booking);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getBookingByHotelId = async (req, res) => {
    try {
        const { id } = req.params;
        const booking = await Booking.findAll({ where: { hotel_id: id } });
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        return res.json(booking);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};

exports.updateBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const { date, price, user_id, room_id, hotel_id, no_of_days, time_of_arrival, departure_date, status, no_of_guests } = req.body;
        const booking = await Booking.findByPk(id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        booking.date = date;
        booking.price = price;
        booking.user_id = user_id;
        booking.room_id = room_id;
        booking.hotel_id = hotel_id;
        booking.no_of_days = no_of_days;
        booking.time_of_arrival = time_of_arrival;
        booking.departure_date = departure_date;
        booking.status = status;
        booking.no_of_guests = no_of_guests;
        await booking.save();
        return res.json(booking);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};

exports.deleteBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const booking = await Booking.findByPk(id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        await booking.destroy();
        return res.json({ message: 'Booking deleted successfully' });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};
