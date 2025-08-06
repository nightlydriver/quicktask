import React, { useState } from 'react';

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

            {/* === Input Section === */}
            <section>
                <AddNewTask input={input} setInput={setInput} handleAddTask={handleAddTask} />
            </section>

            {/* === Controls Section (Filter + Delete) === */}
            <section className="mt-3 text-center">
                <FilterButtons tasks={tasks} filter={filter} setFilter={setFilter} />
                <DeleteCompletedTasks tasks={tasks} setTasks={setTasks} />
            </section>

            {/* === Summary Section === */}
            <section className="mt-3">
                <TaskSummary tasks={tasks} />
            </section>

            {/* === Task List Section === */}
            <section className="mt-3">
                <TaskList tasks={tasks} filteredTasks={filteredTasks} setTasks={setTasks} />
            </section>
        </div>
    );
}

export default App;