const pool = require('../config/db');

const createProduct = async (req, res) => {
    const { name, description, price } = req.body;
    const result = await pool.query(
        'INSERT INTO products (name, description, price) VALUES ($1, $2, $3) RETURNING *',
        [name, description, price]
    );
    res.status(201).json(result.rows[0]);
};

const getProducts = async (req, res) => {
    const result = await pool.query('SELECT * FROM products');
    res.json(result.rows);
};

const getProduct = async (id) => {
    const result = await pool.query('SELECT * FROM products WHERE id = $1',[id]);
    return result.rows[0]
};


const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, description, price } = req.body;
    const result = await pool.query(
        'UPDATE products SET name = $1, description = $2, price = $3 WHERE id = $4 RETURNING *',
        [name, description, price, id]
    );
    res.json(result.rows[0]);
};

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    if(!id || isNaN(id)) return res.status(400).json({ error: 'Invalid or missing ID parameter' });
    const product = await getProduct(id)
    if(!product) return res.status(400).json({ error: 'Product id does not exist' });
    await pool.query('DELETE FROM products WHERE id = $1', [id]);
    res.status(204).send();
};

module.exports = { createProduct, getProducts, updateProduct, deleteProduct };
