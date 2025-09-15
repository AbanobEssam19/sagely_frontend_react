import React from "react";
import "../../assets/css/confirmModal.css";

function ConfirmModal({name, setShowConfirm, deleteFunction}) {
  return (
    <div className="modal-overlay">
      <div className="confirm-modal">
        <h3>Confirm Delete</h3>
        <p>Are you sure you want to delete this {name}?</p>
        <div className="modal-actions">
          <button
            className="btn-delete"
            onClick={deleteFunction}
          >
            Yes, Delete
          </button>
          <button className="btn-cancel" onClick={() => setShowConfirm(false)}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
