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
