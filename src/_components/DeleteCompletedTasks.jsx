import React, { useState } from 'react';
import ConfirmDialog from './ConfirmDialog'; // make sure path is correct

const DeleteCompletedTasks = ({ tasks, setTasks }) => {
    const [showConfirm, setShowConfirm] = useState(false);

    // Show the dialog when delete button is clicked
    const handleClearCompleted = () => {
        setShowConfirm(true);
    };

    // Confirm deletion, remove completed tasks, close dialog
    const confirmClear = () => {
        setTasks(tasks.filter((task) => !task.completed));
        setShowConfirm(false);
    };

    // Cancel deletion, just close dialog
    const cancelClear = () => {
        setShowConfirm(false);
    };

    // Hide component if no tasks at all
    if (tasks.length === 0) return null;

    return (
        <>
            {/* Confirmation Dialog */}
            {showConfirm && (
                <ConfirmDialog
                    title="Delete Completed Tasks"
                    message="Are you sure you want to delete all completed tasks?"
                    handleConfirm={confirmClear}
                    handleCancel={cancelClear}
                />
            )}

            <div className="d-flex justify-content-center justify-content-lg-start w-100 mt-3">
                <button
                    className="btn btn-danger delete-completed-btn"
                    onClick={handleClearCompleted}
                    disabled={!tasks.some((task) => task.completed)}
                >
                    <i className="bi bi-trash-fill"></i> Delete Completed Tasks
                </button>
            </div>
        </>
    );
};

export default DeleteCompletedTasks;
