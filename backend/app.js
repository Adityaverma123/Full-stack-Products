const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const healthRoutes = require('./routes/healthRoutes')
const userRoutes = require('./routes/userRoutes')


const app = express();
app.use(cors({
    origin: process.env.FRONTEND_URL, 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/health', healthRoutes)
app.use('/api/user', userRoutes)

module.exports = app;
