# Задание 2 
> Разработка бэкенда для веб-сайта (REST API, postman)
>
> /signup
>
> /login
>
> (если пример) CRUD для задач
>
> (если пример) CRUD для списков

___

## Начало
***1. Установка необходимых библиотек***

Создайте новую папку для вашего проекта и инициализируйте его:

```bash
mkdir my-backend
cd my-backend
npm init -y
npm install express body-parser cors bcryptjs jsonwebtoken
```
+ Express — это минималистичный и гибкий веб-фреймворк для Node.js для создания веб-приложений и API

+ Body-parser — это middleware для Express, которое позволяет парсить (разбирать) тело входящих запросов в формате JSON, он позволяет легко получать данные из тела запроса
 
+ CORS (Cross-Origin Resource Sharing) — это механизм, который позволяет ограничить доступ к ресурсам на веб-сервере с других доменов
+ Bcryptjs — это библиотека для хеширования паролей перед их сохранением в базе данных.
  
+ Jsonwebtoken — используется для аутентификации и авторизации пользователей.
___ 

## Структура проекта

Создайте следующую структуру папок и файлов:

```
/my-backend
│
├── server.js
└── routes
    ├── auth.js
    ├── tasks.js
    └── lists.js
```
___

## Реализация маршрутов
> Auth.js
```java
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
```

> tasks.js
```java
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
```
### написание list.js точно так же как и tasks.js так как функционал один и тот же
```java
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
```
## Основной файл сервера
```java
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
```

## Запуск сервера

**1. В терминале перейдите в папку вашего проекта и запустите сервер с помощью Node.js:**
```bash
node server.js
```

**2. чтобы сервер автоматически перезагружался при изменении кода,  можно использовать `nodemon`**
```bash
npm install -g nodemon
```

**3. Затем запустите сервер с помощью `nodemon`:**
```bash
nodemon server.js
```

# Тестирование Postman скрины снизу.
> Для начало создаём папки для удобства и файлы которые будут проверять разработка backend.

![image](https://i.imgur.com/KyN8ZE8.png)

# Вход и Регистрация 

**Регистрация**: 
> **Метод**: POST 
>> **URL**: `http://localhost:5000/auth/signup`
>>> **Тело запроса**:
```json
{
   "username": "testuser",
   "password": "testpassword"
}
```
## Пользователь зарегестрирован
![](https://i.imgur.com/LE8qMrn.png)
___

**Вход**: 
> **Метод**: POST 
>> **URL**: `http://localhost:5000/auth/login`
>>> **Тело запроса**:
```json
{
    "username": "testuser",
    "password": "testpassword"
}
```
## После чего мы вводим данные регестрации и получаем токен, он нам нужен для дальнейших действий
![](https://i.imgur.com/Uu6FIMX.png)
___

# Действия списками и Действие с задачами
## Последовательность их идентиично друг другу 
**Создание задачи:** 
> **Метод**: POST 
>> **URL**: `http://localhost:5000/tasks`
>>>**Тело запроса**:
```json
{
    "title": "Первая задача"
}
```
## Заходим в Authorization и выбираем Auth Type: ***Bearer Token***
![](https://i.imgur.com/sprxb2q.png)
> После чего он выводит нам Первую задачу в таком виде:
```json
{
    "id": 1,
    "title": "Первая задача",
    "completed": false,
    "username": "Алан"
}
```
___
## Получение и Обновление задачи
___
**Получение задач:**
> **Метод**: GET 
>> **URL**: `http://localhost:5000/tasks`
___
**Обновление задачи:** 
> **Метод**: PUT 
>> **URL**: `http://localhost:5000/tasks/:id`
>>> **Тело запроса**:
  ```json
  {
      "title": "Обновленная задача",
      "completed": true
  }
  ```
## Вместо ":id" пишем номерацию которую хотим изменить
![](https://i.imgur.com/pp8wnc0.png)
___
## Удаление задачи
> Удаление задачи: 
>> **Метод**: DELETE 
>>> **URL**: `http://localhost:5000/tasks/:id`
## Вместо ":id" пишем номерацию которую хотим удалить, после чего в поле ***Полученные задачи*** при нажатии на **Send** мы увидем что нет задачи под id: 1 которую мы создовали ранее.
## Таким методом мы делаем только с Дейстивя со списками.
___
# Заключение
## Теперь есть полностью настроенный бэкенд с REST API для регистрации, входа пользователей и CRUD операций для задач и списков.
### Все файлы и папки я оставил у себя в репазитории
