const asyncHandler = require('../utils/asyncHandler');
const apiError = require('../utils/apiError');
const users = require('./user.controllers').users;
const jwt = require('jsonwebtoken');


const getPreferences = asyncHandler(async (req, res) => {
    const user = users.find(u => u.email === req.user.email);
    if (!user) {
        throw new apiError(401, 'User not found');
    }
    res.status(200).json({ preferences: user.preferences });
})

const updatePreferences = asyncHandler(async (req, res) => {
    const user = users.find(u => u.email === req.user.email);
    if (!user) {
        throw new apiError(401, 'User not found');
    }
    user.preferences = req.body.preferences;
    res.status(200).json({ message: 'Preferences updated successfully' });
});

module.exports = {
    getPreferences,
    updatePreferences
};
