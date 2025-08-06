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
        setTasks(tasks.filter((t) => t.id !== task.id));
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

    return (
        <li
            className={`list-group-item d-flex justify-content-between align-items-center ${task.completed ? 'text-decoration-line-through text-muted' : ''
                }`}
            onDoubleClick={handleEdit}
        >
            {isEditing ? (
                <input
                    className="form-control me-2"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSave();
                        if (e.key === 'Escape') handleCancel();
                    }}
                    autoFocus
                />
            ) : (
                <span
                    onClick={toggleComplete}
                    style={{ cursor: 'pointer' }}
                >
                    {task.text}
                </span>
            )}

            <div className="btn-group btn-group-sm">
                {isEditing ? (
                    <>
                        <button className="btn btn-success" onClick={handleSave}>
                            <i className="bi bi-check"></i>
                        </button>
                        <button className="btn btn-secondary" onClick={handleCancel}>
                            <i className="bi bi-x"></i>
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            className="btn btn-outline-secondary"
                            onClick={handleEdit}
                            disabled={task.completed}
                            title={
                                task.completed
                                    ? 'Cannot edit completed task'
                                    : 'Edit task'
                            }
                        >
                            <i className="bi bi-pencil"></i>
                        </button>
                        <button className="btn btn-outline-danger" onClick={handleDelete}>
                            <i className="bi bi-trash"></i>
                        </button>
                    </>
                )}
            </div>
        </li>
    );
}

export default TaskItem;
