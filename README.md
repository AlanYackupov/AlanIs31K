# Самостоятельная работа 1.
> Разработка React-приложения (create-react-app, webpack, npm)
> 
> Простая форма авторизации
> 
> 2-3 страницы с действиями (пример TODO-list)


# Начало
## 1: Установка и настройка проекта

### 1. **Установите Node.js и npm**:
> Проверка установки **node.js** и **npm**, можно выполнить при помощи команды:
```bash
  node -v
  npm -v
 ```
---
### 2. **Создания React-приложение**:
> Откройте терминал и выполните `create-react-app`:
```bash
  npx create-react-app my-app
```
> ***my-app*** это образно, вы можете назвать его как угодно.
---
### 3. **Перейдите в директорию проекта**:
```bash
cd my-app
```
---
### 4. **Запустите приложение**:
> Запустите сервер разработки, чтобы увидеть ваше приложение в действии:
```bash
npm start
```
> После того как вы вели эту команду вас перебросит на ваше приложение, где вы увидите это.
![](https://www.sentinelone.com/wp-content/uploads/2019/03/29085538/011.png)
---
# Структура проекта
### 1. **Создайте папки для компонентов**:
> Внутри папки `src` создайте папку `components`, где будут храниться ваши компоненты:
```
src/
├── components/
│   ├── AuthForm.js
│   ├── TodoList.js
│   ├── Profile.js
│   └── Settings.js
```
---
# Реализация формы авторизации
> В файле ***`AuthForm.js`*** создайте форму для авторизации:

## **AuthForm.js**
```java
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (username && password) {
            setMessage('Успешная регистрация!');
            navigate('/todos');
        } else {
            setMessage('Пожалуйста, заполните все поля.');
        }
    };

    return (
        <div>
        <h1>Авторизация</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Имя пользователя"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Зарегистрироваться</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default AuthForm;
```
### Объяснение кода
**1. Импорт библиотек и компонентов:**
   > React, useState, useEffect: Импортируем React и хуки для управления состоянием и побочными эффектами.
   > BrowserRouter, Route, Routes: Импортируем компоненты для маршрутизации, которые позволяют создавать одностраничные приложения с несколькими страницами.
   > Импортируем компоненты AuthForm, TodoList, Profile, Settings, которые представляют разные страницы приложения.
   > Импортируем стили из файла index.css.

**2. Компонент App:**
   > Это основной компонент приложения, который содержит маршрутизацию и управление состоянием.

**3. Состояние background:**
   > const [background, setBackground] = useState('none');: Создаем состояние background, которое будет хранить цвет фона. Изначально оно установлено в 'none'.

**4. Использование useEffect:**
   > useEffect(() => { ... }, [background]);: Этот хук выполняется каждый раз, когда изменяется значение background. Он устанавливает цвет фона для элемента body документа в соответствии с текущим состоянием background.

**5. Маршрутизация:**
   > Router: Оборачивает приложение, позволяя использовать маршрутизацию.
   > Routes: Определяет набор маршрутов.
   > Route: Определяет отдельный маршрут. Например:
- path="/": Главная страница, отображающая компонент AuthForm.
- path="/todos": Страница со списком задач, отображающая компонент TodoList.
- path="/profile": Страница профиля, отображающая компонент Profile.
- path="/settings": Страница настроек, где передается функция setBackground в компонент Settings, чтобы он мог изменять цвет фона.

**6. Стили:**
   > style={{ height: '100vh', transition: 'background 0.3s ease' }}: Устанавливает высоту контейнера на 100% высоты экрана и добавляет плавный переход при изменении фона.

**7. Экспорт компонента:**
   > export default App;: Экспортирует компонент App, чтобы его можно было использовать в других частях приложения.
---
# Создание страниц
> В файле ***`TodoList.js`*** создайте простой список задач

## **TodoList.js** 
```java
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCog } from '@fortawesome/free-solid-svg-icons';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const addTodo = () => {
        if (inputValue) {
            setTodos([...todos, inputValue]);
            setInputValue('');
        }
    };

    const deleteTodo = (index) => {
        const newTodos = todos.filter((_, i) => i !== index);
        setTodos(newTodos);
    };

    return (
        <div>
            <h2>Список дел</h2>
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Добавить новое дело"
            />
            <button onClick={addTodo}>Добавить</button>
            <ul>
                {todos.map((todo, index) => (
                    <li key={index}>
                        {todo}
                        <button onClick={() => deleteTodo(index)} style={{ marginLeft: '10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                            Удалить
                        </button>
                    </li>
                ))}
            </ul>
            <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
                <Link to="/profile" style={{ textDecoration: 'none', color: 'black' }}>
                    <FontAwesomeIcon icon={faUser} size="2x" />
                </Link>
                <Link to="/settings" style={{ textDecoration: 'none', color: 'black' }}>
                    <FontAwesomeIcon icon={faCog} size="2x" />
                </Link>
            </div>
        </div>
    );
};

export default TodoList;
```
### Объяснение кода

**1. Импорт библиотек и компонентов:**
> React и useState: Импортируем React и хук useState, который позволяет управлять состоянием в функциональных компонентах.
> Link: Импортируем компонент Link из react-router-dom, который позволяет создавать ссылки для навигации между страницами приложения.
> FontAwesomeIcon: Импортируем компонент для отображения иконок из библиотеки FontAwesome.
> faUser и faCog: Импортируем иконки пользователя и настроек.

**2. Компонент TodoList:**
> Это функциональный компонент, который содержит логику и интерфейс для списка дел.

**3. Состояния:**
> const [todos, setTodos] = useState([]);: Создаем состояние todos, которое будет хранить массив задач.
> const [inputValue, setInputValue] = useState('');: Создаем состояние inputValue, которое будет хранить текущее значение поля ввода.

**4. Функция addTodo:**
> Эта функция добавляет новое дело в
> список. Она проверяет, что поле ввода не пустое, и если это так, добавляет новое дело в массив todos и очищает поле ввода.

**5. Функция deleteTodo:**
> Эта функция удаляет дело из списка по индексу. Она использует метод filter, чтобы создать новый массив, исключая дело с указанным индексом, и обновляет состояние todos.
---
# **Создайте компоненты `Profile` и `Settings`**:
## **Profile**
```java
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faVenus } from '@fortawesome/free-solid-svg-icons'; // Импортируем faVenus

const Profile = () => {
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [city, setCity] = useState('');
    const [gender, setGender] = useState('male');
    const [avatar, setAvatar] = useState(faUser);

    const handleGenderChange = (e) => {
        const selectedGender = e.target.value;
        setGender(selectedGender);
        setAvatar(selectedGender === 'male' ? faUser : faVenus);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ fullName, phoneNumber, city, gender });
    };

    return (
        <div>
            <h2>Профиль пользователя</h2>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <FontAwesomeIcon icon={avatar} size="4x" />
            </div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="ФИО"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                />
                <input
                    type="tel"
                    placeholder="Номер телефона"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Город"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                />
                <div>
                    <label>
                        <input
                            type="radio"
                            value="male"
                            checked={gender === 'male'}
                            onChange={handleGenderChange}
                        />
                        Мужчина
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="female"
                            checked={gender === 'female'}
                            onChange={handleGenderChange}
                        />
                        Женщина
                    </label>
                </div>
                <button type="submit">Сохранить</button>
            </form>
        </div>
    );
};

export default Profile;

```
### Объяснение кода

**1. Импорт библиотек и компонентов:**
> `React` и `useState`: Импортируем React и хук `useState`, который позволяет управлять состоянием в функциональных компонентах.
> 
> `FontAwesomeIcon`: Импортируем компонент для отображения иконок из библиотеки FontAwesome.
> 
> `faUser` и `faVenus`: Импортируем иконки для пользователя и женщины.

**2. Компонент `Profile`:**
> Это функциональный компонент, который содержит логику и интерфейс для профиля пользователя.

**3. Состояния:**
> `const [fullName, setFullName] = useState('');`: Создаем состояние `fullName` для хранения полного имени пользователя.
> 
> `const [phoneNumber, setPhoneNumber] = useState('');`: Создаем состояние `phoneNumber` для хранения номера телефона.
> 
> `const [city, setCity] = useState('');`: Создаем состояние `city` для хранения города.
> 
> `const [gender, setGender] = useState('male');`: Создаем состояние `gender` для хранения пола пользователя, по умолчанию установлен в `'male'`.
> 
> `const [avatar, setAvatar] = useState(faUser);`: Создаем состояние `avatar` для хранения иконки аватара, по умолчанию используется иконка пользователя.

**4. Функция `handleGenderChange`:**
> Эта функция обрабатывает изменение выбранного пола. Она получает значение выбранного радио-кнопки и обновляет состояние `gender`. В зависимости от выбранного пола устанавливается соответствующая иконка (`faUser` для мужчин и `faVenus` для женщин).

**5. Функция `handleSubmit`:**
> Эта функция обрабатывает отправку формы. Она предотвращает перезагрузку страницы с помощью `e.preventDefault()` и выводит данные профиля в консоль.

**6. Возвращаемый JSX:**
> **Заголовок**: Отображает заголовок "Профиль пользователя".
> 
> **Иконка аватара**: Отображает иконку аватара в центре страницы, размером 4x.
> 
> **Форма**: Содержит поля для ввода полного имени, номера телефона и города. Каждое поле привязано к соответствующему состоянию и обновляется при изменении.
> 
> **Радио-кнопки**: Позволяют выбрать пол пользователя. Каждая кнопка проверяет, является ли она выбранной, и вызывает функцию `handleGenderChange` при изменении.
> 
> **Кнопка "Сохранить"**: Кнопка для отправки формы.
---
## **Settings**
```java
import React from 'react';

const Settings = ({ setBackground }) => {
    const handleBackgroundChange = (image) => {
        setBackground(image);
    };

    return (
        <div>
            <h2>Настройки</h2>
            <div>
                <h3>Выберите фон:</h3>
                <img
                    src="/1.jpg"
                    alt="Фон 1"
                    onClick={() => handleBackgroundChange('url(/1.jpg)') }
                    style={{ cursor: 'pointer', width: '100px', height: 'auto', marginRight: '10px' }}
                />
                <img
                    src="/2.jpg"
                    alt="Фон 2"
                    onClick={() => handleBackgroundChange('url(/2.jpg)') }
                    style={{ cursor: 'pointer', width: '100px', height: 'auto' }}
                />
            </div>
        </div>
    );
};

export default Settings;
```
### Объяснение кода

**1. Импорт библиотеки:**
> import React from 'react';: Импортируем React, чтобы использовать его функциональность.

**2. Компонент Settings:**
> Это функциональный компонент, который принимает один пропс — setBackground. Этот пропс представляет собой функцию, которая будет использоваться для изменения фона приложения.

**3. Функция handleBackgroundChange:**
> Эта функция принимает один аргумент image, который представляет собой строку с URL изображения. Она вызывает функцию setBackground, передавая ей значение image, чтобы обновить состояние фона в родительском компоненте.

**4. Возвращаемый JSX:**
> Заголовок: Отображает заголовок "Настройки".
> 
> Подзаголовок: Отображает подзаголовок "Выберите фон".
> 
> Изображения: Два изображения, которые пользователь может выбрать в качестве фона:
> 
>> Первое изображение:
> - src="/1.jpg": Путь к изображению.
> - alt="Фон 1": Альтернативный текст для изображения.
> - onClick={() => handleBackgroundChange('url(/1.jpg)')}: При клике на изображение вызывается функция handleBackgroundChange, которая устанавливает фон в url(/1.jpg).
> - style: Стили для изображения, включая курсор, ширину и отступ.
> - Второе изображение:
>  - Аналогично первому изображению, но с другим путем и текстом.

**5. Экспорт компонента:**
> export default Settings;: Экспортируем компонент Settings, чтобы его можно было использовать в других частях приложения.
---
# Настройка маршрутизации
1. **Установите React Router**:
> Установите библиотеку для маршрутизации:
```bash
npm install react-router-dom
```
---
**2. Настройте маршруты в `App.js`:**
> Импортируйте необходимые компоненты и настройте маршруты в **`App.js`**:

## **app.js**
```java
import React, { useState, useEffect } from 'react'; // Импортируем useEffect
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthForm from './components/AuthForm';
import TodoList from './components/TodoList';
import Profile from './components/Profile';
import Settings from './components/Settings';
import './index.css'; // Импортируем стили

const App = () => {
    const [background, setBackground] = useState('none'); // Состояние для фона

    // Используем useEffect для изменения стиля body
    useEffect(() => {
        document.body.style.background = background;
    }, [background]); // Зависимость от background

    return (
        <Router>
            <div className="container" style={{
                height: '100vh', // Высота на весь экран
                transition: 'background 0.3s ease' // Плавный переход при изменении фона
            }}>
                <h1></h1>
                <Routes>
                    <Route path="/" element={<AuthForm />} />
                    <Route path="/todos" element={<TodoList />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/settings" element={<Settings setBackground={setBackground} />} /> {/* Передаем setBackground */}
                </Routes>
            </div>
        </Router>
    );
};

export default App;
```
### Объяснение кода

**1. Импорт библиотек и компонентов:**
> React, useState, useEffect: Импортируем React и хуки для управления состоянием и побочными эффектами.
> BrowserRouter, Route, Routes: Импортируем компоненты для маршрутизации, которые позволяют создавать одностраничные приложения с несколькими страницами.
> Импортируем компоненты AuthForm, TodoList, Profile, Settings, которые представляют разные страницы приложения.
> Импортируем стили из файла index.css.

**2. Компонент App:**
> Это основной компонент приложения, который содержит маршрутизацию и управление состоянием.

**3. Состояние background:**
> const [background, setBackground] = useState('none');: Создаем состояние background, которое будет хранить цвет фона. Изначально оно установлено в 'none'.

**4. Использование useEffect:**
> useEffect(() => { ... }, [background]);: Этот хук выполняется каждый раз, когда изменяется значение background. Он устанавливает цвет фона для элемента body документа в соответствии с текущим состоянием background.

**5. Маршрутизация:**
> Router: Оборачивает приложение, позволяя использовать маршрутизацию.
> Routes: Определяет набор маршрутов.
>> Route: Определяет отдельный маршрут. Например:
> path="/": Главная страница, отображающая компонент AuthForm.
> path="/todos": Страница со списком задач, отображающая компонент TodoList.
> path="/profile": Страница профиля, отображающая компонент Profile.
> path="/settings": Страница настроек, где передается функция setBackground в компонент Settings, чтобы он мог изменять цвет фона.

**6. Стили:**
> style={{ height: '100vh', transition: 'background 0.3s ease' }}: Устанавливает высоту контейнера на 100% высоты экрана и добавляет плавный переход при изменении фона.

**7. Экспорт компонента:**
> export default App;: Экспортирует компонент app, что бы было использовать в других частях приложения.
---
# Тестирование приложения
**Запустите приложение**:
```bash
npm start
```
**После введение этой команды в терменале покажеться вот это:**
![](https://i.imgur.com/5k2BB94.png)
---
## Тест Авторизации т.е. **`AuthFoem.js`**
![](https://i.imgur.com/IWuDHTP.png)
---
## Тест страницы с действиями 
### **TodoList.js**
> Можно добавить или удалить дело одним нажатием
![](https://i.imgur.com/LaMR8Tx.png)
---
### **Profile.js**
![](https://i.imgur.com/yogv7wV.png)
---
### **Settings.js**
> Всё работет фоны меняются только по краям как и задумывалось.
![](https://i.imgur.com/zsc1txG.png)
