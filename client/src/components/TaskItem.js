import React from 'react';
import './TaskItem.css';

function TaskItem({ task, onEdit, onDelete, onChangeStatus }) {
  const handleStatusChange = (e) => {
    onChangeStatus(task._id, e.target.value);
  };

  return (
    <div className="task-item">
      <div>
        
        <span className="task-title">{task.title}</span>
        <span className="task-date">{new Date(task.dueDate).toLocaleDateString()}</span>

        <select
          className="task-status"
          value={task.status}
          onChange={handleStatusChange}
        >
          <option value="pending">CHUẨN BỊ</option>
          <option value="in-progress">ĐANG THỰC HIỆN</option>
          <option value="completed">HOÀN THÀNH</option>
        </select>
        {/* Changed inline style to className="task-date" */}
        
      </div>
      <div className="task-actions">
        <button onClick={onEdit} className="edit-btn">Sửa</button>
        <button onClick={onDelete} className="delete-btn">Xóa</button>
      </div>
    </div>
  );
}

export default TaskItem;