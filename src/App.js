import React, { useState, useEffect } from 'react';
import TaskList from './_components/TaskList';
import useLocalStorage from './hooks/useLocalStorage';

function App() {
    const [tasks, setTasks] = useLocalStorage('quicktask-tasks', []);
    const [input, setInput] = useState('');

    // Save tasks to localStorage on every change
    useEffect(() => {
        localStorage.setItem('quicktask-tasks', JSON.stringify(tasks));
    }, [tasks]);

    const handleAddTask = () => {
        if (input.trim() === '') return;
        const newTask = {
            id: Date.now(),
            text: input,
            completed: false,
        };
        setTasks([newTask, ...tasks]);
        setInput('');
    };

    return (
        <div className="container py-5">
            <h1 className="mb-4 text-center">📝 QuickTask</h1>

            <div className="input-group mb-4">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Add a new task..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button className="btn btn-primary" onClick={handleAddTask}>
                    Add
                </button>
            </div>

            <TaskList tasks={tasks} setTasks={setTasks} />
        </div>
    );
}

export default App;