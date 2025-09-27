import React, { useState, useEffect } from 'react';
import TaskStats from './TaskStats';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import TaskEditForm from './TaskEditForm';
import TaskFilter from './TaskFilter';
import Pagination from './Pagination';
import ConfirmDeleteDialog from './ConfirmDeleteDialog'; // Thêm dòng này
import { taskAPI } from '../services/api';
import './TaskPage.css';
function TaskPage() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDate, setFilterDate] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  // Lấy danh sách nhiệm vụ với filter và phân trang
  const fetchTasks = async () => {
    const params = {
      status: filterStatus,
      page,
    };
    if (filterDate) params.dueDate = filterDate;
    const res = await taskAPI.getTasks(params);
    setTasks(res.data.tasks);
    setTotalPages(res.data.totalPages);
  };

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line
  }, [filterStatus, filterDate, page]);

  // Thêm nhiệm vụ mới
  const handleAddTask = async (title, dueDate, status) => {
    await taskAPI.createTask({ title, dueDate, status });
    setPage(1);
    fetchTasks();
  };

  // Bắt đầu sửa nhiệm vụ
  const handleStartEdit = (task) => setEditingTask(task);

  // Lưu nhiệm vụ đã sửa
  const handleSaveEdit = async (id, updatedData) => {
    await taskAPI.updateTask(id, updatedData);
    setEditingTask(null);
    fetchTasks();
  };

  // Hủy sửa
  const handleCancelEdit = () => setEditingTask(null);

  // Mở dialog xác nhận xóa
  const handleDeleteTask = (id) => {
    setConfirmDeleteId(id);
  };

  // Xác nhận xóa
  const handleConfirmDelete = async () => {
    await taskAPI.deleteTask(confirmDeleteId);
    setConfirmDeleteId(null);
    fetchTasks();
  };

  // Hủy xóa
  const handleCancelDelete = () => setConfirmDeleteId(null);

  // Đổi trạng thái nhiệm vụ trực tiếp
  const handleChangeStatus = async (id, status) => {
    await taskAPI.updateTask(id, { status });
    fetchTasks();
  };

  // Xử lý filter ngày
  const handleDateChange = (e) => {
    setFilterDate(e.target.value);
    setPage(1);
  };

  return (
    <div className="taskpage-container">
 <h1 
        // Áp dụng inline style đã được chỉnh sửa
        style={{
          fontSize: '2.5rem',      
          fontWeight: '1000',      
          color: '#fe4305ff',       
          
          // THAY ĐỔI 1: Đặt căn giữa
          textAlign: 'center', 
          
          marginTop: '20px',
          marginBottom: '60px',
          paddingBottom: '5px',
          
          borderBottom: '3px solid #f9fbfeff', 
          
          // THAY ĐỔI 2: Loại bỏ hoặc chuyển thành 'block' để chiếm toàn bộ chiều rộng
          display: 'block', // Hoặc bỏ hẳn display
          
          // Căn giữa thẻ <h1> trên trang (nếu nó là block)
          // margin: '20px auto 25px auto', // Có thể dùng margin: 'trên phải dưới trái' để căn giữa
        }}
      >
        TASKNET
      </h1>
      <TaskStats />
      <div className="taskpage-filter-row">
        <TaskFilter status={filterStatus} onChange={setFilterStatus} />
        <input
          type="date"
          value={filterDate}
          onChange={handleDateChange}
          className="taskpage-date-input"
        />
      </div>
      {!editingTask && <TaskForm onAdd={handleAddTask} />}
      {editingTask && (
        <TaskEditForm
          task={editingTask}
          onSave={handleSaveEdit}
          onCancel={handleCancelEdit}
        />
      )}
      <TaskList
        tasks={tasks}
        onEditTask={handleStartEdit}
        onDeleteTask={handleDeleteTask}
        onChangeStatus={handleChangeStatus}
      />
      <Pagination page={page} totalPages={totalPages} onChange={setPage} />
      <ConfirmDeleteDialog
        open={!!confirmDeleteId}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        task={tasks.find(t => t._id === confirmDeleteId)}
      />
    </div>
  );
}

export default TaskPage;