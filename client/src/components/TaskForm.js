import React, { useState } from 'react';
import './TaskForm.css' // Import file CSS

function TaskForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('pending');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !dueDate) return;
    onAdd(title, dueDate, status);
    setTitle('');
    setDueDate('');
    setStatus('pending');
  };

  return (
    <form onSubmit={handleSubmit} className="task-form-container">
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Tiêu đề nhiệm vụ"
        className="task-input task-input-title"
      />
      <input
        type="date"
        value={dueDate}
        onChange={e => setDueDate(e.target.value)}
        className="task-input"
      />
      <select
        value={status}
        onChange={e => setStatus(e.target.value)}
        className="task-input task-select"
      >
        <option value="pending">ĐANG LÀM</option>
        <option value="in-progress">ĐANG THỰC HIỆN</option>
        <option value="completed">HOÀN THÀNH</option>
      </select>
      <button type="submit" className="task-add-btn">
        Thêm
      </button>
    </form>
  );
}

export default TaskForm;