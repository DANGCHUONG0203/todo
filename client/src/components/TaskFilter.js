import React from 'react';
import './TaskFilter.css'; // Import file CSS vào đây

function TaskFilter({ status, onChange }) {
  return (
    <div className="task-filter-container">
      <select
        value={status}
        onChange={e => onChange(e.target.value)}
        className="task-filter-select"
      >
        <option value="all">TẤT CẢ</option>
        <option value="pending">CHUẨN BỊ</option>
        <option value="in-progress">ĐANG THỰC HIỆN</option>
        <option value="completed">HOÀN THÀNH</option>
      </select>
    </div>
  );
}

export default TaskFilter;