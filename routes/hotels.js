// routes/hotelRoutes.js
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authenticateToken = require('../middlewares/authMiddlware');
const HotelController = require('../controllers/HotelController');
const { hotelValidationCreate } = require('../middlewares/validators');
const { hotelValidationUpdate } = require('../middlewares/validators');
const { roomValidationCreate } = require('../middlewares/validators');
const { roomValidationUpdate } = require('../middlewares/validators');
const { roomAvailabilityValidationUpdate } = require('../middlewares/validators');
const RoomController = require('../controllers/RoomController');
const RoomAvailabilityController = require('../controllers/RoomAvailabilityController');

router.post(
    '/create',
    authenticateToken,
    hotelValidationCreate,
    HotelController.createHotel
);

router.get('/all', authenticateToken, HotelController.getHotels);
router.get('/:id', authenticateToken, HotelController.getHotelById);
router.put(
    '/:id',
    authenticateToken,hotelValidationUpdate,
    HotelController.updateHotel
);
router.delete('/:id', authenticateToken, HotelController.deleteHotel);

//Room Routes
router.post(
    '/room/create',
    authenticateToken, roomValidationCreate,
    RoomController.createRoom
);

router.get('/room/all', authenticateToken, RoomController.getRooms);
router.get('/room/:id', authenticateToken, RoomController.getRoomById);
router.put(
    '/room/:id',
    authenticateToken, roomValidationUpdate,
    RoomController.updateRoom
);
router.delete('/room/:id', authenticateToken, RoomController.deleteRoom);

// Hotel Availability
router.post(
    '/availability/create',
    authenticateToken,roomAvailabilityValidationUpdate,
    RoomAvailabilityController.createAvailability
);
router.put(
    '/availability/:id',
    authenticateToken,roomAvailabilityValidationUpdate,
    RoomAvailabilityController.updateAvailability
);

router.get('/availability/all', authenticateToken, RoomAvailabilityController.getAvailabilities);
router.get('/availability/:id', authenticateToken ,RoomAvailabilityController.getAvailabilityById);
router.get('/availability/get_by_hotel_id/:id', authenticateToken, RoomAvailabilityController.getAvailabilityByHotelId);
router.get('/availability/get_by_room_id/:id', authenticateToken, RoomAvailabilityController.getAvailabilityByRoomId);
router.delete('/availability/:id', authenticateToken, RoomAvailabilityController.deleteAvailability);

module.exports = router;
