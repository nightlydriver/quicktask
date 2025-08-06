import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, filteredTasks, setTasks }) => {

    return (
        filteredTasks.length === 0 ? (
            <div className="text-center h4 my-4">
                {tasks.length === 0
                    ? 'You have no tasks yet. Start by adding one!'
                    : 'No tasks match this filter.'}
            </div>
        ) : (
            <ul className="list-group">
                {filteredTasks.map((task) => (
                    <TaskItem key={task.id} task={task} setTasks={setTasks} tasks={tasks} />
                ))}
            </ul>
        )
    );
}

export default TaskList;
