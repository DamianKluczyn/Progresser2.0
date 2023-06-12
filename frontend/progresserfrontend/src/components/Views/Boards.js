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
    <div className="boards-container">
      {boards.map((board) => (
        <div key={board.id} className="board">
          <h3><Link to={`/boards/${board.id}`}>{board.title}</Link></h3>
        </div>
      ))}
    </div>
  );
};

export default Boards;
