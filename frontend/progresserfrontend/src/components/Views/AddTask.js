import React, { useState } from 'react';
import axios from '../../axiosConfig';
import { useNavigate, useLocation } from 'react-router-dom';
import '../index.css';

const AddTask = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [taskName, setTaskName] = useState('');
    const [priority, setPriority] = useState(0);
    const [difficulty, setDifficulty] = useState(0);
    const listId = new URLSearchParams(location.search).get("id_list");

    const handlePriorityClick = (prio) => {
        setPriority(prio);
    }

    const handleDifficultyClick = (diff) => {
        setDifficulty(diff);
    }

    const handleTaskNameChange = (e) => {
        setTaskName(e.target.value);
    }

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

    const handleCreateTask = async () => {
        if(taskName && priority > 0 && difficulty > 0){
            const taskData = {
                name: taskName,
                priority: priority,
                difficulty: difficulty,
                list: listId
            }
            try {
                const response = await axios.post('http://localhost:8000/api/tasks/', taskData, {
                    headers: { Authorization: `JWT ${localStorage.getItem("access")}` }
                });
                if(response.status === 201){
                    navigate('/boards');
                }
            } catch (error) {
                console.error('There was an error creating the task!', error);
            }
        }
    }

    return (
        <div className="main-page">
            <div className="add">
                <div className="content-form">
                    <div className="add_task_text">Task name:</div>
                    <input type="text" id="taskName" onChange={handleTaskNameChange}/>
                </div>

                <div className="add_task_text">Priority</div>
                <div className="priority-container">
                    <div className={`priority-item priority-low ${priority === 1 ? 'selected' : ''}`} onClick={() => handlePriorityClick(1)}>Low</div>
                    <div className={`priority-item priority-mid ${priority === 2 ? 'selected' : ''}`} onClick={() => handlePriorityClick(2)}>Medium</div>
                    <div className={`priority-item priority-ASAP ${priority === 3 ? 'selected' : ''}`} onClick={() => handlePriorityClick(3)}>ASAP</div>
                </div>

                <div className="add_task_text">Difficulty</div>
                <div className="difficulty-container">
                    {[...Array(4)].map((_, index) =>
                        <div key={index}
                             className={`difficulty-bar difficulty-${convertNumberToString(index+1)} 
                             ${(index+1) <= difficulty ? 'filled' : ''}`}
                             onClick={() => handleDifficultyClick(index + 1)}></div>
                    )}
                </div>

                <button className="AddBtn" onClick={handleCreateTask}>Create Task</button>
            </div>
        </div>
    )
}

export default AddTask;
