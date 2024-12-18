const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

let users = [];

// Регистрация
router.post('/signup', async (req, res) => {
   const { username, password } = req.body;

   // Проверка на наличие username и password
   if (!username || !password) {
       return res.status(400).send('Username и password обязательны');
   }

   const hashedPassword = await bcrypt.hash(password, 10);
   users.push({ username, password: hashedPassword });
   res.status(201).send('Пользователь зарегистрирован');
});

// Вход
router.post('/login', async (req, res) => {
   const { username, password } = req.body;

   // Проверка на наличие username и password
   if (!username || !password) {
       return res.status(400).send('Username и password обязательны');
   }

   const user = users.find(u => u.username === username);
   if (!user || !(await bcrypt.compare(password, user.password))) {
       return res.status(401).send('Неверные учетные данные');
   }
   const token = jwt.sign({ username }, 'secret', { expiresIn: '1h' });
   res.json({ token });
});

module.exports = router;