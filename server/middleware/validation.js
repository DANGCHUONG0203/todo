const { body, validationResult } = require('express-validator');

// Middleware validate dữ liệu khi tạo/sửa task
const validateTask = [
  body('title')
    .trim()
    .notEmpty().withMessage('Tiêu đề không được để trống')
    .isLength({ max: 200 }).withMessage('Tiêu đề tối đa 200 ký tự'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 1000 }).withMessage('Mô tả tối đa 1000 ký tự'),
  body('status')
    .optional()
    .isIn(['pending', 'in-progress', 'completed']).withMessage('Trạng thái không hợp lệ'),
  body('priority')
    .optional()
    .isIn(['low', 'medium', 'high']).withMessage('Độ ưu tiên không hợp lệ'),
  body('dueDate')
    .notEmpty().withMessage('Ngày hết hạn không được để trống')
    .isISO8601().withMessage('Ngày hết hạn phải đúng định dạng YYYY-MM-DD'),

  // Xử lý kết quả kiểm tra
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = { validateTask };