import React, { useState } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, filteredTasks, setTasks, filter }) => {
    const [isAnyEditing, setIsAnyEditing] = useState(false);

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (!over || active.id === over.id) return;
        if (filter !== 'all') return;

        const oldIndex = tasks.findIndex((t) => String(t.id) === active.id);
        const newIndex = tasks.findIndex((t) => String(t.id) === over.id);

        const newOrder = arrayMove(tasks, oldIndex, newIndex);

        setTasks(newOrder);

    };

    return (
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={tasks.map(t => String(t.id))} strategy={verticalListSortingStrategy}>
                {filteredTasks.length === 0 ? (
                    <div className="text-center h4 my-4">
                        {tasks.length === 0
                            ? 'You have no tasks yet. Start by adding one!'
                            : 'No tasks match this filter.'}
                    </div>
                ) : (
                    <ul className="list-group mt-3">
                        {filteredTasks.map((task) => (
                            <TaskItem
                                key={task.id}
                                task={task}
                                tasks={tasks}
                                setTasks={setTasks}
                                isAnyEditing={isAnyEditing}
                                onEditStart={() => setIsAnyEditing(true)}
                                onEditEnd={() => setIsAnyEditing(false)}
                            />
                        ))}
                    </ul>
                )}
            </SortableContext>
        </DndContext>
    );
};

export default TaskList;
