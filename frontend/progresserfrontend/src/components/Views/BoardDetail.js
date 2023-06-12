import React, { useState, useEffect } from "react";
import axios from '../../axiosConfig';
import { useParams } from 'react-router-dom';

const BoardDetail = () => {
  const { boardId } = useParams();
  const [lists, setLists] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/lists/?board=${boardId}`, {
        headers: { Authorization: `JWT ${localStorage.getItem("access")}` },
      })
      .then((response) => setLists(response.data))
      .catch((error) => {
        console.error("There was an error retrieving the lists!", error);
      });

    axios
      .get(`http://localhost:8000/api/tasks/?list=${boardId}`, {
        headers: { Authorization: `JWT ${localStorage.getItem("access")}` },
      })
      .then((response) => setTasks(response.data))
      .catch((error) => {
        console.error("There was an error retrieving the tasks!", error);
      });
  }, [boardId]);

  return (
    <div>
      <h2>Lists</h2>
      {lists.map((list) => (
        <div key={list.id}>
          <h3>{list.name}</h3>
          {tasks.filter(task => task.list === list.id).map((task) => (
            <div key={task.id}>{task.name}</div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default BoardDetail;
