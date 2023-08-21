// routes/bookingRoutes.js
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authenticateToken = require('../middlewares/authMiddlware');
const BookingController = require('../controllers/BookingController');

router.post(
    '/create',
    authenticateToken,
    [
        check('date').isDate(),
        check('price').isDecimal(),
        check('user_id').notEmpty(),
        check('room_id').notEmpty(),
        check('hotel_id').notEmpty(),
        check('no_of_days').isInt(),
        check('time_of_arrival').isDate(),
        check('departure_date').isDate(),
        check('status').notEmpty(),
        check('no_of_guests').isInt(),
    ],
    BookingController.createBooking
);

router.get('/all', authenticateToken, BookingController.getBookings);
router.get('/get_by_id/:id', authenticateToken, BookingController.getBookingById);
router.get('/get_by_room_id/:id', authenticateToken, BookingController.getBookingByHotelId);
router.get('/get_by_user_id/:id', authenticateToken, BookingController.getBookingByUserId);
router.get('/get_by_hotel_id/:id', authenticateToken, BookingController.getBookingByHotelId);
router.put(
    '/update/:id',
    authenticateToken,
    [
        check('date').isDate(),
        check('price').isDecimal(),
        check('user_id').notEmpty(),
        check('room_id').notEmpty(),
        check('hotel_id').notEmpty(),
        check('no_of_days').isInt(),
        check('time_of_arrival').isTime(),
        check('departure_date').isDate(),
        check('status').notEmpty(),
        check('no_of_guests').isInt(),
    ],
    BookingController.updateBooking
);
router.delete('/delete/:id', authenticateToken, BookingController.deleteBooking);

module.exports = router;
