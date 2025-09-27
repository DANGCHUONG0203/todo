const Task = require('../models/Task');

// Lấy danh sách tasks (thêm filter theo ngày)
exports.getTasks = async (req, res) => {
  try {
    const { status, page = 1, limit = 10, sortBy = 'createdAt', order = 'desc', dueDate } = req.query;
    const query = {};
    if (status && status !== 'all') {
      query.status = status;
    }
    if (dueDate) {
      const start = new Date(dueDate);
      start.setHours(0, 0, 0, 0);
      const end = new Date(dueDate);
      end.setHours(23, 59, 59, 999);
      query.dueDate = { $gte: start, $lte: end };
    }
    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: { [sortBy]: order === 'desc' ? -1 : 1 }
    };
    const tasks = await Task.find(query)
      .sort(options.sort)
      .limit(options.limit)
      .skip((options.page - 1) * options.limit);
    const total = await Task.countDocuments(query);
    res.json({
      tasks,
      totalPages: Math.ceil(total / options.limit),
      currentPage: options.page,
      total
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Thống kê tasks
exports.getStats = async (req, res) => {
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
    stats.forEach(stat => {
      result[stat._id] = stat.count;
      result.total += stat.count;
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Tạo task mới
exports.createTask = async (req, res) => {
  try {
    const task = new Task(req.body);
    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Cập nhật task
exports.updateTask = async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ error: 'Không tìm thấy task' });
    }
    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Xóa task
exports.deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      return res.status(404).json({ error: 'Không tìm thấy task' });
    }
    res.json({ message: 'Xóa task thành công' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};