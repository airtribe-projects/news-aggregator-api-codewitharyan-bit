const apiError = require('../utils/apiError');
const asyncHandler = require('../utils/asyncHandler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

let users = []; 

const signup = asyncHandler(async (req, res) => {
    
    const { name, email, password, preferences } = req.body;
   
    if (!name || !email || !password) {
        throw new apiError(400, 'Name, email, and password are required');
    }

    if(password.length < 6) {
        throw new apiError(400, 'Password must be at least 6 characters long');
    }

    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
        throw new apiError(400, 'Email already in use');
    }

    

     const passwordHash = await bcrypt.hash(password, 10);

     users.push({ name, email, passwordHash, preferences: preferences || [] ,read: [] ,favorites: [] });

    return res.status(200).json({ message: 'User registered successfully' });
});

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new apiError(400, 'Email and password are required');
    }
    const user = users.find(u => u.email === email);
    if (!user || !user.passwordHash) {
        throw new apiError(401, 'Invalid email or password');
    }
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
        throw new apiError(401, 'Invalid email or password');
    }
    const token = jwt.sign(
        { email: user.email },
         process.env.JWT_SECRET_KEY,
          { expiresIn: '1h' }
        );
    return res.status(200).json({ message: 'Login successful', token });
});

module.exports = { signup, login, users };