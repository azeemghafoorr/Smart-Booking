// routes/searchHistoryRoutes.js
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authenticateToken = require('../middlewares/authMiddlware');
const SearchHistoryController = require('../controllers/SearchHistoryController');

router.post(
    '/create',
    authenticateToken,
    [
        check('hotel_id').notEmpty(),
        check('user_id').notEmpty(),
        check('is_booked').isBoolean(),
        check('search_query').notEmpty(),
    ],
    SearchHistoryController.createSearchHistory
);

router.get('/all', authenticateToken, SearchHistoryController.getSearchHistories);
router.get('/:id', authenticateToken, SearchHistoryController.getSearchHistoryById);
router.put(
    '/:id',
    authenticateToken,
    [
        check('hotel_id').notEmpty(),
        check('user_id').notEmpty(),
        check('is_booked').isBoolean(),
        check('search_query').notEmpty(),
    ],
    SearchHistoryController.updateSearchHistory
);
router.delete('/:id', authenticateToken, SearchHistoryController.deleteSearchHistory);

module.exports = router;
