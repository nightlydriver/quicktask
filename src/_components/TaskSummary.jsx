import React from 'react';

const TaskSummary = ({ tasks }) => {
    const remaining = tasks.filter(task => !task.completed).length;

    return (
        <small className="text-muted">
            {remaining} task{remaining !== 1 ? 's' : ''} remaining
        </small>
    );
}

export default TaskSummary;