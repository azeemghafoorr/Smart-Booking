// middlewares/validators.js
const { body, check} = require('express-validator');
const User = require('../models/User'); // Import your User model

const isEmailUnique = async (email) => {
    const user = await User.findOne({ where: { email } });
    if (user) {
        return Promise.reject('Email already exists');
    }
    return Promise.resolve();
};
// Validation rules for register
exports.registerValidation = [
    body('first_name').notEmpty().withMessage('First name is required'),
    body('last_name').notEmpty().withMessage('Last Name is required'),
    body('email').notEmpty().isEmail().custom(isEmailUnique),
    body('password').notEmpty().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('phone').notEmpty().withMessage('Phone is required'),
    body('status').notEmpty().withMessage('Status is required'),
    body('type').notEmpty().withMessage('User type is required'),

];


// Validation rules for login
exports.loginValidation = [
    body('email').notEmpty().isEmail().withMessage('Invalid email'),
    body('password').notEmpty().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];
// Validation rules for Hotel Create
exports.hotelValidationCreate = [
    body('location').notEmpty().withMessage('Location field is required'),
    body('name').notEmpty().withMessage('Name field is required'),
    body('area').notEmpty().withMessage('Area field is required'),
    body('type').notEmpty().withMessage('Type field is required'),
    body('subType').notEmpty().withMessage('SubType field is required'),
    body('owner_id').notEmpty().withMessage('Owner Id field is required'),
    body('lat').notEmpty().withMessage('Latitude field is required'),
    body('lng').notEmpty().withMessage('Longitude field Id is required'),
];

// Validation rules for Hotel Update
exports.hotelValidationUpdate = [
    body('location').notEmpty().withMessage('Location field is required'),
    body('name').notEmpty().withMessage('Name field is required'),
    body('area').notEmpty().withMessage('Area field is required'),
    body('type').notEmpty().withMessage('Type field is required'),
    body('subType').notEmpty().withMessage('SubType field is required'),
    body('lat').notEmpty().withMessage('Latitude field is required'),
    body('lng').notEmpty().withMessage('Longitude field Id is required'),
];

// Validation rules for Room Create
exports.roomValidationCreate = [
    body('room_no').notEmpty().withMessage('Room No field is required'),
    body('type').notEmpty().withMessage('Type field is required'),
    body('price').isDecimal().withMessage('Price field should be decimal'),
    body('capacity').isInt().withMessage('Capacity field is required'),
    body('hotel_id').notEmpty().withMessage('Hotel Id field is required'),
];

// Validation rules for Room Update
exports.roomValidationUpdate = [
    body('room_no').notEmpty().withMessage('Room No field is required'),
    body('type').notEmpty().withMessage('Type field is required'),
    body('price').isDecimal().withMessage('Price field should be decimal'),
    body('capacity').isInt().withMessage('Capacity field is required'),
];

// Validation rules for Room Availability Create
exports.roomAvailabilityValidationUpdate = [
    body('from').isDate().withMessage('From Date field is required'),
    body('to').isDate().withMessage('To Date field is required'),
    body('hotel_id').notEmpty().withMessage('Hotel id field is required'),
    body('room_id').notEmpty().withMessage('Room id field is required'),
];

