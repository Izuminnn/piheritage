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
    { id:'laek0n', iv:'eIuQLDW0nE/iG+0m', data:'+Si8Fvb7UVgRvO+fRAv8VwFaC4hfY4YnTetPmXI/qGeP1v+FooCdBUg+dFmL6EBENKA0Uy9hXNhttrfhVCgmNc2m7adobeVLmdQ/ODaEZEiAaESo9bfbSexaezhJKMc5DhcNq3658qzgE3D2hVPPHQMH1Cm2KAaVWKdnz0gR8K+0VSA0Z+p5tUg0b0TigpbEyU9Jp2JL7AkUwWeqlvQJECKiSaj4ctRGDq6WKPXCUSptbP3sVzfLKOLxmudjHzS67P9snGaITpVEVFcfb0n9AiRcFhLuiYOseFQP8wC/PKedVhyXHFQal2DBBO5VLwisl1S+Try04C9U1zFE3Bv5roL1aIvcpdO4lWoiceUPr/4SNBcmwiyZGerg73rBLI5ypB0q4sOPYb3HXrPwtdu9wJAY9kmowArD5WMQlxBA7IHQI88+udWKVig0QN3RklLwvw4r3jojLUsNpKzFMf+H4gVRsB0PQSJgKDZnxTWftNLAgGpXwvkEgyIakEQonU6Dj1lRSoM/Ga3MxNtKetlSbvx7G4+kAanrGFPEiSE63v5boKYwCi3MXtMWMhx9hX7MHr/8y9TOpFX6Lty58I59gAYXnDHAQMorRteQAqG7yMz/L3LWPqZsbKNv/wpqrcRbXbdbhFob8XEmy/ETxBIRsL9lsndDmXXW06THn7juwsOAzx4q2vcZBd75XujNalA7S3KycEpqJKp0f8RmUmySwO8PyuwHZsDE+vuYUphneeTGS4xpcTiBsf3ry87CZ4zYePdso2AvoFTUdKEbxiudt+F2YyoGovNfTVzKJq5o',
      adm:{ iv:'SgyQKeX45oZZqwQk', data:'vMK3GMQfJKrnTIYj8Cr77z58W7RLbrBcNPBFJZVbqGHyZdOsb8gaKafqBlJZ4gsdykVOo29mjlS0eHveGGuCOKWjFKndkS1tfeqKxh589y0GEtwtVbwtRrLwKB+NxcfE+8bLqoKy490MlRGYnYijBF1XufChHb/2GyFuN/zb53CUF8Rde5rbo1Ws3Xqgov0DRkTQwctbPlfF+glbtqZCogXnEB0U7xC0ZZv99JRy6cC63csjLUNY8KGsv1xQjGlsdeTSfjmfQ2layJa9PfLVNGrJF0Fr6VbnXZUxlTs6nubLZagQJSv1eolWjgRDxbcnlQ0VCbQmwrNr6nApBnx+Lix7g/eIaNg8IImJrmKtTc3lGbVQK7QXFUFMghr1BbwBIs7DgZQIGYXDeSFcCBtspScDYZPB0IUIasoeRyOVUEDUeAGwturU5gFcaZoBGWYUls38u4jLzeBtr6yM2u8h65Z+2t97Ntacv6Wcl5Zwv6IURFbYG2F5+Zl1cFLEZC13Q3TevNovlGRpMTzQONQCaqcQrEhs0gAvfTojB8of5Jc5z8kSpaeLwvkbukZxjp89g0FVDI/6wjK9Pvxziftl3k6tyPsMUe0/2XaLGLUTLAPzP93qRuiMVMuIT36k+zTv60JQW8aduyXIKD4YgYOu8+1AwfouY8jm2/944zZ2C9tSc81xvqZA+8u0ldZvoE6n0yvn/WMUyKKADTCap3uhdyp5WdbgDAYCwI0wfUszUzh45un2jFN1Y2ERlNsTHjhzwYp1mcYPpjoLkUvZtksBh+f4E7tZTuK+UvaGdS82Lx+7z400blOPIt2iZCC/fsIebeFbD6aO2VNo/Q3Qtef4Wk3mcA7p+QyjbsIndmcYgEM0eHBuPJwktJGxgwrbY/eF3MweXN2I3pmxEYu5bafridT7+Hmmb3Ep2GmZPnYbZZyMzJSstpx0Lqpz/QEd3+jInE7Zbqq2IVeCDy07AVQw97gkvyPyqA==' } }
  ],
  showcase: [
    {"id":"laek0n","client":"Sely","client_en":"Sely","project":"Trà & Coffee Sely Vạn Phúc","project_en":"Tea & Coffee Sely Vạn Phúc","place":"12BT1, Tiểu khu Đô thị Vạn Phúc, Hà Đông, Hà Nội","place_en":"12BT1, Tiểu khu Đô thị Vạn Phúc, Hà Đông, Hà Nội","captured":"10/2026","splats":"25M","cover":"/images/du-an/tra-coffee-sely-van-phuc-ilrctu.jpg","scans":[{"label":"Toàn bộ quán","label_en":"Whole coffee shop","viewer":"https://lcc-viewer.xgrids.com/pub/d8f0d9e8-c8bc-4887-837c-fd781966fc2e"}]}
  ]
};
/* @@PSH-DATA-END */
