/* =========================================================================
   PIHERITAGE — DANH SÁCH DI TÍCH & DI SẢN
   -------------------------------------------------------------------------
   ĐÂY LÀ FILE DUY NHẤT BẠN CẦN SỬA để thêm/bớt địa điểm.
   Cả trang chủ (đếm số liệu) và trang gallery đều đọc từ đây.

   📖 Hướng dẫn đầy đủ, có ví dụ: xem file HUONG-DAN.md ở thư mục gốc.

   CÁCH THÊM NHANH — chép dòng dưới, dán vào trong `items: [ ... ]` của đúng tỉnh:

     { name:'Tên di tích',        name_en:'English name',
       type:'Cấp xếp hạng',       type_en:'Ranking in English',
       era:'Niên đại',            era_en:'Era in English',
       lat:21.0000, lng:105.0000,
       viewer:'https://link-viewer-cua-ban',
       photo:'/images/ten-file-anh.jpg',
       splats:'30.0M', captured:'08/2026', unesco:false, tone:0 },

   Nhớ: chữ để trong nháy đơn '...', số thì không, cuối mỗi khối có dấu phẩy.
   Toạ độ lấy bằng cách bấm chuột phải trên Google Maps.

   ⚠️ Ô nào có đuôi `_en` là bản tiếng Anh. NẾU BỎ TRỐNG hoặc không viết ô đó,
      trang sẽ tự dùng lại bản tiếng Việt — không bị vỡ, chỉ là chỗ đó không dịch.

   Mỗi địa điểm:
     name / name_en     : tên hiển thị
     type / type_en     : cấp xếp hạng / loại hình
     era / era_en       : niên đại
     lat, lng           : toạ độ để cắm ghim bản đồ  ⚠️ hiện là toạ độ gần đúng, nên rà lại
     viewer             : LINK VIEWER 3DGS của địa điểm đó (trang bên ngoài).
                          → Để '' (chuỗi rỗng) nếu chưa có: thẻ sẽ tự hiện "Sắp ra mắt".
     gmaps              : LINK GOOGLE MAPS dán thẳng, cho nút "Mở trên Google Maps".
                          → Không viết ô này thì trang tự tìm theo tên + tỉnh. Chỉ cần
                            điền khi tìm theo tên không ra, hoặc ra nhầm địa điểm khác.
     splats             : số hạt splat (dữ liệu mẫu — sửa theo bản quét thật)
     captured           : tháng/năm quét (dữ liệu mẫu)
     captured_en        : chỉ cần khi `captured` có chữ tiếng Việt, ví dụ "Dự kiến 10/2026"
     unesco             : true nếu thuộc danh mục UNESCO
     photo              : ẢNH XEM TRƯỚC THẬT, ví dụ '/images/dai-noi-hue.jpg' — LUÔN có dấu `/`
                          ở đầu (ảnh nằm trong thư mục images/ ở gốc repo, dùng chung cho cả
                          trang chủ lẫn gallery). Không viết ô này thì thẻ tự dùng ảnh mẫu xám.
                          Cắt 16:9 cho đẹp.
     tone               : 0–3, chỉ để ảnh placeholder có nhịp màu khác nhau
                          (không còn tác dụng khi đã có `photo`)

   ⚠️ Các link `viewer` bên dưới là LINK MẪU. Thay bằng link thật rồi xoá
      dải cảnh báo màu vàng ở đầu trang gallery (gallery/index.html).

   -------------------------------------------------------------------------
   VÙNG CHƯA MỞ RỘNG  →  ô "Sắp ra mắt"

   Thêm `soon: true` vào một vùng thì trang gallery hiện một ô "Sắp ra mắt"
   thay cho lưới thẻ. Mọi địa điểm trong `cities` của vùng đó bị bỏ qua hoàn
   toàn: không đếm vào số liệu trang chủ, không cắm ghim lên bản đồ, không ra
   kết quả tìm kiếm. Nhờ vậy dữ liệu vẫn nằm sẵn trong file, chỉ là chưa công
   bố.

   Muốn viết lời nhắn riêng cho vùng đó thì thêm `soon_note` / `soon_note_en`.
   Không viết thì trang dùng lời nhắn mặc định.

   ➜ KHI CÔNG TY MỞ RỘNG TỚI VÙNG ĐÓ: xoá dòng `soon: true`, rồi thay dữ liệu
     mẫu trong `cities` bằng dữ liệu thật. Các bước chi tiết: xem HUONG-DAN.md.

   Hiện đang bật `soon: true`: Miền Trung, Miền Nam.
   ========================================================================= */

