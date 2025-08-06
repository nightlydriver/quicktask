import React, { useState, useEffect } from 'react';

// Hooks
import useLocalStorage from 'hooks/useLocalStorage';

// Components
import TaskList from '_components/TaskList';
import FilterButtons from '_components/FilterButtons';
import TaskSummary from '_components/TaskSummary';
import AddNewTask from '_components/AddNewTask';
import DeleteCompletedTasks from '_components/DeleteCompletedTasks';

// Custom Stylesheet
import 'styles/theme.css';

const App = () => {
    // Gets the tasks and current filter state from local storage
    const [tasks, setTasks] = useLocalStorage('quicktask-tasks', []);
    const [filter, setFilter] = useLocalStorage('filter', 'all'); // 'all', 'active', 'completed'

    // Sets the value for the input field
    const [input, setInput] = useState('');

    // Save tasks to localStorage on every change
    useEffect(() => {
        localStorage.setItem('quicktask-tasks', JSON.stringify(tasks));
    }, [tasks]);

    // Handles adding tasks
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

    // Select only tasks filtered to active or completed, else show all
    const filteredTasks = tasks.filter((task) => {
        if (filter === 'active') return !task.completed;
        if (filter === 'completed') return task.completed;
        return true; // 'all'
    });

    return (
        <div className="container py-4">
            <h1 className="display-1 mb-4 text-center">📝QuickTask</h1>

            {/* Add New Task */}
            <AddNewTask input={input} setInput={setInput} handleAddTask={handleAddTask} />
            <br />

            {/* Filter Buttons */}
            <FilterButtons tasks={tasks} filter={filter} setFilter={setFilter} />
            <br />

            {/* Remaining Tasks */}
            <TaskSummary tasks={tasks} />

            {/* Delete Completed Tasks */}
            <DeleteCompletedTasks tasks={tasks} setTasks={setTasks}/>
            <br />

            {/* Task List */}
            <TaskList tasks={tasks} filteredTasks={filteredTasks} setTasks={setTasks} />
        </div>
    );
}

export default App;