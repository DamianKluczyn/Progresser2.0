import React, { useState, useEffect } from "react";
import axios from '../../axiosConfig';
import { Link } from 'react-router-dom';
//import "./Boards.css";

const Boards = () => {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/boards/", {
        headers: { Authorization: `JWT ${localStorage.getItem("access")}` },
      })
      .then((response) => setBoards(response.data))
      .catch((error) => {
        console.error("There was an error retrieving the boards!", error);
      });
  }, []);


  return (
    <div className="main-page">
      <div className="content">
          {boards.map((board) => (
              <div className="board">
                <Link to={`/boards/${board.id}`} style={{ textDecoration: 'none' }}>
                <div className="red-section">
                  <div className="board-title">
                    {board.title}
                  </div>
                </div>
                </Link>
              </div>
          ))}
          <div className="board">
              <div className="red-section">
                  <Link to={`/AddBoard/`} style={{ textDecoration: 'none' }}>
                      <button className="add_board" type="submit"></button>
                  </Link>
              </div>
          </div>
      </div>
    </div>
  );
};

export default Boards;
