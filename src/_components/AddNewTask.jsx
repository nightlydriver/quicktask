import React from 'react';

const AddNewTask = ({ input, setInput, handleAddTask }) => {
    return (
        <div className="input-group mb-4">
            <input
                type="text"
                className="form-control"
                placeholder="Add a new task..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button className="btn btn-primary" onClick={handleAddTask}>
                Add
            </button>
        </div>
    );
};

export default AddNewTask;