const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');

const { getUserInfo } = require('../controllers/userController');
const router = express.Router();

router.get('/', authMiddleware, getUserInfo);

module.exports = router;
