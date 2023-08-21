// routes/preferenceRoutes.js
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authenticateToken = require('../middlewares/authMiddlware');
const PreferenceController = require('../controllers/PreferenceController');

router.post(
    '/create',
    authenticateToken,
    [
        check('level').notEmpty(),
        check('user_id').notEmpty(),
        check('type').notEmpty(),
    ],
    PreferenceController.createPreference
);

router.get('/all', authenticateToken, PreferenceController.getPreferences);
router.get('/:id', PreferenceController.getPreferenceById);
router.put(
    '/:id',
    authenticateToken,
    [
        check('level').notEmpty(),
        check('user_id').notEmpty(),
        check('type').notEmpty(),
    ],
    PreferenceController.updatePreference
);
router.delete('/:id', authenticateToken, PreferenceController.deletePreference);

module.exports = router;
