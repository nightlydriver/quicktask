import React, { useState } from 'react';
import ConfirmDialog from './ConfirmDialog';

const TaskItem = ({ task, tasks, setTasks }) => {
    // State to track if the task is being edited
    const [isEditing, setIsEditing] = useState(false);

    // State to hold the current edited text value
    const [editText, setEditText] = useState(task.text);

    // State to control visibility of the delete confirmation dialog
    const [showConfirm, setShowConfirm] = useState(false);

    // Toggle completion status of the task
    const toggleComplete = () => {
        setTasks(
            tasks.map((t) =>
                t.id === task.id ? { ...t, completed: !t.completed } : t
            )
        );
    };

    // Show confirmation dialog when delete button is clicked
    const handleDelete = () => {
        setShowConfirm(true);
    };

    // Confirm deletion: remove task from the list and hide dialog
    const confirmDelete = () => {
        setTasks(tasks.filter((t) => t.id !== task.id));
        setShowConfirm(false);
    };

    // Cancel deletion: just hide confirmation dialog
    const cancelDelete = () => {
        setShowConfirm(false);
    };

    // Enable editing mode if task is not completed
    const handleEdit = () => {
        if (!task.completed) {
            setIsEditing(true);
        }
    };

    // Save edited text if not empty, then exit editing mode
    const handleSave = () => {
        if (editText.trim() === '') return;
        setTasks(
            tasks.map((t) =>
                t.id === task.id ? { ...t, text: editText } : t
            )
        );
        setIsEditing(false);
    };

    // Cancel editing, revert input field to original text
    const handleCancel = () => {
        setIsEditing(false);
        setEditText(task.text);
    };

    // On double-click, trigger editing unless checkbox was clicked
    const handleDoubleClick = (e) => {
        if (e.target.type === 'checkbox') return;
        handleEdit();
    };

    return (
        <>
            {/* Delete confirmation dialog */}
            {showConfirm && (
                <ConfirmDialog
                    title="Delete Task"
                    message={`Are you sure you want to delete the task? (${task.text})`}
                    handleConfirm={confirmDelete}
                    handleCancel={cancelDelete}
                />
            )}

            <li
                className="list-group-item d-flex justify-content-between align-items-center"
                onDoubleClick={handleDoubleClick}
            >
                {isEditing ? (
                    // Edit mode: show input with save/cancel controls
                    <div className="flex-grow-1 me-2">
                        <input
                            className="form-control"
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') handleSave();
                                if (e.key === 'Escape') handleCancel();
                            }}
                            autoFocus
                        />
                    </div>
                ) : (
                    // Display mode: checkbox + task text label
                    <div className="d-flex align-items-center flex-grow-1 me-3">
                        <input
                            type="checkbox"
                            className="form-check-input checkbox"
                            id={`check-${task.id}`}
                            checked={task.completed}
                            onChange={toggleComplete}
                        />
                        <label
                            className={`mb-0 ms-3 ${task.completed ? 'text-success text-decoration-line-through' : 'fw-bold'}`}
                            style={{ cursor: 'default' }}
                            onClick={(e) => e.preventDefault()} // prevent toggling by label click
                        >
                            {task.text}
                        </label>
                    </div>
                )}

                {/* Buttons for editing/saving or editing/deleting */}
                <div className="d-flex flex-column flex-md-row gap-2">
                    {isEditing ? (
                        <>
                            <button
                                className="btn btn-success task-btn"
                                onClick={handleSave}
                            >
                                <i className="bi bi-check"></i> Save
                            </button>
                            <button
                                className="btn btn-secondary task-btn"
                                onClick={handleCancel}
                            >
                                <i className="bi bi-x"></i> Cancel
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                className={`btn btn-${task.completed ? "secondary" : "primary"} task-btn`}
                                onClick={handleEdit}
                                disabled={task.completed}
                                title={task.completed ? 'Cannot edit completed task' : 'Edit task'}
                            >
                                <i className="bi bi-pencil-fill"></i> Edit
                            </button>
                            <button
                                className="btn btn-danger task-btn"
                                onClick={handleDelete}
                            >
                                <i className="bi bi-trash-fill"></i> Delete
                            </button>
                        </>
                    )}
                </div>
            </li>
        </>
    );
}

export default TaskItem;
