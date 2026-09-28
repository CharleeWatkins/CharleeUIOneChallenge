import { Trash2 } from 'lucide-react';

export const DeleteModal = ({ isOpen, onClose, onConfirm, linkTitle }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content delete-modal-content">
        
        <div className="delete-icon-wrapper">
          <Trash2 size={30} />
        </div>

        <h2 className="delete-title">Delete Link?</h2>
        
        <p className="delete-text">
          Are you sure you want to delete <strong>{linkTitle}</strong>? This action cannot be undone.
        </p>

        <div className="delete-modal-actions">
          <button 
            className="btn-cancel-outline" 
            onClick={onClose}
          >
            Cancel
          </button>
          <button 
            className="btn-danger" 
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>

      </div>
    </div>
  );
};