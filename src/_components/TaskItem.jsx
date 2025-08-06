import React, { useState } from 'react';

const TaskItem = ({ task, tasks, setTasks }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(task.text);

    const toggleComplete = () => {
        setTasks(
            tasks.map((t) =>
                t.id === task.id ? { ...t, completed: !t.completed } : t
            )
        );
    };

    const handleDelete = () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this task?");
        if (confirmDelete) {
            setTasks(tasks.filter((t) => t.id !== task.id));
        }
    };

    const handleEdit = () => {
        if (!task.completed) {
            setIsEditing(true);
        }
    };

    const handleSave = () => {
        if (editText.trim() === '') return;
        setTasks(
            tasks.map((t) =>
                t.id === task.id ? { ...t, text: editText } : t
            )
        );
        setIsEditing(false);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditText(task.text); // reset the input
    };

    const handleDoubleClick = (e) => {
        // If the double click target is the checkbox, do nothing
        if (e.target.type === 'checkbox') return;

        handleEdit();
    };


    return (
        <li
            className={`list-group-item d-flex justify-content-between align-items-center`}
            onDoubleClick={handleDoubleClick}
        >
            {isEditing ? (
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
                        onClick={(e) => e.preventDefault()} // block toggling via label click
                    >
                        {task.text}
                    </label>
                </div>
            )}

            <div className="d-flex flex-column flex-md-row gap-2">
                {isEditing ? (
                    <>
                        <button
                            className="btn btn-success"
                            style={{ width: '100px' }}
                            onClick={handleSave}
                        >
                            <i className="bi bi-check"></i> Save
                        </button>
                        <button
                            className="btn btn-secondary"
                            style={{ width: '100px' }}
                            onClick={handleCancel}
                        >
                            <i className="bi bi-x"></i> Cancel
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            className="btn btn-primary"
                            onClick={handleEdit}
                            disabled={task.completed}
                            title={
                                task.completed
                                    ? 'Cannot edit completed task'
                                    : 'Edit task'
                            }
                            style={{ width: '100px' }}
                        >
                            <i className="bi bi-pencil-fill"></i> Edit
                        </button>
                        <button
                            className="btn btn-danger"
                            style={{ width: '100px' }}
                            onClick={handleDelete}
                        >
                            <i className="bi bi-trash-fill"></i> Delete
                        </button>
                    </>
                )}
            </div>
        </li>
    );
}

export default TaskItem;
