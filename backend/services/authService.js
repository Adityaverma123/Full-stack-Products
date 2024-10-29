const jwt = require('jsonwebtoken');
const userService = require('../services/userService')
const bcrypt = require('bcrypt');
require('dotenv').config();

const register = async (req, res) => {
    const { username, password } = req.body;
    const user = await userService.getUserDetailsByUserName(username)
    if(user)  return res.status(400).json({ message: 'Username already exists' });
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await userService.insertUserDetails({username, hashedPassword})
    const token = jwt.sign({ id: result.id, role: 'user' }, process.env.JWT_SECRET);
    res.json({ user: result, token });
};

const login = async (req, res) => {
    const { username, password } = req.body;
    const user = await userService.getUserDetailsByUserName(username)

    if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET);
        res.json({ token });
    } else {
        res.status(400).json({ message: 'Invalid credentials' });
    }
};

module.exports = {login, register};
