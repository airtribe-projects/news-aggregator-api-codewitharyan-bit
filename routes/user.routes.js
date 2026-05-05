const userController = require('../controllers/user.controllers');
const authMiddleware = require('../middlewares/authMiddleware');
const preferenceController = require('../controllers/preference.controllers');
const express = require('express');
const router = express.Router();


router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/preferences', authMiddleware, preferenceController.getPreferences);
router.put('/preferences', authMiddleware, preferenceController.updatePreferences);

module.exports = router;