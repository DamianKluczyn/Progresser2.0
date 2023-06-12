import React, { useState } from 'react';
import axios from '../../axiosConfig';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

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
      .post('http://localhost:8000/auth/users/', { username, password, email })
      .then((response) => {
        setMessage('Rejestracja pomyślna');
        localStorage.setItem('access', response.data.access);
        localStorage.setItem('refresh', response.data.refresh);
        navigate('/');
      })
      .catch((error) => {
        setMessage('Wystąpił błąd podczas rejestracji');
        console.error(error);
      });
  };

  return (
    <div className="main-page">
        <div className="content">
            <div className="register-container">
              <form onSubmit={handleSubmit}>

                <div>
                  <label htmlFor="email" className="register_text">Adres email:</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={handleInputChange}
                    className="register"
                  />
                </div>

                <div>
                  <label htmlFor="username" className="register_text">Nazwa użytkownika:</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={username}
                    onChange={handleInputChange}
                    className="register"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="register_text">Hasło:</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={handleInputChange}
                    className="register"
                  />
                </div>

                <button type="submit" className="RegisterBtn">Zarejestruj się</button>
              </form>
              {message && <p>{message}</p>}
            </div>
        </div>
    </div>
  );
};

export default RegisterForm;
