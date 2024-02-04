import React from 'react';
import './style.css';

const CommonModal = ({ message, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <p>{message}</p>
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default CommonModal;
