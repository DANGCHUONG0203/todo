import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TaskStats.css';
function TaskStats() {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    'in-progress': 0,
    completed: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const res = await axios.get('http://localhost:5000/api/tasks/stats');
    setStats(res.data);
  };

  return (
    <div className="Anh">
      <div className="Anhh">
        <h3 className="Anhhh">Tổng nhiệm vụ</h3>
        <p className="Anhhhh">{stats.total}</p>
      </div>
      <div className="Anhh">
        <h3 className="Anhhh">Chờ xử lý</h3>
        <p className="Anhhhh">{stats.pending}</p>
      </div>
      <div className="Anhh">
        <h3 className="Anhhh">Đang thực hiện</h3>
        <p className="Anhhhh">{stats['in-progress']}</p>
      </div>
      <div className="Anhh">
        <h3 className="Anhhh">Hoàn thành</h3>
        <p className="Anhhhh">{stats.completed}</p>
      </div>
    </div>
  );
}

export default TaskStats;