// routes/reviewRoutes.js
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authenticateToken = require('../middlewares/authMiddlware');
const ReviewController = require('../controllers/ReviewController');

router.post(
    '/create',
    authenticateToken,
    [
        check('rating').isInt(),
        check('hotel_id').notEmpty(),
        check('user_id').notEmpty(),
        check('booking_id').notEmpty(),
    ],
    ReviewController.createReview
);

router.get('/all', authenticateToken, ReviewController.getReviews);
router.get('/get_by_id/:id', authenticateToken, ReviewController.getReviewById);
router.delete('/delete/:id', authenticateToken, ReviewController.deleteReview);

// API endpoint to get rating by user ID, hotel ID, and booking ID
router.get('/rating', ReviewController.getRatingByUserId);

module.exports = router;
