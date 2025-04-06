const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // Verificar si el usuario ya existe
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ message: 'El usuario ya existe' });
  }

  // Hashear la contraseña
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  // Asignar rol admin si se llama Ausar
  const role = username === 'Ausar' && password === 'ausarteamo' ? 'admin' : 'user';

  // Crear y guardar usuario
  const newUser = new User({ username, passwordHash, role });
  await newUser.save();

  res.status(201).json({ message: 'Usuario registrado con éxito', role });
});

module.exports = router;
