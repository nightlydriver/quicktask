import React from 'react';

const FilterButtons = ({ tasks, filter, setFilter }) => {

    if (tasks.length === 0) return null; // Hide if no tasks

    return (
        <div className="btn-group mb-3" role="group">
            {['all', 'active', 'completed'].map((type) => (
                <button
                    key={type}
                    className={`btn btn-outline-primary btn-filter ${filter === type ? 'selected' : ''}`}
                    onClick={() => setFilter(type)}
                >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
            ))}
        </div>
    );
}

export default FilterButtons;