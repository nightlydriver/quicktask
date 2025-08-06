import React from 'react';

const DeleteCompletedTasks = ({ tasks, setTasks }) => {

    const handleClearCompleted = () => {
        const confirmClear = window.confirm("Delete all completed tasks?");
        if (confirmClear) {
            setTasks(tasks.filter((task) => !task.completed));
        }
    };

    if (tasks.length === 0) return null; // Hide if no tasks

    return (
        <>
            <button
                className="btn btn-danger mt-3"
                onClick={handleClearCompleted}
                disabled={!tasks.some((task) => task.completed)}
            >
                <i className="bi bi-trash-fill"></i> Delete Completed Tasks
            </button>
            <br />
        </>
    );

}

export default DeleteCompletedTasks;