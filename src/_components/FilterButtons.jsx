import React from 'react';

const FilterButtons = ({ filter, setFilter }) => {
    return (
        <div className="btn-group mb-3" role="group">
            {['all', 'active', 'completed'].map((type) => (
                <button
                    key={type}
                    className={`btn btn-outline-primary btn-filter ${filter === type ? 'active' : ''}`}
                    onClick={() => setFilter(type)}
                >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
            ))}
        </div>
    );
}

export default FilterButtons;