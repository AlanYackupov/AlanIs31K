const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const listRoutes = require('./routes/lists');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Маршруты
app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);
app.use('/lists', listRoutes);

// Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});