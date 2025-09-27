import React, { useState, useEffect } from 'react';
import './TaskEditForm.css'; // Import file CSS

function TaskEditForm({ task, onSave, onCancel }) {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('pending');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDueDate(task.dueDate ? task.dueDate.slice(0, 10) : '');
      setStatus(task.status || 'pending');
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !dueDate) return;
    onSave(task._id, { title, dueDate, status });
  };

  if (!task) return null;

  return (
    <form onSubmit={handleSubmit} className="task-edit-form-container">
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Sửa tiêu đề nhiệm vụ..."
        className="edit-input edit-input-title"
      />
      <input
        type="date"
        value={dueDate}
        onChange={e => setDueDate(e.target.value)}
        className="edit-input"
      />
      <select
        value={status}
        onChange={e => setStatus(e.target.value)}
        className="edit-input edit-select"
      >
        <option value="pending">Đang làm</option>
        <option value="in-progress">Đang thực hiện</option>
        <option value="completed">Hoàn thành</option>
      </select>
      <button type="submit" className="edit-btn save-btn">
        Lưu
      </button>
      <button
        type="button"
        onClick={onCancel}
        className="edit-btn cancel-btn"
      >
        Hủy
      </button>
    </form>
  );
}

export default TaskEditForm;