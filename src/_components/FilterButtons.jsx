import React from 'react';

const FilterButtons = ({ tasks, filter, setFilter }) => {
    if (tasks.length === 0) return null;

    const types = ['all', 'active', 'completed'];

    return (
        <div className="mb-3">
            <div className="d-flex flex-wrap justify-content-center justify-content-lg-start w-100 gap-2">
                {types.map((type) => (
                    <button
                        key={type}
                        className={`btn btn-outline-primary filter-btn ${filter === type ? 'active' : ''}`}
                        onClick={() => setFilter(type)}
                    >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default FilterButtons;
