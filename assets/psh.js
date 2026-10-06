/* PiHeritage — hành vi dùng chung cho cả hai trang */
(function () {
  'use strict';

  /* `?still=1` dựng trang ở trạng thái tĩnh đã hoàn tất — dùng khi chụp ảnh hoặc in. */
  window.PSH_STILL = /[?&]still=1/.test(window.location.search);
  var reduce = window.PSH_STILL || window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --- Thanh nav khi cuộn ---
     Ở đỉnh trang: đầy đủ logo + chữ PiHeritage.
     Kéo xuống: nav trượt lên ẩn đi, đồng thời thu gọn logo (lúc đang ẩn nên không ai thấy nó co lại).
     Kéo ngược lên: nav hiện lại ở dạng gọn — chỉ còn biểu tượng.
     Về lại đỉnh trang: chữ PiHeritage hiện ra như cũ. */
  var nav = document.getElementById('nav');
  if (nav) {
    var TOP = 12;        // coi như đang ở đỉnh trang
    var HIDE_AFTER = 120; // cuộn quá mức này mới bắt đầu ẩn, để hero không bị giật
    var JITTER = 6;      // bỏ qua những lần cuộn quá nhỏ
    var lastY = window.scrollY;
    var ticking = false;

    var drawerOpen = function () {
      var b = document.getElementById('burger');
      return b && b.getAttribute('aria-expanded') === 'true';
    };

    var update = function () {
      ticking = false;
      var y = window.scrollY;
      var dy = y - lastY;

      nav.classList.toggle('is-stuck', y > TOP);

      if (y <= TOP) {
        nav.classList.remove('is-hidden', 'is-compact');
      } else if (Math.abs(dy) >= JITTER) {
        if (dy > 0 && y > HIDE_AFTER && !drawerOpen() && !nav.contains(document.activeElement)) {
          nav.classList.add('is-hidden', 'is-compact');
        } else if (dy < 0) {
          nav.classList.remove('is-hidden');
        }
      }
      if (Math.abs(dy) >= JITTER || y <= TOP) lastY = y;
    };

    update();
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
    }, { passive: true });

    /* Người dùng bàn phím Tab vào nav thì nav phải hiện ra. */
    nav.addEventListener('focusin', function () { nav.classList.remove('is-hidden'); });
  }

  /* --- Menu trên mobile --- */
  var burger = document.getElementById('burger');
  var drawer = document.getElementById('drawer');
  if (burger && drawer) {
    burger.addEventListener('click', function () {
      var open = burger.getAttribute('aria-expanded') === 'true';
      burger.setAttribute('aria-expanded', String(!open));
      drawer.hidden = open;
    });
    drawer.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        burger.setAttribute('aria-expanded', 'false');
        drawer.hidden = true;
      }
    });
  }

  /* --- Cuộn mượt (Lenis) ---
     Tắt khi người dùng chọn giảm chuyển động. Hộp thoại, bản đồ, khung viewer và
     vùng có data-lenis-prevent vẫn tự cuộn như thường.
     Nạp dạng module ES (import động) chứ không dùng thẻ <script> bản .min.js:
     bản đó khai báo biến toàn cục `L`, đè mất thư viện bản đồ Leaflet ở trang thư viện.
     Trang nào không muốn cuộn mượt (trang quản trị) thì đặt data-no-smooth trên <html>. */
  var LENIS_URL = 'https://unpkg.com/lenis@1.1.18/dist/lenis.mjs';
  if (!reduce && !document.documentElement.hasAttribute('data-no-smooth')) {
    import(LENIS_URL).then(function (m) { initLenis(m.default); })
      .catch(function () { /* mạng chặn CDN → cuộn bình thường, không sao */ });
  }

  function initLenis(Lenis) {
    var lenis = new Lenis({
      duration: 1.2,
      easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
      smoothWheel: true,
      prevent: function (node) {
        return !!(node.closest && node.closest('dialog, .leaflet-container, iframe, [data-lenis-prevent]'));
      }
    });
    var raf = function (time) { lenis.raf(time); window.requestAnimationFrame(raf); };
    window.requestAnimationFrame(raf);
    window.PSH_LENIS = lenis;

    /* Link neo trong cùng trang (#cong-nghe, #lien-he…) trượt mượt, chừa chỗ cho thanh nav. */
    document.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('a[href*="#"]');
      if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey) return;
      var url = new URL(a.href, window.location.href);
      if (url.pathname !== window.location.pathname || !url.hash || url.hash === '#') return;
      var target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -90 });
      history.pushState(null, '', url.hash);
    });
  }

  /* --- Hiện dần khi cuộn tới (chỉ transform + opacity) ---
     Những khối cùng lọt vào màn hình một lượt sẽ hiện so le từng nhịp 110ms. */
  var risers = document.querySelectorAll('.rise');
  if (reduce || !('IntersectionObserver' in window)) {
    risers.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var fired = false;
    var io = new IntersectionObserver(function (entries) {
      fired = true;
      var k = 0;
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.style.transitionDelay = (Math.min(k++, 6) * 110) + 'ms';
        en.target.classList.add('is-in');
        io.unobserve(en.target);
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 });
    risers.forEach(function (el) { io.observe(el); });

    /* Lưới an toàn: observer không chạy được thì vẫn phải hiện nội dung. */
    window.setTimeout(function () {
      if (!fired) risers.forEach(function (el) { el.classList.add('is-in'); });
    }, 2500);
  }

  /* --- Số liệu lấy thẳng từ heritage-data.js để không bao giờ lệch --- */
  function applyCounts() {
    var F = window.PSH_FLAT || [];
    var counts = {
      sites: F.length,
      live: F.filter(function (x) { return x.live; }).length,
      provinces: new Set(F.map(function (x) { return x.city; })).size,
      unesco: F.filter(function (x) { return x.unesco; }).length
    };
    Object.keys(counts).forEach(function (k) {
      document.querySelectorAll('[data-count="' + k + '"]').forEach(function (el) {
        el.textContent = counts[k];
      });
    });
  }

  function applyYear() {
    document.querySelectorAll('[data-year]').forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  }

  applyCounts();
  applyYear();

  /* Đổi ngôn ngữ sẽ vẽ lại phần chữ, nên phải điền số vào lần nữa. */
  document.addEventListener('psh:lang', function () {
    applyCounts();
    applyYear();
  });
})();
