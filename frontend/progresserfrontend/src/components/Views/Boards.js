import React, { useState, useEffect } from "react";
import axios from '../../axiosConfig';
//import "./Boards.css";

const Boards = () => {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    axios
      .get("/api/boards/", {
        headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
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
          <h3>{board.title}</h3>
        </div>
      ))}
    </div>
  );
};

export default Boards;
