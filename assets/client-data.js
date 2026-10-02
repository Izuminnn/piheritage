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
    { id:'laek0n', iv:'4lRx525pMdo0N2yu', data:'An+4OkaqWMRQgqVpGPMUWkf+68yJROv+JEb1eufb1JJ8ZyqMhkGr/nfuByDOw7mojh8rm7Sg+yP/ZHwmvxrBcqigJ1quj4wDbLwt4bZU1ZyUdbp3kYmntTCtEmxqGhlqu6ZqwS9PKcgRMYHfvVCF5xDji4U9GGvGsQwrq2JZ4MRu5SxcVZIJDiUkaHmyvIFCGgFFRpjGPrhb0I5d4EDzDnGbdk4mUszJqfgH/7n035VCsUrUUNZHY13OMyTv2B4r+w08RcnmJEhJjYITq/tsoG7DjdR9ur1TIcDlrVpd3GINkyhNpMznUk7pwcdFpQFOsPmLZ+UlvQQ4Yh2cJuueLa4nnwUQEbWpRUeA049h+zFoVFO4HRSvbtqQH7Dv9mFxhd5oenFKUznJ4WLUMbPpuSCesmrNQsRDD88PW++Xr68wm/oJl0n6HigryeUMXzfAh/wo6P/BKIu6PxqGqRVflI89bmPNXbWQzMVm0rEVKZR1e73Nls6qLvu97bDbPZOOgzkquGhmoHqojrdCPTxQG8gvUaoziqxuXir9h4pfHdSZ8z0WIjBApYTVhnIbtARFMbFeCLb3uLHLUqR7W8IrUQkPW/yk76UUeqTKAed+l2G3eRDpcK+UpY4wVoW08KKe/NX2rSKseytVs7mQi10Zy2ORwsI0ac8jI4ArXe0sYUcLgewIjvQMq1zdspYij0ruaJtkduFdonGUkHRJxVnF/33gdJIh0sdJYUP0J3CPnLTYUQjd+1JdbZ6ZfSuQxzts/zN4zzb613FLNmg9KXNFChU40srozmWXYPlMLDGQ',
      adm:{ iv:'/ySpx+rmeUxyAtUL', data:'3McWN41rhFFJDzyxWiLhEbHF5tq8gRYamuUnw0g9KQK1vghFCcyx0dyI0RxiyST/RF+Uv8jwwP5TZvjfaUVtkbaAqHs95Fn38Nfl75E3qeYq5I7GZKDN0xN8qb0fjJH6wRZskWhCXxm37BohamWURB4ew6h7clM6xsJ4gOz8JS35sr2Kmx3mmqyOXIpMlQxWBpqTutJZM3LNzGP5SkYd61n7+iV4xfgYlA01hy351ah1998kCifkEFlLcJW3Uikt+u1LrfSNI04AboBxoMyvbufj63ngEoGtTIf3Ldh76bQfPXB2T3njoghIX2wyV6PGtZ9E84nisyjLYs9Bl570x0Cr9rugN7GwEJcCpQILHn743wF5N6sxB5o0S8HVL/fUPtsuaRENlMrJd1M6cbXFt/ICn1Ro4y0YVIFF8V5AVJoptZgsZ+koDkkt2TLjwInYRaofL86MSWBXFb8pTs4d2NTqNmtVODvxjcX7sQnZUGdlyWqJkd1ssM18XahxpzJXkbEUof9sWrloOSM8n6p730Cja8bie05g3srv3YEsbUAfo7aN4zUtoxrZ/TrNy8zp7rgCRsTgNuItrxJat74Fpjczl1vSvn3S1ampeE89KR0sCCSHY1fk45CTNSe0YB872Z41mvfYw8xP7SnDnM7jTNTOOn/fnhp20hIpDFWGe4ymOI6c93abOSrehgbjbQqek+DJHLPu4aZAh6YCYC7zQh8gZHXKOUq0qNINTjb3ZyuM9Ycj/M7xwL+BZG0eI72gh3k/6plfHJVn9pzI3yd9l02pXbUKtd33GJhUTzkZYQ1aW1zNT9EhpKYmRZuSXvKXn+7Q2+nJqfI88EI3DIrwy68ksH1SU+EDyiyt0jOfyCkVBuryCnw2hHQmRWukgfNEhp/1hH3lii3TqUrhq7PxCWSvxV6XMnrJ6evfsRUzKMX94OhiLjMwpTs4mOZSenB9iwBiVZIz9xmWzqusOTZ/53HmTHRN8w==' } }
  ],
  showcase: [
    {"id":"laek0n","client":"Sely","client_en":"Sely","project":"Trà & Coffee Sely Vạn Phúc","project_en":"Tea & Coffee Sely Vạn Phúc","place":"12BT1, Tiểu khu Đô thị Vạn Phúc, Hà Đông, Hà Nội","place_en":"12BT1, Tiểu khu Đô thị Vạn Phúc, Hà Đông, Hà Nội","captured":"10/2026","splats":"25M","cover":"/images/du-an/tra-coffee-sely-van-phuc-i80ted.jpg","scans":[{"label":"Toàn bộ quán","label_en":"Whole coffee shop","viewer":"https://lcc-viewer.xgrids.com/pub/d8f0d9e8-c8bc-4887-837c-fd781966fc2e"}]}
  ]
};
/* @@PSH-DATA-END */
