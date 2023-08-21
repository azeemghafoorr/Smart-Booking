// routes/notificationRoutes.js
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authenticateToken = require('../middlewares/authMiddlware');
const NotificationController = require('../controllers/NotificationController');

router.post(
    '/create',
    authenticateToken,
    [
        check('message').notEmpty(),
        check('hotel_id').optional(),
        check('sender_id').optional(),
        check('booking_id').optional(),
        check('receiver_id').optional(),
    ],
    NotificationController.createNotification
);

router.get('/all', authenticateToken, NotificationController.getNotifications);
router.get('/:id', authenticateToken, NotificationController.getNotificationById);
router.put(
    '/:id',
    authenticateToken,
    [
        check('message').notEmpty(),
        check('hotel_id').optional(),
        check('sender_id').optional(),
        check('booking_id').optional(),
        check('receiver_id').optional(),
    ],
    NotificationController.updateNotification
);
router.delete('/delete/:id', authenticateToken, NotificationController.deleteNotification);

module.exports = router;
