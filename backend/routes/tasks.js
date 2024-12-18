const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

let tasks = []; // хранения задач

// для проверки токена
const authenticate = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(403).send('Требуется токен');

    jwt.verify(token, 'secret', (err, decoded) => {
        if (err) return res.status(401).send('Неверный токен');
        req.user = decoded;
        next();
    });
};

// Создание задачи
router.post('/', authenticate, (req, res) => {
    const task = {
        id: tasks.length + 1,
        title: req.body.title,
        completed: false,
        username: req.user.username
    };
    tasks.push(task);
    res.status(201).json(task);
});

// Получение всех задач
router.get('/', authenticate, (req, res) => {
    const userTasks = tasks.filter(task => task.username === req.user.username);
    res.json(userTasks);
});

// Обновление задачи
router.put('/:id', authenticate, (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id) && t.username === req.user.username);
    if (!task) return res.status(404).send('Задача не найдена');

    task.title = req.body.title !== undefined ? req.body.title : task.title;
    task.completed = req.body.completed !== undefined ? req.body.completed : task.completed;
    res.json(task);
});

// Удаление задачи
router.delete('/:id', authenticate, (req, res) => {
    tasks = tasks.filter(t => t.id !== parseInt(req.params.id) || t.username !== req.user.username);
    res.status(204).send();
});

module.exports = router;