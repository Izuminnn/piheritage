/* =========================================================================
   PIHERITAGE — BẢN SCAN RIÊNG CỦA KHÁCH HÀNG
   -------------------------------------------------------------------------
   Trang /khach-hang/ đọc file này. Mỗi khối { iv, data } là MỘT dự án của
   một khách, đã được khoá bằng mã truy cập riêng của khách đó. Bản sao `adm`
   khoá bằng mật khẩu quản trị, để anh em trong công ty xem lại được mã.

   ✅ THÊM / SỬA / XOÁ KHÁCH: dùng trang quản trị nội bộ (link ẩn /quan-tri/),
      tab "Khách hàng". Trang đó tự tạo mã, mã hoá và ghi lại file này.

   ⚠️ KHÔNG sửa tay `iv` / `data` — sửa một ký tự là khối đó hỏng luôn.
   ⚠️ KHÔNG đổi `salt` / `iter` / `adminSalt` — mọi mã đã gửi cho khách sẽ
      hết mở được.
   ⚠️ Viewer bên ngoài (xgrids…) nên để chế độ "không công khai / chỉ ai có
      link". Ở đây chỉ giấu được link; nếu link viewer đã công khai sẵn thì
      người khác vẫn có thể tìm thấy nó từ chỗ khác.
   ========================================================================= */

/* @@PSH-DATA-START — trang quản trị ghi lại toàn bộ phần từ đây tới dòng @@PSH-DATA-END. Đừng sửa tay. */
window.PSH_CLIENT = {
  salt: 'f+L50e7McqlSOhuo1Ql30A==',
  iter: 210000,
  projects: [
    { iv:'vfJr8YybD1dbDnCv', data:'8VLsjnWd8vu7o1ccTp25/VLomLKarl/niJIqI2vi3ptTH/OSBYtCloDYUIX3HnsMqEX7NKeSsT+2Ki0o7UI3S3hQdzA1OalnEly29qUtRHSyiaSUTFY3INXfj2A+UQYPGP8nrEiQ+UXHwRC1lfuvIr8cWuyCs3ZnzEgBKD2P4rTeW2cxOPaqDJsBLiLQM+1uUgeAAgpX4w6N0SdI6qclerVUa0A62E7o5Y9pozMS18HzWJx9uPY61O8G6g+y5iLurftRINQC7fax2Lo2Zsna/zWllNItAPUya5gAomJHIk2b/3XreO0BBARmfVbDt9XMcuv0WDzYkka6pn6YGChrXX1pL0fDN30BiIoEGQIiEj8tQUouIgUJjmC50mnK7PBPsc6JI12n1hX/gH5eF1Zf4yMhpLermflyyKSDht+rSFmYGpqzAP7ZH1lO+XqxkXzc/pox4o6GYi9KNSTCw3YnzDeGTBC2PdP03QF0A4MSTXD45N4WPvRfJgKhYw8geFr1K5xAEFmQ5ik7BBkkJ3XNgPzZiVhyLaYeS4+R1R5ql7gY/hX/8sN2M944qSMM+9KrQf9nwZ6TrE9p4qMND52P0TjcjtSbLrvmecTgraJl9DQPGET61jreZh0CabK3QW1LlvWXWg2mpY5ndwALSAZsk1hTlTX1czQBQt1Z8cVDxvJwLlKEY926ASoM+AXkda3PoVSwmUCAOa+uEQQ38263ss5CKLVJS8JOEk8c4PJXEpzPHU1oDaalpZMiMOjSZ1bvOycr/kD004qwCoZ2NMgImKSQFQsrrkdagcX/e+xHePIWMIg4833VYycJMQ2Vrn+qBpPhd4nsEDOsoXemnPREE9MLaoxXoCajX7FFNB2zU9Dt+0je7JviV8iXDmAZDt+oAV027u/SeNEUpYmkK+zFClWSbNYkC2yKcLDktIQlVMq/VZZdkZlZ1KaKgnTL0JZZgp0SFiMCcCebYgeWfhF9IqkcEgAyxXLGCyAdP4BugC/ZOwKATD5l3M8dkg9yWayCFVjvB67JSx0CSbxPMl6P8hI4iNA03+hasQ5PcSOFTQJErNul+SlJzTqwCVHciwY4nOjUAttg/pdHu9XO+8Wt5IQahsuhiCquc1m7aIjSF4Pt0o1Ffwy6j2Aa93I+cw3GEuSn55xqJGvvNw==' }
  ]
};
/* @@PSH-DATA-END */
