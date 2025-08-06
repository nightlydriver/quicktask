import React from 'react';

const TaskSummary = ({ tasks }) => {
    const remaining = tasks.filter(task => !task.completed).length;

    if (tasks.length === 0) return null; // Hide if no tasks

    return (
        <div className="mt-3">
            <span className="h4">
                {remaining === 0
                    ? 'All tasks completed 🎉'
                    : `${remaining} task${remaining > 1 ? 's' : ''} remaining`}
            </span>
        </div>
    );
}

export default TaskSummary;