window.PSH_HERITAGE = [
  {
    region: 'Miền Bắc',
    region_en: 'Northern Vietnam',
    blurb: 'Kinh thành, đền chùa và địa mạo đá vôi của châu thổ sông Hồng.',
    blurb_en: 'Imperial citadels, temples and the limestone karst of the Red River Delta.',
    cities: [
      {
        city: 'Hà Nội', city_en: 'Hanoi',
        items: [
          { name:'Cổng làng lụa Vạn Phúc', name_en:'Van Phuc Silk Village Gate',
            type:'Di sản', type_en:'Heritage',
            era:'', era_en:'',
            lat:20.9792, lng:105.7730,
            gmaps:'https://maps.app.goo.gl/3QM56cTfpEiNJoEd7',
            viewer:'https://lcc-viewer.xgrids.com/pub/32ef8d04-5ad8-4e8a-a9d2-42ae8e4d08db',
            photo:'/images/conglangvanphuc.jpg',
            splats:'48.2M', captured:'07/2026', unesco:false, tone:0 },
           
           { name:'Làng lụa Vạn Phúc', name_en:'Van Phuc Silk Village',
            type:'Di sản', type_en:'Heritage',
            era:'', era_en:'',
            lat:20.9792, lng:105.7730,
            gmaps:'https://maps.app.goo.gl/3QM56cTfpEiNJoEd7',
            viewer:'https://lcc-viewer.xgrids.com/pub/f8c65aaa-49ab-4c51-8e4d-7c1d528f8225',
            photo:'/images/conglangvanphuc.jpg',
            splats:'48.2M', captured:'09/2026', unesco:false, tone:0 },

          { name:'Chùa Vạn Phúc', name_en:'Van Phuc Temple',
            type:'Di sản', type_en:'Heritage',
            era:'', era_en:'',
            lat:20.9794, lng:105.7728,
            viewer:'https://lcc-viewer.xgrids.com/pub/1f406c03-f5bd-4984-9567-0f4468e7c208',
            photo:'/images/chuavanphuc.webp',
            splats:'36.9M', captured:'07/2026', unesco:false, tone:1 },

          { name:'Cầu ngói làng lụa', name_en:'Silk Village Tile-roofed Bridge',
            type:'Di sản', type_en:'Heritage',
            era:'', era_en:'',
            lat:20.9771, lng:105.7757,
            viewer:'',
            photo:'/images/caungoilanglua.jpg',
            gmaps:'https://maps.app.goo.gl/A4QHnCbYUGiB5jmr6',
            splats:'—', captured:'Dự kiến 08/2026', captured_en:'Planned 08/2026', unesco:false, tone:2 },

          { name:'Đình làng Vạn Phúc', name_en:"Van Phuc Communal House",
            type:'Di sản', type_en:'Heritage',
            era:'', era_en:'',
            lat:20.9248, lng:105.8920,
            viewer:'',
            photo:'/images/dinhlangvanphuc.jpg',
            splats:'—', captured:'Dự kiến 08/2026', captured_en:'Planned 08/2026', unesco:false, tone:3 },
        ]
      },
    ]
  },

  {
    region: 'Miền Trung',
    region_en: 'Central Vietnam',
    blurb: 'Kinh đô triều Nguyễn, phố cảng Hội An và tháp gạch Chăm Pa.',
    blurb_en: 'The Nguyễn dynasty capital, the port town of Hội An and Cham brick towers.',

    /* ⏳ Chưa mở rộng tới đây. Xoá đúng dòng `soon: true` bên dưới là cả vùng
          hiện ra bình thường — nhớ thay dữ liệu mẫu bằng dữ liệu thật trước. */
    soon: true,

    cities: [
      {
        city: 'Thừa Thiên Huế', city_en: 'Hue',
        items: [
          { name:'Đại Nội Huế', name_en:'Hue Imperial City',
            type:'Di sản văn hoá thế giới', type_en:'World Cultural Heritage',
            era:'1805', era_en:'1805',
            lat:16.4698, lng:107.5786,
            viewer:'https://viewer.xgrids.com/REPLACE_ME/dai-noi-hue',
            splats:'156.4M', captured:'02/2025', unesco:true, tone:2 }
        ]
      }
    ]
  },

  {
    region: 'Miền Nam',
    region_en: 'Southern Vietnam',
    blurb: 'Kiến trúc thuộc địa, công trình tôn giáo và di tích chiến tranh.',
    blurb_en: 'Colonial architecture, religious landmarks and wartime sites.',

    /* ⏳ Chưa mở rộng tới đây. Xoá đúng dòng `soon: true` bên dưới là cả vùng
          hiện ra bình thường — nhớ thay dữ liệu mẫu bằng dữ liệu thật trước. */
    soon: true,

    cities: [
      {
        city: 'TP. Hồ Chí Minh', city_en: 'Ho Chi Minh City',
        items: [
          { name:'Dinh Độc Lập', name_en:'Independence Palace',
            type:'Di tích quốc gia đặc biệt', type_en:'Special National Monument',
            era:'1966', era_en:'1966',
            lat:10.7772, lng:106.6958,
            viewer:'https://viewer.xgrids.com/REPLACE_ME/dinh-doc-lap',
            splats:'87.1M', captured:'04/2025', unesco:false, tone:0 },

          { name:'Nhà thờ Đức Bà Sài Gòn', name_en:'Saigon Notre-Dame Cathedral',
            type:'Kiến trúc Pháp thuộc', type_en:'French colonial architecture',
            era:'1880', era_en:'1880',
            lat:10.7797, lng:106.6990,
            viewer:'https://viewer.xgrids.com/REPLACE_ME/nha-tho-duc-ba',
            splats:'52.3M', captured:'04/2025', unesco:false, tone:1 },

          { name:'Bưu điện Trung tâm Sài Gòn', name_en:'Saigon Central Post Office',
            type:'Kiến trúc Pháp thuộc', type_en:'French colonial architecture',
            era:'1891', era_en:'1891',
            lat:10.7799, lng:106.6997,
            viewer:'https://viewer.xgrids.com/REPLACE_ME/buu-dien-trung-tam',
            splats:'38.7M', captured:'04/2025', unesco:false, tone:2 },

          { name:'Địa đạo Củ Chi', name_en:'Củ Chi Tunnels',
            type:'Di tích quốc gia đặc biệt', type_en:'Special National Monument',
            era:'1948', era_en:'1948',
            lat:11.1417, lng:106.4644,
            viewer:'',
            splats:'—', captured:'Dự kiến 10/2026', captured_en:'Planned 10/2026', unesco:false, tone:3 }
        ]
      }
    ]
  }
];

