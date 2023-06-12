import React, { useState, useEffect } from "react";
import axios from '../../axiosConfig';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../index.css'; // ensure this css file is in the same directory

const BoardDetail = () => {
  const { boardId } = useParams();
  const [lists, setLists] = useState([]);
  const [tasks, setTasks] = useState([]);

  const convertNumberToString = (num) => {
    switch(num) {
      case 1:
        return 'one';
      case 2:
        return 'two';
      case 3:
        return 'three';
      case 4:
        return 'four';
      default:
        return '';
    }
  }

  const convertPriorityToString = (num) => {
    switch(num) {
      case 1:
        return 'low';
      case 2:
        return 'mid';
      case 3:
        return 'ASAP';
      default:
        return '';
    }
  }

  useEffect(() => {
    const fetchListsAndTasks = async () => {
      try {
        const listsResponse = await axios.get(`http://localhost:8000/api/lists/?board=${boardId}`, {
          headers: { Authorization: `JWT ${localStorage.getItem("access")}` },
        });
        setLists(listsResponse.data);

        const tasksArray = [];
        for (let list of listsResponse.data) {
          const tasksResponse = await axios.get(`http://localhost:8000/api/tasks/?list=${list.id}`, {
            headers: { Authorization: `JWT ${localStorage.getItem("access")}` },
          });
          tasksArray.push(...tasksResponse.data);
        }
        setTasks(tasksArray);
      } catch (error) {
        console.error("There was an error retrieving the data!", error);
      }
    }

    fetchListsAndTasks();
  }, [boardId]);

  return (
    <div className="main-page">
      <div className="content">
        {lists.map((list) => (
          <div className="list" key={list.id}>
            <div className="list-title">{list.name}</div>
            {tasks.filter(task => task.list === list.id).map((task) => (
              <div className="task" key={task.id}>
                <div className={`task-title priority-${convertPriorityToString(task.priority)}`}>{task.name}</div>
                <div className="difficulty-container-tasks">
                  {[...Array(4)].map((_, index) =>
                    <div key={index} className={`difficulty-bar difficulty-${convertNumberToString(index+1)} ${task.difficulty >= (index + 1) ? convertNumberToString(task.difficulty) : ''}`}></div>
                  )}
                </div>
              </div>
            ))}
            <Link to={`/AddTask?id_list=${list.id}`} style={{ textDecoration: 'none' }}>
              <div className="add_task">ADD</div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoardDetail;
