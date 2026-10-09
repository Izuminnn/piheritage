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
    { id:'laek0n', iv:'jY1rHP7BMzuEc0Iu', data:'aD6/wThRHOscWMhLhr8XdMfS62sH31dfywldZqsZQBc1x6JqNKc6gb5Zl5d09z14wyAkBdesJayDyEC36Wkogh37oFENj2OldthqrooITdfzll2dQrW1bPnbzCdvNWh/0ElS1z1tr9HTGVPLB9y7+tcCWPjA8C+UnTBqx3IouXyg5QOf1dyuwy4qt4OkkcHyqNLjMX0nSAYiRdcxmrWfbzdVTYH/BdWZz+HEBHNxMB40cTMp5S7Jfmc2xr/KknNjtCHA+SZD6yW97TfyjCqvicclfWAlJbvWTcafwppHMCdX7Xzo5EAWsqn+L541FkJEBZStXjCnRfDPcfaNxxcfzw7mYDa8hiTb0ZjBlIzbGgb8ZiQodjCJNI7OJnDLqYUuy57y7AW4BIQFS/br7yhMrff0rsWOO+bvQJQNf4iG9SphVm++XGfckwi1n5IAQFWLfvaPh3QS+4a3QR22HQKSb5alLuPogWr++lQx5n+Wb6BhhXBUxgl8VmXlhAHaB/JGcHFN+B8XVHZzBnHnAXS9NTE+NzXScxmPsCBy1bHdMrZnOQlCJYXrhjYBdSG6Ppnd3/cFLI4OwVyYBOEE3ceTl/+fChJa0EmVR+RFHaX7rMCivVlNkrtGqW85JtRb9go0PANk9IP/+9uQOTuCzPcCtmxWi1zvHfDuMzvIFJoaj+Yzp0d9KGfIwL1QEG3zaNcWzOIgsv5DGZhhEkWAlV614tSv5NJOAsXNFhTdK+Km22mhO1H8AeYINQhAhe8p+P2ILj8olH1xLfSPYHPa+0IB92iSaQuhYIn8FW4IKn9j',
      adm:{ iv:'kZNNX1EDtv+foGCj', data:'/+eq1EnUfU8MmvfuvDB87XDDFkfwXhIuq9P/DDEYRHxWHFrCO6TPZfGNnl1otleN2aEmwtd2sHUCXefRBUxeuxcVRzY6ISzhaQF7Qp/NavKdihAPs5tfgkslAa2Xm+7XgvXmu8t7lpjQNenaPNQprKYMQLxpevXuFX+8tssdka++8JG7J7SGCRaq4mp3z1ygMdAnLfdfroYiNjnu4ts1m3zHI3YU3zVPxj6vIQ76qBTPvjRiijbkAv0Bi0N7fGmtVt+PZn47jCVLmn9OyrDtFgN9EwzmCVpZiWrYlCcyKbBnrs82VcKZHoafmzb2aXQbj5sIhESTLJMWuML4NAfzIwZj/WvBbgal0E6s5zEksD81W/OAodFESzDgt5AYg3gjjEvh1jUWXq8Ewd6ubdzLn7IaPt32v5CXx7cJRm47r2d4ZtZJGmsQNkEsjyVPryi2BUqKu0ZM8F2yPHdlSE8sVOA8h/9o6C2ifP3YTEZym3rCJjti4vb7vPaqDznr9OjwDNMV6id+ckdIXP5dsLnqRMVCmNixlJ4KmGspvZ1DCv7Hvs/p0bg/TIOyx+7gsJambaNPDorUAArx31YDlGfLlLZSrvGkoMh0sSoutBTaLsrHHS1n9psokvceW1Wnc2sE/GuIRhi8qSLP5waLUBDeA1y+EqcuNpDELeDG+qNEGMpaitoysUdTCuqQQr4g152UyfgB2EBqpdUk9bfcx0aIfxC33yc5Y3D6BzCQxEjulCXj40yD6gTh0SYRMaTvGI9xuPHYCC0Q7Lgc1djWh+R9/Aymjp85kUa1mUiBtzvA9Wg+PrTFNxfnjJDFnxVM5usQtm4amyqT6QGu7KNkX5xwuRz+r+GokfJjrdyCaQ+aZsFKsP9HYy2tLB4mtEYhyPgrtv0Bp2UsqNJA9mowmrqVcB40wbcqtoQv+iX4OVqb7dRQRN4nSXQUs1HsbpfcP9MIdddgfw66cesRkyPiBW2QUZbUubkPmTV6U2j5goBnx3TasUJ3LA==' } }
  ],
  groups: [
    {"id":"sely","name":"Sely","name_en":"Sely","note":"Chuỗi Coffee & Tea Sely","note_en":"Coffee & Tea Sely"}
  ],
  showcase: [
    {"id":"laek0n","client":"Sely","client_en":"Sely","project":"Trà & Coffee Sely Vạn Phúc","project_en":"Tea & Coffee Sely Vạn Phúc","place":"12BT1, Tiểu khu Đô thị Vạn Phúc, Hà Đông, Hà Nội","place_en":"12BT1, Tiểu khu Đô thị Vạn Phúc, Hà Đông, Hà Nội","captured":"10/2026","splats":"25M","cover":"/images/du-an/tra-coffee-sely-van-phuc-n1sfqg.jpg","group":"sely","scans":[{"label":"Toàn bộ quán","label_en":"Whole coffee shop","viewer":"https://lcc-viewer.xgrids.com/pub/d8f0d9e8-c8bc-4887-837c-fd781966fc2e"}]}
  ]
};
/* @@PSH-DATA-END */
