const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

const createDatabase = async () => {
    try {
        await pool.query('CREATE DATABASE astra_invest');
        console.log('Database created successfully');
    } catch (error) {
        console.error('Error creating database:', error);
    }
};
const createTables = async () => {
    try {
        const usersTableQuery = `
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(50) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                role VARCHAR(20) DEFAULT 'user'
            );
        `;

        const productsTableQuery = `
            CREATE TABLE IF NOT EXISTS products (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                description TEXT,
                price DECIMAL(10, 2) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `;

        await pool.query(usersTableQuery);
        await pool.query(productsTableQuery);

        console.log('Tables created successfully');
    } catch (error) {
        console.error('Error creating tables:', error);
    }
};

const setupDatabase = async () => {
    await createDatabase()
    await createTables();
    pool.end(); // Close the connection pool
};

setupDatabase().catch(console.error);