const express = require('express');
const { checkHealth} = require('../controllers/healthController.js');
const router = express.Router();

router.get('/', checkHealth);
module.exports = router;
