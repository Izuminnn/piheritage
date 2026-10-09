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
    { id:'laek0n', iv:'iSyE8cY8P5Ngb+Kp', data:'Q3qMTeqqBhK7UBXEvFP7zusXW52njfmi5HxEwWkM0YT2nphK45MIfT/PxueAjtXjSShrUZr45SP4T+YRgJp0d81/NwJpuW+QIT2cW0kBaaBktE5Jdm7+zSwXE/Ven60VKce1hsgOgMN2DzgOeEFvebVDBoQiAzuYRq+IVS1ofBWyuoN2h9ZQ4ztAN/9fKyVpOZN1J2859Aq/A2hZ5jWzGD57QKYASyqUF8ZSu3Jwbu1pjK9aUn/pZylfRPlrvZ3vpMgqotRPD42SIiRa4B5bQiZEw57AQbh+0FmJkQjMoTGNdks2JcHo9f/z5pLnEhagMvRJ+Fae/LuED3zAo7RhBjBZC3095+5RjkBziUqdkpPkpOnabzgBiuwYKxDmitHbNUeoC3gcRNEO0yJ7o2cMR+x3WdRDJxI6UZv/F8uCeXWcQ0W5tZyaGClEcvcn9LCa7hTVrleKO1FN4K+wHmt7KqcchPT/8OA2D/wpRyLjpgt5CjXPNj8MbI5PekHmQWsH2uR5oAVzC4Zj3sLjUesU/9xypVQUF5un1IduG0ez7mnHfF//9P9LxMgEmLbrh4C6DSGr7J0DFcIdSMA2fTjsvE3J91OAVFGchp1T+G1p0JBzKOLzNbXcudiNrermwx2/OnrNqvI3DXmAq1vUW7W4inyM4WW8R/rAK1Ocgc7jsSq+PxPckycjbkvvH6C/rU/nboOUpgJLhSKBAoWIKgOEyEqkTlyrGgVA14dJWUXNQVvdECzAfazVr55kuJZt8UYcyQUfbzJlMOobarwxp0kund3Azq+qtxvWAYRn2HD1',
      adm:{ iv:'/y60A/rSTS5Kctjy', data:'UdUvMCwjMadHE9bex1hoEhzidFT66jnDB0tV0WKTHz3LyR3BbIgcydRw4WVXdB1JGoJbbIj22IFAu/fuxQun+NDPOaV9KJMcLc5Pc9DZojwmjOoiKV/lUeznn+54VqH2vS4MLqumjm9xAEmbEP6+NJp9bOV4kfH+8wv5fcfEvZK824iPzJbB6/ooyGpicHptnzf/omBDvPVLzTQtBtQeeMpg3C6P1th7+l1dWv31Mio7gkUVIJNfoRNfshSrIcZ9Onwb6yGY53uabL/6gbUl4CX+de5hvQ3fAf/JqRVRv0S709e/0LYZgg7vTpzoBQi3OEDz0UhxNN7ZyPB8xYe738VhEDeaqiNNbs/xS5kPPmCvJ+x9+clbRAudlCKxp8xO9mM5fYpEBxgnHND3Q7XPfdJIGP/zNvylxGBTPqV8C5q6XGTn6DpqOt+fil7P3dLX263mr7GBQJlZyBAG7khWwUV7um6uZcl1GaHz35Yn2DkN3uaiWzmzoCgMiflMUrT5TsYy0JTd0YAbaWLQf6YFizpT3oVBsEuhNgucedCIZ9As+77sbay+1pglEkOvxlPEb5IUX7N3xS3z0nNzNRrC6sj+4H3ka3X6V+TXU4+4GhGVowvJLUCgPCLe5G8WcD/NbTn5NkmNouh8SExDTY57FV1ZiWlMk506Qs/DXGrmNgfPpzO6/Hjshw4k02AcbokDVA5deY8UtNFrrcBCIxGeJv/OvgJRMbPC+fi+o5iCLiiWGDpCOxYG0ovM61AAog3wfiNmpDWVT3tQ0Z7FFYWa4jqpYscdaC8AIXCdaoTZ1fogKmMBxTkFIxpbNPLysvEsSd/RGjzOjgp8fsGHFJxp+B3AYahvA20C5JqBH0D9Y5PTHGiUU0zZx0dV/fW5hpGHnZeCOAPZXV8YiUYhd5oBh1DckEwfIuZvHvw5r8bwS2xQx7Ybqle0GwZVY47NKhAbjNKMmFLvKrrJv9mBISb7QNfYQvcG0w==' } }
  ],
  groups: [
    {"id":"sely","name":"Sely","name_en":"Sely","note":"Chuỗi Coffee & Tea Sely","note_en":"Coffee & Tea Sely"}
  ],
  showcase: [
    {"id":"laek0n","client":"Sely","client_en":"Sely","project":"Trà & Coffee Sely Vạn Phúc","project_en":"Tea & Coffee Sely Vạn Phúc","place":"12BT1, Tiểu khu Đô thị Vạn Phúc, Hà Đông, Hà Nội","place_en":"12BT1, Tiểu khu Đô thị Vạn Phúc, Hà Đông, Hà Nội","captured":"10/2026","splats":"25M","cover":"/images/du-an/tra-coffee-sely-van-phuc-n1sfqg.jpg","scans":[{"label":"Toàn bộ quán","label_en":"Whole coffee shop","viewer":"https://lcc-viewer.xgrids.com/pub/d8f0d9e8-c8bc-4887-837c-fd781966fc2e"}]}
  ]
};
/* @@PSH-DATA-END */
