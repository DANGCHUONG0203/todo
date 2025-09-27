import React from 'react';
// 👈 BƯỚC QUAN TRỌNG NHẤT: Import file CSS vào đây
import './Pagination.css'; 

function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;
  return (
    // 👈 Thêm class CSS mới vào container
    <div className="flex gap-2 mt-4 pagination-container"> 
      <button
        onClick={() => onChange(page - 1)}
        disabled={page <= 1}
        // 👈 Thêm class CSS mới vào nút
        className="pagination-button" // Đã loại bỏ các class Tailwind không cần thiết
      >
        Trước
      </button>
      {/* 👈 Thêm class CSS mới vào thông tin trang */}
      <span className="pagination-info">Trang {page} / {totalPages}</span>
      <button
        onClick={() => onChange(page + 1)}
        disabled={page >= totalPages}
        // 👈 Thêm class CSS mới vào nút
        className="pagination-button" // Đã loại bỏ các class Tailwind không cần thiết
      >
        Sau
      </button>
    </div>
  );
}

export default Pagination;