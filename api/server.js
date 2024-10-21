const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());
app.use(cors());

// Simulamos una base de datos (por simplicidad)
const users = [];
const SECRET_KEY = 'mi-clave-secreta'; // Cambia esto en producción

// Registro
app.post('/auth/register', (req, res) => {
  const { email, password } = req.body;

  // Verificar si el usuario ya existe
  const userExists = users.find(user => user.email === email);
  if (userExists) {
    return res.status(400).json({ message: 'El usuario ya existe' });
  }

  // Cifrar la contraseña
  const hashedPassword = bcrypt.hashSync(password, 8);

  // Guardar el nuevo usuario
  users.push({ email, password: hashedPassword });
  res.status(201).json({ message: 'Usuario registrado con éxito' });
});

// Login
app.post('/auth/login', (req, res) => {
  const { email, password } = req.body;

  const user = users.find(user => user.email === email);
  if (!user) {
    return res.status(400).json({ message: 'Usuario no encontrado' });
  }

  // Verificar la contraseña
  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: 'Contraseña incorrecta' });
  }

  // Generar el token JWT
  const token = jwt.sign({ email: user.email }, SECRET_KEY, { expiresIn: '1h' });

  res.json({ message: 'Login exitoso', token });
});

// Recuperación de Contraseña (simulación)
app.post('/auth/recover-password', (req, res) => {
  const { email } = req.body;
  const user = users.find(user => user.email === email);

  if (!user) {
    return res.status(400).json({ message: 'Usuario no encontrado' });
  }

  // Aquí podrías integrar un servicio de correo electrónico (como SendGrid)
  // pero, por simplicidad, solo simulamos el envío del correo:
  res.json({ message: `Email enviado a ${email} para recuperar la contraseña` });
});

// Puerto de la API
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API corriendo en el puerto ${PORT}`);
});
