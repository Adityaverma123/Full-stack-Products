const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const verifyAdminMiddleWare = require('../middleware/verifyAdminMiddleware');

const { createProduct, getProducts, updateProduct, deleteProduct } = require('../controllers/productController');
const router = express.Router();

router.post('/', authMiddleware, verifyAdminMiddleWare, createProduct);
router.get('/', authMiddleware, getProducts);
router.put('/:id', authMiddleware, verifyAdminMiddleWare, updateProduct);
router.delete('/:id', authMiddleware, verifyAdminMiddleWare, deleteProduct);

module.exports = router;
