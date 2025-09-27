const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// GET /api/tasks - Lấy danh sách tasks với filter và phân trang
router.get('/', async (req, res) => {
  try {
    const { status, page = 1, limit = 10, sortBy = 'createdAt', order = 'desc', dueDate } = req.query;
    const query = {};

    // Filter theo trạng thái
    if (status && status !== 'all') {
      query.status = status;
    }

    // Filter theo ngày (dueDate)
    if (dueDate) {
      const start = new Date(dueDate);
      start.setHours(0, 0, 0, 0);
      const end = new Date(dueDate);
      end.setHours(23, 59, 59, 999);
      query.dueDate = { $gte: start, $lte: end };
    }

    // Tổng số nhiệm vụ phù hợp filter
    const total = await Task.countDocuments(query);

    // Phân trang và sắp xếp
    const tasks = await Task.find(query)
      .sort({ [sortBy]: order === 'desc' ? -1 : 1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json({
      tasks,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      total
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/tasks/stats - Thống kê số nhiệm vụ theo trạng thái
router.get('/stats', async (req, res) => {
  try {
    const stats = await Task.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);
    const result = {
      total: 0,
      pending: 0,
      'in-progress': 0,
      completed: 0
    };
    const validStatuses = ['pending', 'in-progress', 'completed'];
stats.forEach(stat => {
  if (validStatuses.includes(stat._id)) {
    result[stat._id] = stat.count;
  }
  result.total += stat.count;
});
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/tasks - Tạo task mới
router.post('/', async (req, res) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;
    if (!title || !status || !dueDate) {
      return res.status(400).json({ error: 'Thiếu thông tin nhiệm vụ (title, status, dueDate)!' });
    }
    const task = new Task({ title, description, status, priority, dueDate });
    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT /api/tasks/:id - Cập nhật task
router.put('/:id', async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ error: 'Không tìm thấy nhiệm vụ' });
    }
    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE /api/tasks/:id - Xóa task
router.delete('/:id', async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      return res.status(404).json({ error: 'Không tìm thấy nhiệm vụ' });
    }
    res.json({ message: 'Xóa nhiệm vụ thành công' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;