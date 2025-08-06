import React, { useState, useRef, useEffect } from 'react';
import ConfirmDialog from './ConfirmDialog';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const TaskItem = ({ task, tasks, setTasks, isAnyEditing, onEditStart, onEditEnd }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: String(task.id) });

    // Use fallback transition so animation never breaks
    const style = {
        transform: CSS.Transform.toString(transform),
        transition: transition,  // fallback transition
        zIndex: isDragging ? 999 : undefined,
    };

    // State to track if the task is being edited
    const [isEditing, setIsEditing] = useState(false);

    // Input reference
    const inputRef = useRef(null);

    // When entering edit mode, auto-select the text
    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.select();
        }
    }, [isEditing]);

    const startEditing = () => {
        if (!task.completed) {
            setIsEditing(true);
            onEditStart();
        }
    };

    const stopEditing = () => {
        setIsEditing(false);
        onEditEnd();
    };

    // State to hold the current edited text value
    const [editText, setEditText] = useState(task.text);

    // State to control visibility of the delete confirmation dialog
    const [showConfirm, setShowConfirm] = useState(false);

    // State for task that has just been completed
    const [justCompleted, setJustCompleted] = useState(false);

    // Toggle completion status of the task
    const toggleComplete = () => {
        const wasIncomplete = !task.completed;

        setTasks(
            tasks.map((t) =>
                t.id === task.id ? { ...t, completed: !t.completed } : t
            )
        );

        if (wasIncomplete) {
            if (showSaved) setShowSaved(false); // prevent overlap
            setJustCompleted(true);
            setTimeout(() => setJustCompleted(false), 1200); // matches animation time
        }
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
            startEditing();
        }
    };

    // State for showing saved animation
    const [showSaved, setShowSaved] = useState(false);

    // Save edited text if not empty, then exit editing mode
    const handleSave = () => {
        if (editText.trim() === '') return;

        setTasks(
            tasks.map((t) =>
                t.id === task.id ? { ...t, text: editText } : t
            )
        );

        setIsEditing(false);
        onEditEnd?.(); // if passed from parent

        setShowSaved(true);
        setTimeout(() => setShowSaved(false), 2000); // Hide after 2s
    };

    // Cancel editing, revert input field to original text
    const handleCancel = () => {
        stopEditing();
        setEditText(task.text);
    };

    // On double-click, trigger editing unless checkbox was clicked
    const handleDoubleClick = (e) => {
        if (e.target.type === 'checkbox') return;
        if (!isAnyEditing) handleEdit();
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
                ref={setNodeRef}
                style={style}
                {...attributes}
                {...(!isAnyEditing && listeners)}
            >
                {isEditing ? (
                    // Edit mode: show input with save/cancel controls
                    <div className="flex-grow-1 me-2">
                        <input
                            ref={inputRef}
                            className="form-control"
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !(editText.trim() === task.text.trim() || !editText.trim())) handleSave();
                                if (e.key === 'Escape') handleCancel();
                            }}
                            onPointerDown={(e) => e.stopPropagation()} // Prevent drag start
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
                            disabled={isAnyEditing}
                            onChange={toggleComplete}
                            title={task.completed ? "Mark as undone" : "Mark as done"}
                            onPointerDown={(e) => e.stopPropagation()} // Prevent drag start on checkbox
                        />
                        <label
                            className={`mb-0 ms-3 ${task.completed ? 'text-success text-decoration-line-through' : 'fw-bold'}`}
                            style={{ cursor: 'default' }}
                            onClick={(e) => e.preventDefault()} // prevent toggling by label click
                        >
                            {task.text}
                        </label>

                        {/* Animation for marking as complete */}
                        {justCompleted && (
                            <i className="bi bi-check-circle-fill text-success ms-3 pop-fade"></i>
                        )}

                        {/* Animation for saving the task name (do not show both at the same time) */}
                        {!justCompleted && showSaved && (
                            <span className="ms-2 text-success fw-semibold small fade-in">
                                Saved!
                            </span>
                        )}
                    </div>
                )}

                {/* Buttons for editing/saving or editing/deleting */}
                <div className="d-flex flex-column flex-md-row gap-2">
                    {isEditing ? (
                        <>
                            <button
                                className={`btn btn-${editText.trim() === task.text.trim() || !editText.trim() ? "secondary" : "success"} task-btn`}
                                onClick={handleSave}
                                disabled={editText.trim() === task.text.trim() || !editText.trim()}
                                onPointerDown={(e) => e.stopPropagation()}
                                title={
                                    !editText.trim()
                                        ? "Cannot save empty task"
                                        : editText.trim() === task.text.trim()
                                            ? "No changes to save"
                                            : "Save changes"
                                }
                            >
                                <i className="bi bi-check"></i> Save
                            </button>
                            <button
                                className="btn btn-secondary task-btn"
                                onClick={handleCancel}
                                onPointerDown={(e) => e.stopPropagation()} // Prevent drag start
                                title="Discard changes"
                            >
                                <i className="bi bi-x"></i> Cancel
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                className={`btn btn-${task.completed || isAnyEditing ? "secondary" : "primary"} task-btn`}
                                onClick={handleEdit}
                                disabled={task.completed || isAnyEditing}
                                title={task.completed ? 'Cannot edit completed task' : 'Edit task'}
                                onPointerDown={(e) => e.stopPropagation()} // Prevent drag start
                            >
                                <i className="bi bi-pencil-fill"></i> Edit
                            </button>
                            <button
                                className={`btn btn-${isAnyEditing ? "secondary" : "danger"} task-btn`}
                                onClick={handleDelete}
                                disabled={isAnyEditing}
                                title="Delete task"
                                onPointerDown={(e) => e.stopPropagation()} // Prevent drag start
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
