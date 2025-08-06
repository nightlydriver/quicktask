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

    // Theme: 'light' | 'dark' | 'auto'
    const [theme, setTheme] = useLocalStorage('theme', 'auto');
    const [resolvedTheme, setResolvedTheme] = useState('light');

    // Update <html> based on theme
    useEffect(() => {
        const applyTheme = () => {
            const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            const effectiveTheme = theme === 'auto' ? (systemPrefersDark ? 'dark' : 'light') : theme;
            setResolvedTheme(effectiveTheme);
            document.documentElement.setAttribute('data-theme', effectiveTheme);
        };

        applyTheme();

        // Re-evaluate if system changes and you're in auto mode
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        if (theme === 'auto') {
            mediaQuery.addEventListener('change', applyTheme);
        }

        return () => mediaQuery.removeEventListener('change', applyTheme);
    }, [theme]);

    const cycleTheme = () => {
        setTheme(prev =>
            prev === 'light' ? 'dark' :
                prev === 'dark' ? 'auto' :
                    'light'
        );
    };

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
        <div className="container app-container py-4">
            <h1 className="display-1 mb-4 text-center">📝QuickTask</h1>

            {/* === Input Section === */}
            <section>
                <AddNewTask input={input} setInput={setInput} handleAddTask={handleAddTask} />
            </section>

            {/* === Controls Section (Filter + Delete) === */}
            <section className="mt-3">
                <FilterButtons tasks={tasks} filter={filter} setFilter={setFilter} />
                <DeleteCompletedTasks tasks={tasks} setTasks={setTasks} />
            </section>

            {/* === Summary Section === */}
            <section className="mt-3">
                <TaskSummary tasks={tasks} />
            </section>

            {/* === Task List Section === */}
            <section className="mt-3">
                <TaskList tasks={tasks} filteredTasks={filteredTasks} setTasks={setTasks} filter={filter} />
            </section>

            {/* === Floating Theme Toggle Button === */}
            <button
                className="theme-toggle-button"
                onClick={cycleTheme}
                title={`Switch to ${theme === 'light' ? 'Dark' : theme === 'dark' ? 'Auto' : 'Light'} Mode`}
                aria-label="Toggle theme"
            >
                <i className={`bi ${theme === 'light' ? 'bi-sun' : theme === 'dark' ? 'bi-moon-stars' : 'bi-laptop'} `}></i>
            </button>
        </div>
    );
}

export default App;