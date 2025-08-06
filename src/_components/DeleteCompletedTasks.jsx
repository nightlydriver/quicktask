import React from 'react';

const DeleteCompletedTasks = ({ tasks, setTasks }) => {
    const handleClearCompleted = () => {
        const confirmClear = window.confirm("Delete all completed tasks?");
        if (confirmClear) {
            setTasks(tasks.filter((task) => !task.completed));
        }
    };

    if (tasks.length === 0) return null;

    return (
        <div className="d-flex justify-content-center justify-content-lg-start w-100 mt-3">
            <button
                className="btn btn-danger delete-completed-btn"
                onClick={handleClearCompleted}
                disabled={!tasks.some((task) => task.completed)}
            >
                <i className="bi bi-trash-fill"></i> Delete Completed Tasks
            </button>
        </div>
    );
};

export default DeleteCompletedTasks;
