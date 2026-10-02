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
  adminSalt: 'G9YMJXKrqf0dHkg2b4+z2Q==',
  adminCheck: { iv:'VcN+U1wexYxgbvlN', data:'9pZ+hB0F5YzwWGFxPLm/ch9M0RDlCufBhnJG7TRzB4LKNg==' },
  projects: [
    { iv:'vfJr8YybD1dbDnCv', data:'8VLsjnWd8vu7o1ccTp25/VLomLKarl/niJIqI2vi3ptTH/OSBYtCloDYUIX3HnsMqEX7NKeSsT+2Ki0o7UI3S3hQdzA1OalnEly29qUtRHSyiaSUTFY3INXfj2A+UQYPGP8nrEiQ+UXHwRC1lfuvIr8cWuyCs3ZnzEgBKD2P4rTeW2cxOPaqDJsBLiLQM+1uUgeAAgpX4w6N0SdI6qclerVUa0A62E7o5Y9pozMS18HzWJx9uPY61O8G6g+y5iLurftRINQC7fax2Lo2Zsna/zWllNItAPUya5gAomJHIk2b/3XreO0BBARmfVbDt9XMcuv0WDzYkka6pn6YGChrXX1pL0fDN30BiIoEGQIiEj8tQUouIgUJjmC50mnK7PBPsc6JI12n1hX/gH5eF1Zf4yMhpLermflyyKSDht+rSFmYGpqzAP7ZH1lO+XqxkXzc/pox4o6GYi9KNSTCw3YnzDeGTBC2PdP03QF0A4MSTXD45N4WPvRfJgKhYw8geFr1K5xAEFmQ5ik7BBkkJ3XNgPzZiVhyLaYeS4+R1R5ql7gY/hX/8sN2M944qSMM+9KrQf9nwZ6TrE9p4qMND52P0TjcjtSbLrvmecTgraJl9DQPGET61jreZh0CabK3QW1LlvWXWg2mpY5ndwALSAZsk1hTlTX1czQBQt1Z8cVDxvJwLlKEY926ASoM+AXkda3PoVSwmUCAOa+uEQQ38263ss5CKLVJS8JOEk8c4PJXEpzPHU1oDaalpZMiMOjSZ1bvOycr/kD004qwCoZ2NMgImKSQFQsrrkdagcX/e+xHePIWMIg4833VYycJMQ2Vrn+qBpPhd4nsEDOsoXemnPREE9MLaoxXoCajX7FFNB2zU9Dt+0je7JviV8iXDmAZDt+oAV027u/SeNEUpYmkK+zFClWSbNYkC2yKcLDktIQlVMq/VZZdkZlZ1KaKgnTL0JZZgp0SFiMCcCebYgeWfhF9IqkcEgAyxXLGCyAdP4BugC/ZOwKATD5l3M8dkg9yWayCFVjvB67JSx0CSbxPMl6P8hI4iNA03+hasQ5PcSOFTQJErNul+SlJzTqwCVHciwY4nOjUAttg/pdHu9XO+8Wt5IQahsuhiCquc1m7aIjSF4Pt0o1Ffwy6j2Aa93I+cw3GEuSn55xqJGvvNw==' },
    { id:'laek0n', iv:'+iMBklm/r1wXRI9R', data:'oH6UQ4REh16sAOHd2L6z9zgHGopEnXBu3AmXqum7e4eouL6NFCGJk1dYop5wPeb5iL6n+nU89nZxoHf/fLvycweMDyX1h0Jw/NXi7/QL1Aa0wq7589ktVWmTytBMkR1sHQ3xz6jWAvW2RFM3yctW9hW5gGQDjnxBVPBlORgb8g1DwRQ7BxCqJ5dPmHzajtKUIJ1yI5TSdWJJRWilB4CZdOOdF7PFqANZifZGlX1k4ooM2pBW1zZqunPOjvjLTlleA7vSxskrjwOyNPYv4Rtav22jMBJrNLS6kV4s+HE0P9eVNoDd0x16LbwP5LGZgqBv0bbhoP2qB13PxdWYH8Ib7Yk3kk3iVmJliqdL8cDPpxH4pPv2g1Aai2eKdWv7vki1TZ6Wy+iTHiUwwwuLnLHiiY5zGJkDvMZjUSVCdomXzEgV29JwvcqjISFoCUGtq0p44QvEYW6FiubM3vLi4Zx01hd2U9WiAj9FmicPdnD3nx114E+xhcKydHhIqZS7z8aZmpGtJiMFXtfXb/hTUO58Gtf+m89DFkEN7BLiCpLySxmsXfkpCMlqXY14FGdKuHH+PeOJxXOqTNYOLrqHgQ+nF07HHRH3fQj8O/iWTUM7euf4mh8fLSKtm87sPT3564Q=',
      adm:{ iv:'GBvFbQGDpyv2WwGZ', data:'iJi5jR9k94N0BAzdcporkkD1IeEG7rpVK0PwF809x007VmOgGFe+3oT2YqORToWdWIeL0NW7rUkymz6zOmCPDNMP1SY6aOrPoOBq80xRS4IaJ4NWEBDdohKBvHWMUpFwBwLQC4FlAKLKqRKCraszpDfDtWOq/KvCfZbthJN3MMfBdppkwywcwYnUStqxaHTTi+pFEEuIsFgmK0r1DzWZOwYbVHwJBTlnqqtDKFrQZPYJP1tW2Ufw7YBeXXDVrEr9sbX94pC8S23RFGOlQ6seDv4abJa/ljcLGu4j+A538Dm4nRPpufQ5gldpaNTtxrFahIl95WJzpnNcvLvHOMATeAUsTiX+s7o4i6GnFowNzg9Dca/EZB6AHNXZggpFEb5f3QTM9JkKpwJ+JH+BlEnu/a4w3itcPKFxPS1izh7gq+yEm9xggHombYzxcM+ER2Y/wqC/p0ZSPB0DWvwEHPYqzy5XM2Gd6yh0DW17tFthcYYVKL7ny9iFnp93CrDEB4+OaDOi0NGWNyqm4i7F7gRHAp5VfiPHQRYPbTHube3HGVj7sKIUrNPFqAxOMgPC2aVbHovrPfVTyuzvhaN/vQEww1730op1LHvvpoCkon1a9n+0GF/bSlto3vPMv528gs/QinZ0ZLaIYAsTg5M7FPu7xjXY8m+goYfOtjd3gL5875vq5rL9hbg4KggZAJlsETnzPb8kO40xpg==' } }
  ]
};
/* @@PSH-DATA-END */
