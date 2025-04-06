const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const router = express.Router();

// Ruta para registrar usuarios
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Verificamos si el usuario ya existe
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'El usuario ya existe' });
    }

    // Encriptamos la contraseña
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Si el username es "Ausar" y la contraseña "ausarteamo", es admin
    const role = (username === 'Ausar' && password === 'ausarteamo') ? 'admin' : 'user';

    // Creamos y guardamos el nuevo usuario
    const newUser = new User({ username, passwordHash, role });
    await newUser.save();

    res.status(201).json({ message: 'Usuario creado', user: { username, role } });
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar el usuario' });
  }
});

module.exports = router;
