/* =========================================================================
   PIGO HERITAGE — CHUYỂN ĐỔI TIẾNG VIỆT / TIẾNG ANH
   -------------------------------------------------------------------------
   CÁCH DỊCH MỘT CÂU: viết tiếng Việt như bình thường trong HTML, rồi thêm
   thuộc tính `data-en` chứa bản tiếng Anh. Ví dụ:

     <h2 data-en="Free for schools">Miễn phí cho trường học</h2>

   Thẻ nào KHÔNG có `data-en` thì giữ nguyên tiếng Việt ở cả hai ngôn ngữ.

   Dịch chữ nằm trong thuộc tính thì thêm tiền tố `data-en-`:

     <input placeholder="Ví dụ: Huế…" data-en-placeholder="e.g. Hue…">
     <button aria-label="Mở menu" data-en-aria-label="Open menu">

   Ngôn ngữ được nhớ trong trình duyệt. Lần đầu vào trang: máy nào để tiếng
   Việt thì hiện tiếng Việt, còn lại hiện tiếng Anh.
   ========================================================================= */
(function () {
  'use strict';

  var KEY = 'psh-lang';
  var ATTRS = ['placeholder', 'aria-label', 'title', 'alt', 'content'];

  var saved = null;
  try { saved = window.localStorage.getItem(KEY); } catch (e) { /* chế độ ẩn danh */ }

  /* `?lang=en` trên URL thắng tất cả — dùng để gửi thẳng link tiếng Anh cho đối tác. */
  var forced = (window.location.search.match(/[?&]lang=(en|vi)\b/) || [])[1];

  var browser = (navigator.language || 'vi').toLowerCase();
  var lang = forced
    ? forced
    : (saved === 'en' || saved === 'vi')
      ? saved
      : (browser.indexOf('vi') === 0 ? 'vi' : 'en');

  /* Giữ bản tiếng Việt gốc ngoài DOM để đổi qua đổi lại không mất chữ. */
  var ORIG_HTML = new WeakMap();
  var ORIG_ATTR = new WeakMap();

  function swapText() {
    document.querySelectorAll('[data-en]').forEach(function (el) {
      if (!ORIG_HTML.has(el)) ORIG_HTML.set(el, el.innerHTML);
      el.innerHTML = (lang === 'en') ? el.getAttribute('data-en') : ORIG_HTML.get(el);
    });
  }

  function swapAttrs() {
    ATTRS.forEach(function (attr) {
      document.querySelectorAll('[data-en-' + attr + ']').forEach(function (el) {
        var store = ORIG_ATTR.get(el);
        if (!store) { store = {}; ORIG_ATTR.set(el, store); }
        if (!(attr in store)) store[attr] = el.getAttribute(attr) || '';
        el.setAttribute(attr, (lang === 'en') ? el.getAttribute('data-en-' + attr) : store[attr]);
      });
    });
  }

  function apply() {
    document.documentElement.lang = lang;
    swapText();
    swapAttrs();

    document.querySelectorAll('[data-lang-btn]').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-lang-btn') === lang));
    });

    /* Báo cho các phần dựng bằng JS (thẻ di tích, số đếm…) vẽ lại. */
    document.dispatchEvent(new CustomEvent('psh:lang', { detail: { lang: lang } }));
  }

  function set(next) {
    if (next !== 'en' && next !== 'vi') return;
    lang = next;
    try { window.localStorage.setItem(KEY, next); } catch (e) { /* bỏ qua */ }
    apply();
  }

  /* Dùng ở file khác: window.PSH_LANG.get() / .set('en') / .t(vi, en) */
  window.PSH_LANG = {
    get: function () { return lang; },
    set: set,
    /* Chọn chuỗi theo ngôn ngữ đang bật — dùng cho chữ sinh ra từ JS. */
    t: function (vi, en) { return (lang === 'en' && en) ? en : vi; },
    /* Lấy ô `field` của một object, tự rơi về tiếng Việt nếu chưa dịch. */
    f: function (obj, field) {
      if (lang === 'en' && obj[field + '_en']) return obj[field + '_en'];
      return obj[field];
    }
  };

  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-lang-btn]');
    if (!btn) return;
    e.preventDefault();
    set(btn.getAttribute('data-lang-btn'));
  });

  apply();
})();
