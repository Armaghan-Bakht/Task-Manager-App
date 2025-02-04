import { useState, useEffect } from 'react';
import axios from 'axios';
import "../App.css"

const Home = () => {


    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({ title: '', description: '' });
    // Fetch tasks from the backend
    useEffect(() => {
        axios.get('https://task-manager-app-indol.vercel.app/api/tasks')
            .then(response => setTasks(response.data))
            .catch(err => console.log(err));
    }, []);
    // Add a new task
    const addTask = () => {
        axios.post('https://task-manager-app-indol.vercel.app/api/tasks', newTask)
            .then(response => {
                setTasks([...tasks, response.data]);
                setNewTask({ title: '', description: '' });
            })
            .catch(err => console.log(err));
    };
    // Delete a task
    const deleteTask = (id) => {
        axios.delete(`https://task-manager-app-indol.vercel.app/api/tasks/${id}`)
            .then(() => setTasks(tasks.filter(task => task._id !== id)))
            .catch(err => console.log(err));
    };


    return (
        <div className="task-container">
        <div className="task-card">
            <h1 className="task-title">Task Manager</h1>

            {/* Input Fields */}
            <input
                type="text"
                placeholder="Title"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                className="task-input"
            />
            <input
                type="text"
                placeholder="Description"
                value={newTask.description}
                onChange={(e) =>
                    setNewTask({ ...newTask, description: e.target.value })
                }
                className="task-input"
            />
            <button onClick={addTask} className="task-button">
                ➕ Add Task
            </button>

            {/* Task List */}
            <ul className="task-list">
                {tasks.map((task) => (
                    <li key={task._id} className="task-item">
                        <div>
                            <h3>{task.title}</h3>
                            <p>{task.description}</p>
                        </div>
                        <button onClick={() => deleteTask(task._id)} className="task-delete">
                        <i className="fa-solid fa-trash"></i> Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    </div>
    )
}

export default Home