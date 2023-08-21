// controllers/ReviewController.js
const { validationResult } = require('express-validator');
const Review = require('../models/Review');

exports.createReview = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { rating, comment, hotel_id, user_id, booking_id } = req.body;

        const review = await Review.create({
            rating,
            comment,
            hotel_id,
            user_id,
            booking_id,
        });
        return res.status(201).json(review);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getReviews = async (req, res) => {
    try {
        const reviews = await Review.findAll();
        return res.json(reviews);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getReviewById = async (req, res) => {
    try {
        const { id } = req.params;
        const review = await Review.findByPk(id);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        return res.json(review);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};

exports.updateReview = async (req, res) => {
    try {
        const { id } = req.params;
        const { rating, comment, hotel_id, user_id, booking_id } = req.body;
        const review = await Review.findByPk(id);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        review.rating = rating;
        review.comment = comment;
        review.hotel_id = hotel_id;
        review.user_id = user_id;
        review.booking_id = booking_id;
        await review.save();
        return res.json(review);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};

exports.deleteReview = async (req, res) => {
    try {
        const { id } = req.params;
        const review = await Review.findByPk(id);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        await review.destroy();
        return res.json({ message: 'Review deleted successfully' });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getRatingByUserId = async (req, res) => {
    try {
        const { user_id, hotel_id, booking_id } = req.query;
        const review = await Review.findOne({
            where: { user_id, hotel_id, booking_id },
        });
        if (!review) {
            return res.status(404).json({ message: 'Rating not found' });
        }
        return res.json({ rating: review.rating });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};
