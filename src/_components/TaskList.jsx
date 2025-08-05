import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, setTasks }) {
  const toggleComplete = (id) => {
    const updated = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updated);
  };

  const deleteTask = (id) => {
    const updated = tasks.filter((task) => task.id !== id);
    setTasks(updated);
  };

  return (
    <ul className="list-group">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={toggleComplete}
          onDelete={deleteTask}
        />
      ))}
    </ul>
  );
}

export default TaskList;
