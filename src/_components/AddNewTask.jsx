import React from 'react';

const AddNewTask = ({ input, setInput, handleAddTask }) => {
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && input) {
            e.preventDefault(); // Prevents form submission or newline in some browsers
            handleAddTask();
        }
    };

    return (
        <div className="input-group mb-4">
            {/* Input Field */}
            <input
                type="text"
                className="form-control"
                placeholder="Add a new task..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
            />

            {/* Add Button */}
            <button
                className={`btn btn-${input ? "primary" : "secondary"}`}
                disabled={!input}
                onClick={handleAddTask}
            >
                <i className="bi bi-plus-lg"></i> Add
            </button>
        </div>
    );
};

export default AddNewTask;
