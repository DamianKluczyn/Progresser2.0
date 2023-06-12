import React, { useState } from 'react';
import axios from '../../axiosConfig';
import { useNavigate } from 'react-router-dom';

const AddBoard = () => {
  const [boardName, setBoardName] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setBoardName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:8000/api/boards/create/', { title: boardName }, {
        headers: { Authorization: `JWT ${localStorage.getItem("access")}` }
      })
      .then((response) => {
        setMessage('Tablica została dodana pomyślnie');
        navigate('/boards');
      })
      .catch((error) => {
        setMessage('Wystąpił błąd podczas dodawania tablicy');
        console.error(error);
      });
  };

  return (
    <div className="main-page">
        <div className="content">
            <div className="add">
              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="boardName" className="add_task_text">Nazwa tablicy:</label>
                  <input
                    type="text"
                    id="boardName"
                    value={boardName}
                    onChange={handleInputChange}
                    className="board-name-input"
                  />
                </div>
                <button type="submit" className="AddBtn">Dodaj</button>
              </form>
              {message && <p>{message}</p>}
            </div>
        </div>
    </div>
  );
};

export default AddBoard;
