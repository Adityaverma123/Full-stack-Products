const productService = require('../services/productService')
const createProduct = async (req, res) => {
    return productService.createProduct(req, res)
};

const getProducts = async (req, res) => {
    return productService.getProducts(req, res)
};


const updateProduct = async (req, res) => {
    return productService.updateProduct(req, res)
};

const deleteProduct = async (req, res) => {
    return productService.deleteProduct(req, res)
};

module.exports = { createProduct, getProducts, updateProduct, deleteProduct };
