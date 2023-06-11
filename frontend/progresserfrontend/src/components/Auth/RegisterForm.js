import React, { useState } from 'react';
import axios from 'axios';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'username') {
      setUsername(value);
    } else if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('/api/register/', { username, email, password })
      .then((response) => {
        setMessage('Zarejestrowano pomyślnie');
        // Dodaj tutaj odpowiednie działania po rejestracji, np. przekierowanie do strony logowania
      })
      .catch((error) => {
        setMessage('Wystąpił błąd podczas rejestracji');
        console.error(error);
      });
  };

  return (
    <div>
      <h2>Formularz rejestracji</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Nazwa użytkownika:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="email">Adres email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="password">Hasło:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Zarejestruj się</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default RegisterForm;
