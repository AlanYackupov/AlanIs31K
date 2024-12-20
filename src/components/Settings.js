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

