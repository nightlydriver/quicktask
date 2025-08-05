import React, { useState } from 'react';
import TaskList from './_components/TaskList';

function App() {
    const [tasks, setTasks] = useState([]);
    const [input, setInput] = useState('');

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
