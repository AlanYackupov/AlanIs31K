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
