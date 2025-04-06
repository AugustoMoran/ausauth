require('dotenv').config(); // 👈 Cargar variables de entorno primero

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./db');

console.log('🔍 URI:', process.env.MONGODB_URI); // 👈 Ahora sí, después de cargar .env

const app = express();

// Conectar a MongoDB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
const authRoutes = require('./routes/auth');
app.use('/api', authRoutes);
const userRoutes = require('./routes/users');
app.use('/api', userRoutes);

// Rutas
app.get('/', (req, res) => {
  res.send('¡Hola desde AusAuth API!');
});

// Puerto
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
