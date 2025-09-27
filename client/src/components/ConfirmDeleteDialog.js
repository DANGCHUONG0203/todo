import React from 'react';
import './ConfirmDeleteDialog.css'; // Import file CSS

function ConfirmDeleteDialog({ open, onConfirm, onCancel, task }) {
  if (!open) return null;
  return (
    <div className="dialog-backdrop">
      <div className="dialog-content">
        <p className="dialog-message">
              Bạn có chắc muốn xóa nhiệm vụ 
              <strong className="task-title-confirm">{task?.title}</strong> 
              không?
          </p>
        <div className="dialog-actions">
          <button onClick={onCancel} className="dialog-btn cancel-btn">Hủy</button>
          <button onClick={onConfirm} className="dialog-btn confirm-btn">Xóa</button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDeleteDialog;