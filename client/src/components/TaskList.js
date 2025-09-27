import React from 'react';
import  './TaskList.css';
import TaskItem from './TaskItem';

function TaskList({ tasks, onEditTask, onDeleteTask, onChangeStatus }) {
  if (!tasks || tasks.length === 0) {
    // Thêm class 'task-list-empty'
    return <div className="task-list-empty">Không có nhiệm vụ nào</div>;
  }
  return (
    // Thêm class 'task-list' vào container chính
    <div className="task-list">
      {tasks.map(task => (
        <TaskItem
          key={task._id}
          task={task}
          onEdit={() => onEditTask(task)}
          onDelete={() => onDeleteTask(task._id)}
          onChangeStatus={onChangeStatus}
        />
      ))}
    </div>
  );
}

export default TaskList;