/* Bỏ dấu tiếng Việt — dùng cho ô tìm kiếm gõ không dấu vẫn ra kết quả. */
window.pshDeaccent = function (s) {
  return String(s)
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
};

/* Làm phẳng thành một mảng để đếm, lọc và cắm ghim.
   Vùng có `soon: true` bị bỏ qua ở đây, nên nó không lọt vào bất cứ chỗ nào
   dùng PSH_FLAT: số liệu trang chủ, ghim bản đồ, ô tìm kiếm, bộ đếm kết quả. */
window.PSH_FLAT = (function () {
  var out = [], n = 0;
  window.PSH_HERITAGE.forEach(function (r) {
    if (r.soon) return;
    (r.cities || []).forEach(function (c) {
      c.items.forEach(function (it) {
        out.push(Object.assign({}, it, {
          region: r.region,
          region_en: r.region_en || r.region,
          city: c.city,
          city_en: c.city_en || c.city,
          id: 'psh-' + (n++),
          live: Boolean(it.viewer),
          /* Tìm kiếm khớp cả tiếng Việt lẫn tiếng Anh, có dấu hay không đều được. */
          search: window.pshDeaccent([
            it.name, it.name_en, c.city, c.city_en,
            r.region, r.region_en, it.type, it.type_en
          ].filter(Boolean).join(' ')).toLowerCase()
        }));
      });
    });
  });
  return out;
})();
