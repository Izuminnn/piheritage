/* =========================================================================
   PIHERITAGE — KHOÁ BẢN SCAN RIÊNG CỦA KHÁCH HÀNG
   -------------------------------------------------------------------------
   Trang là web tĩnh, ai cũng đọc được file JS. Nên dữ liệu mỗi dự án (tên
   khách, link viewer, lời nhắn…) được mã hoá AES-256-GCM, khoá sinh ra từ
   chính mã truy cập bằng PBKDF2-SHA256. Không có mã thì chỉ thấy chuỗi
   loằng ngoằng — không lộ link, không lộ tên khách.

   Mỗi dự án còn có thêm một bản sao `adm`, khoá bằng MẬT KHẨU QUẢN TRỊ, để
   anh em trong công ty xem lại được mã của khách ở trang /quan-tri/.

   File này KHÔNG cần sửa. Dữ liệu nằm ở assets/client-data.js, và được
   thêm/sửa/xoá bằng trang /quan-tri/.
   ========================================================================= */
(function () {
  'use strict';

  /* Bỏ các ký tự dễ nhầm khi đọc qua điện thoại: 0/O, 1/I/L. */
  var ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
  var CODE_LEN = 12;

  var enc = new TextEncoder();
  var dec = new TextDecoder();

  function toB64(buf) {
    var s = '';
    new Uint8Array(buf).forEach(function (b) { s += String.fromCharCode(b); });
    return btoa(s);
  }
  function fromB64(str) {
    var s = atob(str), out = new Uint8Array(s.length);
    for (var i = 0; i < s.length; i++) out[i] = s.charCodeAt(i);
    return out;
  }

  /* Khách gõ thường, có cách, có gạch hay không đều được. */
  function normalize(code) { return String(code || '').toUpperCase().replace(/[^A-Z0-9]/g, ''); }
  function format(code) { return normalize(code).replace(/(.{4})(?=.)/g, '$1-'); }

  function supported() { return !!(window.crypto && window.crypto.subtle && window.TextEncoder); }

  /* Khoá AES từ một chuỗi bí mật bất kỳ (mã khách hoặc mật khẩu quản trị). */
  function keyFrom(secret, salt, iter) {
    return crypto.subtle.importKey('raw', enc.encode(secret), 'PBKDF2', false, ['deriveKey'])
      .then(function (base) {
        return crypto.subtle.deriveKey(
          { name: 'PBKDF2', salt: fromB64(salt), iterations: iter, hash: 'SHA-256' },
          base, { name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt']);
      });
  }

  function clientKey(code, cfg) { return keyFrom(normalize(code), cfg.salt, cfg.iter); }
  function adminKey(pass, cfg) { return keyFrom(String(pass), cfg.adminSalt, cfg.iter); }

  function sealKey(key, obj) {
    var iv = crypto.getRandomValues(new Uint8Array(12));
    return crypto.subtle.encrypt({ name: 'AES-GCM', iv: iv }, key, enc.encode(JSON.stringify(obj)))
      .then(function (buf) { return { iv: toB64(iv), data: toB64(buf) }; });
  }

  /* Sai khoá thì AES-GCM tự báo lỗi → trả về null. */
  function openKey(key, box) {
    if (!box || !box.iv || !box.data) return Promise.resolve(null);
    return crypto.subtle.decrypt({ name: 'AES-GCM', iv: fromB64(box.iv) }, key, fromB64(box.data))
      .then(function (buf) { return JSON.parse(dec.decode(buf)); }, function () { return null; });
  }

  /* Thử mở lần lượt từng dự án bằng mã. Trả về dữ liệu dự án, hoặc null nếu
     không dự án nào khớp. Không cần lưu mã ở đâu cả. */
  function open(code, cfg) {
    return clientKey(code, cfg).then(function (key) {
      var list = cfg.projects || [];
      var i = 0;
      function next() {
        if (i >= list.length) return null;
        return openKey(key, list[i++]).then(function (p) { return p || next(); });
      }
      return next();
    });
  }

  function seal(code, obj, cfg) {
    return clientKey(code, cfg).then(function (key) { return sealKey(key, obj); });
  }

  /* Ảnh bìa của dự án riêng: mã hoá bằng một khoá ngẫu nhiên riêng cho ảnh đó.
     Khoá nằm bên trong dữ liệu đã mã hoá của dự án, nên chỉ ai có mã mới xem được ảnh,
     và đổi mã dự án không cần mã hoá lại ảnh. */
  function sealBytes(bytes) {
    var raw = crypto.getRandomValues(new Uint8Array(32));
    var iv = crypto.getRandomValues(new Uint8Array(12));
    return crypto.subtle.importKey('raw', raw, 'AES-GCM', false, ['encrypt'])
      .then(function (k) { return crypto.subtle.encrypt({ name: 'AES-GCM', iv: iv }, k, bytes); })
      .then(function (ct) { return { key: toB64(raw), iv: toB64(iv), bytes: new Uint8Array(ct) }; });
  }

  function openBytes(ref, bytes) {
    return crypto.subtle.importKey('raw', fromB64(ref.key), 'AES-GCM', false, ['decrypt'])
      .then(function (k) { return crypto.subtle.decrypt({ name: 'AES-GCM', iv: fromB64(ref.iv) }, k, bytes); })
      .then(function (b) { return new Uint8Array(b); });
  }

  function makeSalt() { return toB64(crypto.getRandomValues(new Uint8Array(16))); }

  function makeCode() {
    var out = '';
    while (out.length < CODE_LEN) {
      var b = crypto.getRandomValues(new Uint8Array(1))[0];
      /* Loại các byte ≥ 248 để mọi ký tự có xác suất như nhau. */
      if (b < 248) out += ALPHABET[b % ALPHABET.length];
    }
    return format(out);
  }

  window.PSH_VAULT = {
    normalize: normalize,
    format: format,
    supported: supported,
    open: open,
    seal: seal,
    clientKey: clientKey,
    adminKey: adminKey,
    sealKey: sealKey,
    openKey: openKey,
    sealBytes: sealBytes,
    openBytes: openBytes,
    makeSalt: makeSalt,
    makeCode: makeCode,
    CODE_LEN: CODE_LEN
  };
})();
