/* =========================================================================
   PIHERITAGE — ĐỌC / GHI FILE DỮ LIỆU CHO TRANG QUẢN TRỊ
   -------------------------------------------------------------------------
   heritage-data.js và client-data.js là file JS viết tay được. Trang quản trị
   chỉ ghi lại phần nằm giữa hai dòng mốc @@PSH-DATA-START / @@PSH-DATA-END,
   giữ nguyên phần hướng dẫn và code ở ngoài.
   ========================================================================= */
(function (root) {
  'use strict';

  var START = '@@PSH-DATA-START';
  var END = '/* @@PSH-DATA-END */';

  /* Chuỗi trong nháy đơn, đúng kiểu đang dùng trong các file dữ liệu. */
  function q(s) {
    return "'" + String(s == null ? '' : s)
      .replace(/\\/g, '\\\\').replace(/'/g, "\\'")
      .replace(/\r?\n/g, '\\n') + "'";
  }

  function val(v) {
    if (typeof v === 'string') return q(v);
    if (typeof v === 'number' || typeof v === 'boolean') return String(v);
    return JSON.stringify(v);
  }

  /* Ghi các ô theo nhóm cố định, ô lạ (thêm tay sau này) nối ở cuối để không mất. */
  function fields(obj, groups, indent) {
    var seen = {}, lines = [];
    groups.forEach(function (g) {
      var parts = g.filter(function (k) {
        seen[k] = true;
        return obj[k] !== undefined;
      }).map(function (k) { return k + ':' + val(obj[k]); });
      if (parts.length) lines.push(parts.join(', '));
    });
    var extra = Object.keys(obj).filter(function (k) { return !seen[k] && obj[k] !== undefined; });
    if (extra.length) lines.push(extra.map(function (k) { return k + ':' + val(obj[k]); }).join(', '));
    return lines.join(',\n' + indent);
  }

  var ITEM_GROUPS = [
    ['name', 'name_en'],
    ['type', 'type_en'],
    ['era', 'era_en'],
    ['lat', 'lng'],
    ['gmaps'],
    ['viewer'],
    ['photo'],
    ['splats', 'captured', 'captured_en', 'unesco', 'tone']
  ];

  function itemJS(it) {
    return '          { ' + fields(it, ITEM_GROUPS, '            ') + ' }';
  }

  function cityJS(c) {
    var extra = {};
    Object.keys(c).forEach(function (k) { if (k !== 'city' && k !== 'city_en' && k !== 'items') extra[k] = c[k]; });
    var head = '        city: ' + q(c.city) + ', city_en: ' + q(c.city_en || c.city) + ',\n';
    Object.keys(extra).forEach(function (k) { head += '        ' + k + ': ' + val(extra[k]) + ',\n'; });
    var items = c.items || [];
    return '      {\n' + head +
      (items.length
        ? '        items: [\n' + items.map(itemJS).join(',\n\n') + '\n        ]\n'
        : '        items: []\n') +
      '      }';
  }

  var REGION_KEYS = ['region', 'region_en', 'blurb', 'blurb_en', 'soon_note', 'soon_note_en'];

  function regionJS(r) {
    var out = '  {\n';
    REGION_KEYS.forEach(function (k) { if (r[k] !== undefined && r[k] !== '') out += '    ' + k + ': ' + q(r[k]) + ',\n'; });
    Object.keys(r).forEach(function (k) {
      if (REGION_KEYS.indexOf(k) === -1 && k !== 'soon' && k !== 'cities') out += '    ' + k + ': ' + val(r[k]) + ',\n';
    });
    if (r.soon) {
      out += '\n    /* ⏳ Chưa mở rộng tới đây — vùng này chỉ hiện ô "Sắp mở rộng" trên trang thư viện.\n' +
             '          Tắt ở trang quản trị, hoặc xoá dòng `soon: true` bên dưới. */\n' +
             '    soon: true,\n';
    }
    var cities = r.cities || [];
    out += '\n    cities: [\n' + cities.map(cityJS).join(',\n') + (cities.length ? '\n' : '') + '    ]\n  }';
    return out;
  }

  function heritageJS(regions) {
    return 'window.PSH_HERITAGE = [\n' + regions.map(regionJS).join(',\n\n') + '\n];\n';
  }

  function boxJS(b) { return '{ iv:' + q(b.iv) + ', data:' + q(b.data) + ' }'; }

  function clientJS(cfg) {
    var out = 'window.PSH_CLIENT = {\n' +
      '  salt: ' + q(cfg.salt) + ',\n' +
      '  iter: ' + cfg.iter + ',\n';
    if (cfg.adminSalt) out += '  adminSalt: ' + q(cfg.adminSalt) + ',\n';
    if (cfg.adminCheck) out += '  adminCheck: ' + boxJS(cfg.adminCheck) + ',\n';
    var list = cfg.projects || [];
    out += '  projects: [\n' + list.map(function (p) {
      var head = (p.id ? 'id:' + q(p.id) + ', ' : '') + 'iv:' + q(p.iv) + ', data:' + q(p.data);
      return '    { ' + head + (p.adm ? ',\n      adm:' + boxJS(p.adm) : '') + ' }';
    }).join(',\n') + (list.length ? '\n' : '') + '  ]';
    /* Dự án khách đồng ý công khai — bản đọc được, cho trang /du-an/. */
    if (cfg.showcase) {
      out += ',\n  showcase: [\n' + cfg.showcase.map(function (e) { return '    ' + JSON.stringify(e); }).join(',\n') +
        (cfg.showcase.length ? '\n' : '') + '  ]';
    }
    return out + '\n};\n';
  }

  /* Thay phần giữa hai mốc. Thiếu mốc thì báo lỗi rõ ràng thay vì ghi bừa. */
  function splice(text, block) {
    var s = text.indexOf(START), e = text.indexOf(END);
    if (s === -1 || e === -1 || e < s) {
      throw new Error('File thiếu dòng mốc @@PSH-DATA-START / @@PSH-DATA-END — hãy đẩy bản mới nhất của file lên GitHub trước.');
    }
    /* Giữ trọn ghi chú chứa mốc mở (có thể dài nhiều dòng), cắt sau dấu đóng của nó. */
    var close = text.indexOf('*/', s);
    var lineEnd = text.indexOf('\n', close);
    return text.slice(0, lineEnd + 1) + block + text.slice(e);
  }

  /* Chạy file dữ liệu trong một `window` giả để lấy ra object. */
  function run(text) {
    var w = {};
    new Function('window', text)(w);   // file của chính kho mình, không phải dữ liệu lạ
    return w;
  }

  root.PSH_FORMAT = {
    q: q,
    heritageJS: heritageJS,
    clientJS: clientJS,
    splice: splice,
    parseHeritage: function (text) { return run(text).PSH_HERITAGE; },
    parseClient: function (text) { return run(text).PSH_CLIENT; },
    START: START,
    END: END
  };
})(typeof window !== 'undefined' ? window : globalThis);
