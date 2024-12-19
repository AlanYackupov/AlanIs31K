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
