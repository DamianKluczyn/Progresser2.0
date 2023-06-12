import React, { useState } from 'react';
import axios from '../../axiosConfig';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'username') {
      setUsername(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const navigate = useNavigate();

  const handleRegister = () => {
    navigate('/register');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:8000/auth/jwt/create/', { username, password })
      .then((response) => {
        setMessage('Zalogowano pomyślnie');
        const token = response.data.access;
        localStorage.setItem('access', token);
        localStorage.setItem('refresh', response.data.refresh);
        axios.defaults.headers.common['Authorization'] = `JWT ${token}`;
        navigate('/boards');
      })
      .catch((error) => {
        setMessage('Niepoprawne dane logowania');
        console.error(error);
      });

  };

  return (
    <div className="main-page">
        <div className="content">
            <div className="login-container">
              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="username" className="login_text">Nazwa użytkownika:</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={username}
                    onChange={handleInputChange}
                    className="login"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="login_text">Hasło:</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={handleInputChange}
                    className="login"
                  />
                </div>
                <button type="submit" className="LoginBtn">Zaloguj się</button>
              </form>
              {message && <p>{message}</p>}
              <button className="RegisterBtn" onClick={handleRegister}>
                Zarejestruj się
              </button>
            </div>
        </div>
    </div>
  );
};

export default LoginForm;
