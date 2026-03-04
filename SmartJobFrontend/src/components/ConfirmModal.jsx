import "../styles/confirmmodal.css";
import { FaTriangleExclamation } from "react-icons/fa6";

function ConfirmModal({ id, onConfirm, onCancel }) {
  return (
    <div className="overlay">
      <div className="confirm-modal">
        <div className="warning-container">
          <FaTriangleExclamation className="warning-triangle" />
          <p className="warning-title">Are you sure?</p>
          <p className="warning-text">
            Do you really want to delete this job application?
          </p>
        </div>
        <hr className="divider-confirm-modal" />
        <div className="cancel-delete-btns">
          <button className="cancel-btn" onClick={onCancel}>
            Cancel
          </button>
          <button className="confirm-delete-btn" onClick={() => onConfirm(id)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
