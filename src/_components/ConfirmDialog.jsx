import React from 'react';

const ConfirmDialog = ({ title, message, handleConfirm, handleCancel, closing }) => {
    return (
        <div className="dialog-overlay">
            <div className={`dialog ${closing ? 'dialog-exit' : ''}`}>
                {/* Title */}
                <h3>
                    <i className="bi bi-exclamation-triangle-fill"></i> {title}
                </h3>

                {/* Message */}
                <p>{message}</p>

                {/* Dialog Buttons */}
                <div className="dialog-buttons">
                    {/* Confirm Button */}
                    <button onClick={handleConfirm} className="btn btn-danger">
                        <i className="bi bi-check"></i> Yes
                    </button>

                    {/* Cancel Button */}
                    <button onClick={handleCancel} className="btn btn-secondary">
                        <i className="bi bi-x"></i> No
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmDialog;