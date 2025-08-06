import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, setTasks }) => {

    return (
        <>
            <ul className="list-group">
                {tasks.map((task) => (
                    <TaskItem key={task.id} task={task} setTasks={setTasks} tasks={tasks} />
                ))}
            </ul>
        </>
    );
}

export default TaskList;
