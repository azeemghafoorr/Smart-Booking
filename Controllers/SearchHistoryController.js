// controllers/SearchHistoryController.js
const { validationResult } = require('express-validator');
const SearchHistory = require('../models/SearchHistory');

exports.createSearchHistory = async (req, res) => {
    try {
        const { hotel_id, user_id, is_booked, search_query } = req.body;
        const searchHistory = await SearchHistory.create({
            hotel_id,
            user_id,
            is_booked,
            search_query,
        });
        return res.status(201).json(searchHistory);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getSearchHistories = async (req, res) => {
    try {

        const searchHistories = await SearchHistory.findAll();

        return res.json(searchHistories);
    } catch (error) {
        return res.status(500).json({ error: error });
    }
};

exports.getSearchHistoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const searchHistory = await SearchHistory.findByPk(id);
        if (!searchHistory) {
            return res.status(404).json({ message: 'Search history not found' });
        }
        return res.json(searchHistory);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};

exports.updateSearchHistory = async (req, res) => {
    try {
        const { id } = req.params;
        const { hotel_id, user_id, is_booked, search_query } = req.body;
        const searchHistory = await SearchHistory.findByPk(id);
        if (!searchHistory) {
            return res.status(404).json({ message: 'Search history not found' });
        }
        searchHistory.hotel_id = hotel_id;
        searchHistory.user_id = user_id;
        searchHistory.is_booked = is_booked;
        searchHistory.search_query = search_query;
        await searchHistory.save();
        return res.json(searchHistory);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};

exports.deleteSearchHistory = async (req, res) => {
    try {
        const { id } = req.params;
        const searchHistory = await SearchHistory.findByPk(id);
        if (!searchHistory) {
            return res.status(404).json({ message: 'Search history not found' });
        }
        await searchHistory.destroy();
        return res.json({ message: 'Search history deleted successfully' });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};
