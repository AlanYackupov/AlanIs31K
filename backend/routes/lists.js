const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router(); // Исправлено: добавлены скобки

let lists = []; // Массив для хранения списков

// Middleware для проверки токена
const authenticate = (req, res, next) => {
    const authHeader = req.headers['authorization']; // Получаем заголовок авторизации
    const token = authHeader && authHeader.split(' ')[1]; // Извлекаем токен из заголовка

    if (!token) return res.status(403).send('Требуется токен'); // Если токена нет, возвращаем 403

    jwt.verify(token, 'secret', (err, decoded) => {
        if (err) return res.status(401).send('Неверный токен'); // Если токен недействителен, возвращаем 401
        req.user = decoded; // Сохраняем информацию о пользователе в запросе
        next(); // Переходим к следующему middleware
    });
};

// Создание списка
router.post('/', authenticate, (req, res) => {
    const list = {
        id: lists.length + 1,
        name: req.body.name,
        username: req.user.username // имя пользователя из токена
    };
    lists.push(list);
    res.status(201).json(list);
});

// Получение всех списков
router.get('/', authenticate, (req, res) => {
    const userLists = lists.filter(list => list.username === req.user.username);
    res.json(userLists);
});

// Обновление списка
router.put('/:id', authenticate, (req, res) => {
    const list = lists.find(l => l.id === parseInt(req.params.id) && l.username === req.user.username);
    if (!list) return res.status(404).send('Список не найден'); // Если список не найден, возвращаем 404

    list.name = req.body.name !== undefined ? req.body.name : list.name;
    res.json(list);
});

// Удаление списка
router.delete('/:id', authenticate, (req, res) => {
    lists = lists.filter(l => l.id !== parseInt(req.params.id) || l.username !== req.user.username);
    res.status(204).send(); // статус 204 (Нет содержимого)
});

module.exports = router;