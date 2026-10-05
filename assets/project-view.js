/* =========================================================================
   PIHERITAGE — HIỂN THỊ MỘT DỰ ÁN TRÊN SÂN KHẤU VIEWER
   -------------------------------------------------------------------------
   Dùng chung cho /khach-hang/ (dự án riêng, mở bằng mã) và /du-an/ (dự án
   công khai). Trang gọi PSH_VIEW({...}).show(project) là ra:
     tiêu đề + thông tin → ảnh bìa có nút "Xem bản scan 3D" → bấm mới tải viewer.

   Trang phải có sẵn các phần tử với id: head-open, o-client, o-project,
   m-place/o-place, m-captured/o-captured, m-splats/o-splats, bar, tabs,
   act-full(+label), act-tab, act-copy(+label), stage, viewer, poster,
   poster-img, poster-title, play, play-label, bar-status, foot-open,
   note-card, o-note. Nút act-lock là tuỳ chọn.
   ========================================================================= */
(function () {
  'use strict';

  var T = window.PSH_LANG;
  var $ = function (id) { return document.getElementById(id); };

  /* Chỉ nhận link https — tránh link lạ kiểu javascript: lọt vào iframe. */
  function safeURL(u) { return /^https:\/\//i.test(String(u || '')) ? u : ''; }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
    return new Promise(function (ok, fail) {
      var ta = document.createElement('textarea');
      ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      try { if (document.execCommand('copy')) ok(); else fail(); } catch (e) { fail(e); }
      document.body.removeChild(ta);
    });
  }

  /* opts:
       cover(project)  → URL ảnh bìa (hoặc Promise), null nếu không có
       share           → { url(), label:{vi,en}, done:{vi,en} } cho nút sao chép link
       onLock()        → có thì hiện nút "Khoá lại"                                   */
  window.PSH_VIEW = function (opts) {
    opts = opts || {};
    var reduce = window.PSH_STILL || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var stage = $('stage'), viewer = $('viewer'), poster = $('poster'), posterImg = $('poster-img');
    var tabsEl = $('tabs'), barStatus = $('bar-status');
    var project = null, idx = 0, coverToken = 0, copyTimer = null, hideTimer = null;

    function scans() {
      return project ? (project.scans || []).filter(function (s) { return safeURL(s.viewer); }) : [];
    }

    function fill(id, value, rowId) {
      $(id).textContent = value || '';
      if (rowId) $(rowId).hidden = !value;
    }

    function scanName(s, i) {
      return T.f(s, 'label') || T.t('Bản scan ' + (i + 1), 'Scan ' + (i + 1));
    }

    function paintLabels() {
      $('act-full-label').textContent = T.t('Toàn màn hình', 'Full screen');
      if (!copyTimer && opts.share) $('act-copy-label').textContent = T.t(opts.share.label.vi, opts.share.label.en);
      var list = scans();
      var many = list.length > 1;
      $('play-label').textContent = T.t('Xem bản scan 3D', 'View the 3D scan') +
        (many && list[idx] ? ' · ' + scanName(list[idx], idx) : '');
      $('poster-title').hidden = !many;
      if (many && list[idx]) $('poster-title').textContent = scanName(list[idx], idx);
    }

    function render() {
      if (!project) return;
      var name = T.f(project, 'project') || T.t('Bản scan', 'Scan');
      document.title = name + ' — PiHeritage';

      fill('o-client', T.f(project, 'client'));
      fill('o-project', name);
      fill('o-place', T.f(project, 'place'), 'm-place');
      fill('o-captured', T.f(project, 'captured'), 'm-captured');
      fill('o-splats', project.splats ? project.splats + T.t(' hạt', ' splats') : '', 'm-splats');

      var note = T.f(project, 'note');
      $('o-note').textContent = note || '';
      $('note-card').hidden = !note;

      /* Một bản scan thì không cần nút chọn. */
      var list = scans();
      tabsEl.innerHTML = '';
      if (list.length > 1) {
        list.forEach(function (s, i) {
          var b = document.createElement('button');
          b.type = 'button';
          b.className = 'filter-chip';
          b.textContent = scanName(s, i);
          b.setAttribute('aria-pressed', String(i === idx));
          b.addEventListener('click', function () { select(i); });
          tabsEl.appendChild(b);
        });
      }
      paintLabels();
    }

    function select(i) {
      var s = scans()[i];
      if (!s) {
        barStatus.textContent = T.t('Dự án này chưa có link viewer. Liên hệ PSH Design.',
                                    'This project has no viewer link yet. Contact PSH Design.');
        $('play').hidden = true;
        return;
      }
      idx = i;
      $('play').hidden = false;
      $('act-tab').href = s.viewer;
      Array.prototype.forEach.call(tabsEl.children, function (b, k) { b.setAttribute('aria-pressed', String(k === i)); });
      paintLabels();
      if (stage.dataset.state === 'open') loadViewer();
    }

    function loadViewer() {
      var s = scans()[idx];
      if (!s) return;
      viewer.hidden = false;
      if (viewer.getAttribute('src') !== s.viewer) viewer.src = s.viewer;
      viewer.title = T.t('Bản quét 3DGS: ', '3DGS scan: ') + scanName(s, idx);
      stage.dataset.state = 'open';
      clearTimeout(hideTimer);
      hideTimer = setTimeout(function () { if (stage.dataset.state === 'open') poster.hidden = true; }, reduce ? 0 : 650);
      barStatus.textContent = T.t('Lăn chuột trong khung chỉ điều khiển bản scan — đưa chuột ra ngoài khung để cuộn trang.',
                                  'Scrolling inside the frame only moves the scan — move the pointer outside to scroll the page.');
      if (stage.matches(':hover')) lockScroll(true);   // vừa bấm nút xem, chuột còn nằm trong khung
    }

    /* ---------------- Lăn chuột trong viewer ----------------
       Viewer là trang của xgrids nhúng qua iframe, ta không sửa được bên trong.
       Nó không giữ lại cú lăn chuột, nên trình duyệt chuyển cú lăn ra ngoài và cả
       trang cuộn theo. Cách chữa: chuột nằm trên khung viewer thì tạm khoá cuộn
       trang; chuột ra ngoài thì mở lại. Máy có thanh cuộn chiếm chỗ (Windows) thì
       giữ chỗ cho nó bằng `scrollbar-gutter`, để trang không bị giật ngang khi khoá;
       máy có thanh cuộn nổi (Mac, điện thoại) thì không cần. */
    var scrollLocked = false;
    function lockScroll(on) {
      if (on === scrollLocked) return;
      scrollLocked = on;
      var html = document.documentElement;
      var bar = on ? window.innerWidth - html.clientWidth : 0;
      html.style.scrollbarGutter = bar > 0 ? 'stable' : '';
      html.style.overflow = on ? 'hidden' : '';
    }
    stage.addEventListener('mouseenter', function () { if (stage.dataset.state === 'open') lockScroll(true); });
    stage.addEventListener('mouseleave', function () { lockScroll(false); });
    /* Lưới an toàn: chuột đã ở ngoài khung mà vì lý do nào đó chưa mở khoá. */
    document.addEventListener('pointermove', function (e) {
      if (scrollLocked && !stage.contains(e.target)) lockScroll(false);
    }, { passive: true });
    document.addEventListener('fullscreenchange', function () { lockScroll(false); });

    function showCover() {
      clearTimeout(hideTimer);
      lockScroll(false);
      poster.hidden = false;
      posterImg.classList.remove('is-in');
      posterImg.removeAttribute('src');
      void poster.offsetWidth;                // để hiệu ứng hiện dần chạy lại
      stage.dataset.state = 'cover';

      var token = ++coverToken;
      Promise.resolve(opts.cover ? opts.cover(project) : null).then(function (url) {
        if (token !== coverToken || !url) return;
        posterImg.onload = function () { if (token === coverToken) posterImg.classList.add('is-in'); };
        posterImg.src = url;
      }).catch(function () { /* không có ảnh thì để nền chấm sáng */ });
    }

    function show(p) {
      project = p;
      idx = 0;
      viewer.src = 'about:blank';
      viewer.hidden = true;
      barStatus.textContent = '';
      $('head-open').hidden = false;
      $('foot-open').hidden = false;
      $('bar').hidden = false;
      render();
      select(0);
      showCover();
    }

    function hide() {
      project = null;
      coverToken++;
      lockScroll(false);
      clearTimeout(hideTimer);
      viewer.src = 'about:blank';
      viewer.hidden = true;
      poster.hidden = true;
      posterImg.classList.remove('is-in');
      posterImg.removeAttribute('src');
      $('head-open').hidden = true;
      $('foot-open').hidden = true;
      $('bar').hidden = true;
      barStatus.textContent = '';
    }

    /* ---------------- Nút ---------------- */

    $('play').addEventListener('click', loadViewer);

    var canFull = !!(document.fullscreenEnabled || document.webkitFullscreenEnabled);
    $('act-full').hidden = !canFull;   // iPhone không hỗ trợ — đã có nút "Mở tab mới"
    $('act-full').addEventListener('click', function () {
      var fsEl = document.fullscreenElement || document.webkitFullscreenElement;
      if (fsEl) { (document.exitFullscreen || document.webkitExitFullscreen).call(document); return; }
      var req = stage.requestFullscreen || stage.webkitRequestFullscreen;
      if (req) req.call(stage);
    });

    if (opts.share) {
      $('act-copy').addEventListener('click', function () {
        var url = opts.share.url();
        copyText(url).then(function () {
          clearTimeout(copyTimer);
          $('act-copy-label').textContent = T.t('Đã sao chép', 'Copied');
          barStatus.textContent = T.t(opts.share.done.vi, opts.share.done.en);
          copyTimer = setTimeout(function () { copyTimer = null; paintLabels(); }, 2200);
        }, function () {
          barStatus.textContent = T.t('Không sao chép được. Link: ', 'Could not copy. Link: ') + url;
        });
      });
    } else {
      $('act-copy').hidden = true;
    }

    var lockBtn = $('act-lock');
    if (lockBtn) {
      if (opts.onLock) lockBtn.addEventListener('click', opts.onLock);
      else lockBtn.hidden = true;
    }

    /* Đổi ngôn ngữ: vẽ lại chữ, KHÔNG tải lại viewer đang xem. */
    document.addEventListener('psh:lang', function () { if (project) render(); });

    return {
      show: show,
      hide: hide,
      get project() { return project; }
    };
  };
})();
