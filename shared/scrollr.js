// Scrollr* feed engine (shared by all editions).
// Each edition's feed.html defines window.SCROLLR_UI (interface strings) and optionally
// window.SCROLLR_SHARED (path to this folder) before loading this file.
const UI = window.SCROLLR_UI;
const SHARED = window.SCROLLR_SHARED || '../../shared/';
const BASE = location.origin + location.pathname.replace(/\/[^/]*$/, '');
function fillBase(s) { return typeof s === 'string' ? s.split('{{BASE}}').join(BASE) : s; }
function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
function escText(s) {
  return esc(s).replace(/\n/g, '<br>');
}
function linkifyText(s) {
  return s.split(/(https?:\/\/[^\s]+)/g).map(part =>
    /^https?:\/\//.test(part)
      ? `<a href="${esc(part)}" target="_blank" rel="noopener noreferrer">${esc(part)}</a>`
      : esc(part).replace(/\n/g, '<br>')
  ).join('');
}
function fmt(n) {
  if (n >= 1000000) return (n / 1000000).toFixed(1).replace('.0', '') + 'M';
  if (n >= 1000) return (n / 1000).toFixed(1).replace('.0', '') + 'K';
  return String(n);
}

let POSTS = [];
let state = {};


// ── Search ──
const searchInput = document.querySelector('.search-wrap input');
const noResults = document.createElement('p');
noResults.id = 'no-results';
noResults.style.cssText = 'text-align:center;color:#888;padding:48px 0;display:none;';
noResults.textContent = UI.noResults;

searchInput.addEventListener('input', function () {
  const q = this.value.trim().toLowerCase();
  const feed = document.getElementById('feed');
  let visible = 0;
  POSTS.forEach(p => {
    const el = document.getElementById('post-' + p.id);
    if (!el) return;
    const match = !q ||
      p.name.toLowerCase().includes(q) ||
      p.handle.toLowerCase().includes(q) ||
      p.text.toLowerCase().includes(q);
    el.style.display = match ? '' : 'none';
    if (match) visible++;
  });
  noResults.style.display = visible === 0 ? '' : 'none';
});

function renderMedia(p) {
  if (!p.media) return '';
  const { type, src, videoId, thumb } = p.media;
  if (type === 'image') {
    const fullClass = p.media.full ? ' full' : '';
    return `<div class="post-media${fullClass}"><img src="${esc(src)}" alt="" loading="lazy"></div>`;
  }
  if (type === 'gallery') {
    const imgs = p.media.srcs.map(s => `<img src="${esc(s)}" alt="" loading="lazy">`).join('');
    return `<div class="post-media post-gallery">${imgs}</div>`;
  }
  if (type === 'video') {
    return `<div class="post-video-wrap" id="vid-${p.id}" data-vid="${esc(videoId)}">
      <img src="${esc(thumb)}" alt="" loading="lazy">
      <div class="play-btn"><div class="play-arrow"></div></div>
    </div>`;
  }
  if (type === 'mp4') {
    const wideClass = p.media.wide ? ' wide' : '';
    const poster = p.media.thumb ? `poster="${esc(p.media.thumb)}"` : '';
    return `<div class="post-native-video${wideClass}" id="nvid-${p.id}">
      <video loop muted preload="metadata" playsinline crossorigin="anonymous" ${poster}>
        <source src="${esc(src)}" type="video/mp4">
      </video>
      <div class="video-overlay">
        <div class="video-play-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><polygon points="5,3 19,12 5,21"/></svg>
        </div>
      </div>
      <button class="video-mute-btn" title="${UI.sound}">🔇</button>
      <button class="video-expand-btn" data-action="expand-video" title="Fullscreen">⛶</button>
    </div>`;
  }
  return '';
}

function renderComment(c) {
  const av = c.img
    ? `<div class="c-av" style="background:none;overflow:hidden;padding:0;"><img src="${esc(c.img)}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;" alt=""></div>`
    : `<div class="c-av"></div>`;
  const photo = c.photo
    ? `<div class="c-photo"><img src="${esc(c.photo)}" alt=""></div>`
    : '';
  return `<div class="comment-item">
    ${av}
    <div class="c-bubble">
      <div class="c-name">${esc(c.name)}</div>
      <div class="c-text">${escText(c.text)}</div>
      ${photo}
    </div>
  </div>`;
}

function fmtPoints(n) {
  // UI.points = [singular (1), paucal (2-4), plural (0, 5+)]
  const w = UI.points;
  if (n === 1) return '1 ' + w[0];
  if (n >= 2 && n <= 4) return n + ' ' + w[1];
  return n + ' ' + w[2];
}

function renderPost(p) {
  const badge = p.badge ? `<span class="post-badge" title="${UI.verified}">✓</span>` : '';
  const s = p.s;
  return `
  <article class="post" id="post-${p.id}" data-cat="${esc(p.cat)}">
    <div class="post-header">
      ${p.img ? `<div class="av" style="background:none;overflow:hidden;padding:0;"><img src="${esc(p.img)}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;" alt=""></div>` : `<div class="av"></div>`}
      <div class="post-meta">
        <div class="post-meta-top">
          <span class="post-name">${esc(p.name)}</span>${badge}
        </div>
        <div class="post-meta-sub">
          <span class="post-handle">@${esc(p.handle)}</span>
          <span class="post-sep">·</span>
          <span class="post-time">${esc(p.time)}</span>
        </div>
      </div>
      <div class="post-badges">
        <span class="post-quest">${UI.quest} ${String(p.id).padStart(2, '0')}</span>
        <span class="post-points">${fmtPoints(p.points)}</span>
      </div>
      ${p.question ? `<div class="post-question-wrap">
        <button class="post-question-btn" aria-label="${UI.questionLabel}" onclick="toggleQuestion(this); event.stopPropagation();">
          <img src="${SHARED}Question.svg" alt="?">
        </button>
        <div class="post-question-tooltip">${linkifyText(p.question)}</div>
      </div>` : ''}
    </div>
    <div class="post-text">${linkifyText(p.text)}</div>
    ${renderMedia(p)}
    <div class="post-actions" data-id="${p.id}">
          <button class="act comment" data-action="comment" data-id="${p.id}">
            <span class="act-icon"><img src="${SHARED}icons/comment.svg" alt=""></span>
            <span class="act-count" id="cnt-c-${p.id}">${fmt(s.c)}</span>
          </button>
          <button class="act like" data-action="like" data-id="${p.id}">
            <span class="act-icon"><img src="${SHARED}icons/like.svg" alt=""></span>
            <span class="act-count" id="cnt-l-${p.id}">${fmt(s.l)}</span>
          </button>
          <button class="act heart" data-action="heart" data-id="${p.id}">
            <span class="act-icon"><img src="${SHARED}icons/smile.svg" alt=""></span>
            <span class="act-count" id="cnt-h-${p.id}">${fmt(s.h)}</span>
          </button>
          <button class="act hate" data-action="hate" data-id="${p.id}">
            <span class="act-icon"><img src="${SHARED}icons/ghost.svg" alt=""></span>
            <span class="act-count" id="cnt-x-${p.id}">${fmt(s.x)}</span>
          </button>
    </div>
    <div class="comments-wrap" id="comments-${p.id}">
          <div class="new-comment-row">
            <div class="my-av" style="background:none;overflow:hidden;padding:0;"><img src="avatars/me.png" style="width:100%;height:100%;object-fit:cover;border-radius:50%;" alt=""></div>
            <div class="comment-input-row">
              <input class="comment-input" id="cinput-${p.id}" placeholder="${UI.addComment}" data-pid="${p.id}">
              <button class="comment-send" data-action="send-comment" data-id="${p.id}" title="${UI.send}">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
              </button>
            </div>
          </div>
          <div class="comment-list" id="clist-${p.id}">
            ${p.comments.slice(0, 2).map(renderComment).join('')}
            ${p.comments.length > 2 ? `<div class="hidden-comments" id="hclist-${p.id}" style="display:none;flex-direction:column;gap:14px;">${p.comments.slice(2).map(renderComment).join('')}</div>` : ''}
          </div>
          ${p.comments.length > 2 ? `<div class="load-more" data-action="load-more" data-id="${p.id}">${UI.loadMore}</div>` : ''}
        </div>
    </div>
  </article>`;
}

const feedEl = document.getElementById('feed');

// ── Load posts from markdown files ──
function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) throw new Error('Missing frontmatter in post file');
  const data = jsyaml.load(match[1]);
  if (typeof data.text === 'string') data.text = data.text.trimEnd();
  // {{BASE}} in posts = absolute URL of this edition's folder (works on any domain)
  data.text = fillBase(data.text);
  data.question = fillBase(data.question);
  if (Array.isArray(data.comments)) data.comments.forEach(c => { c.text = fillBase(c.text); });
  return data;
}

async function init() {
  const index = await fetch('posts/index.json').then(r => r.json());
  const results = await Promise.all(
    index.map(f =>
      fetch('posts/' + f).then(r => r.text()).then(parseFrontmatter).catch(err => {
        console.warn('Skipping post ' + f + ':', err.message);
        return null;
      })
    )
  );
  POSTS = results.filter(p => p !== null);
  POSTS.forEach(p => {
    state[p.id] = { like: false, heart: false, hate: false, commentOpen: false, userComments: [] };
  });
  feedEl.innerHTML = POSTS.map(renderPost).join('');
  feedEl.appendChild(noResults);
}
init();

// ── Question toggle ──
function toggleQuestion(btn) {
  const wrap = btn.closest('.post-question-wrap');
  wrap.classList.toggle('open');
}
document.addEventListener('click', function(e) {
  const loadMore = e.target.closest('[data-action="load-more"]');
  if (loadMore) {
    const id = loadMore.dataset.id;
    const hidden = document.getElementById('hclist-' + id);
    if (hidden) { hidden.style.display = 'flex'; }
    loadMore.remove();
    return;
  }
  if (!e.target.closest('.post-question-wrap')) {
    document.querySelectorAll('.post-question-wrap.open').forEach(w => w.classList.remove('open'));
  }
});

// ── Native video player controls ──
feedEl.addEventListener('click', function (e) {
  const muteBtn = e.target.closest('.video-mute-btn');
  if (muteBtn) {
    const wrap = muteBtn.closest('.post-native-video');
    const video = wrap.querySelector('video');
    video.muted = !video.muted;
    muteBtn.textContent = video.muted ? '🔇' : '🔊';
    return;
  }
  const overlay = e.target.closest('.video-overlay');
  if (overlay) {
    const wrap = overlay.closest('.post-native-video');
    const video = wrap.querySelector('video');
    const muteB = wrap.querySelector('.video-mute-btn');
    video.play().then(() => {
      overlay.classList.add('hidden');
      muteB.classList.add('visible');
    }).catch(() => {
      // autoplay blocked — overlay stays visible
    });
    return;
  }
  const nvid = e.target.closest('.post-native-video');
  if (nvid && !e.target.closest('.video-overlay') && !e.target.closest('.video-mute-btn') && !e.target.closest('.video-expand-btn')) {
    const video = nvid.querySelector('video');
    const overlay = nvid.querySelector('.video-overlay');
    if (video.paused) {
      video.play().then(() => {
        overlay.classList.add('hidden');
      }).catch(() => {});
    } else {
      video.pause();
      overlay.classList.remove('hidden');
    }
  }
});

feedEl.addEventListener('keydown', function (e) {
  if (e.key !== 'Enter') return;
  const inp = e.target.closest('.comment-input');
  if (!inp) return;
  e.preventDefault();
  const id = parseInt(inp.dataset.pid, 10);
  const text = inp.value.trim();
  if (!text) return;
  const clist = document.getElementById('clist-' + id);
  const div = document.createElement('div');
  div.innerHTML = renderComment({ name: UI.me, img: 'avatars/me.png', text });
  clist.insertBefore(div.firstElementChild, clist.firstChild);
  inp.value = '';
  const post = POSTS.find(p => p.id === id);
  if (post) {
    post.s.c += 1;
    document.getElementById('cnt-c-' + id).textContent = fmt(post.s.c);
  }
});

feedEl.addEventListener('click', function (e) {
  const videoWrap = e.target.closest('.post-video-wrap');
  if (videoWrap) {
    const vid = videoWrap.dataset.vid;
    if (vid) {
      videoWrap.innerHTML = `<iframe src="https://www.youtube.com/embed/${encodeURIComponent(vid)}?autoplay=1" allow="autoplay; fullscreen" allowfullscreen></iframe>`;
    }
    return;
  }

  const btn = e.target.closest('[data-action]');
  if (!btn) return;

  const action = btn.dataset.action;
  const id = parseInt(btn.dataset.id, 10);
  if (!id) return;

  const st = state[id];
  const post = POSTS.find(p => p.id === id);
  if (!st || !post) return;

  if (action === 'comment') {
    st.commentOpen = !st.commentOpen;
    document.getElementById('comments-' + id).classList.toggle('open', st.commentOpen);
    btn.classList.toggle('on', st.commentOpen);
    if (st.commentOpen) document.getElementById('cinput-' + id).focus();
    return;
  }

  if (action === 'send-comment') {
    const inp = document.getElementById('cinput-' + id);
    const text = (inp ? inp.value : '').trim();
    if (!text) return;
    const clist = document.getElementById('clist-' + id);
    const div = document.createElement('div');
    div.innerHTML = renderComment({ name: UI.me, img: 'avatars/me.png', text });
    clist.insertBefore(div.firstElementChild, clist.firstChild);
    inp.value = '';
    post.s.c += 1;
    document.getElementById('cnt-c-' + id).textContent = fmt(post.s.c);
    return;
  }

  const KEY = { like: 'l', heart: 'h', hate: 'x' };
  const key = KEY[action];
  if (!key) return;
  const wasOn = st[action];
  st[action] = !wasOn;
  btn.classList.toggle('on', st[action]);
  post.s[key] += st[action] ? 1 : -1;
  document.getElementById(`cnt-${key}-${id}`).textContent = fmt(post.s[key]);
});
// ── Welcome modal ──
const welcomeOverlay = document.getElementById('welcome-overlay');
function openWelcome() { welcomeOverlay.classList.add('open'); }
function closeWelcome() { welcomeOverlay.classList.remove('open'); }
document.getElementById('bell-btn').addEventListener('click', openWelcome);
document.querySelector('.hamburger-btn').addEventListener('click', openWelcome);
document.getElementById('user-av-btn').addEventListener('click', openWelcome);
welcomeOverlay.addEventListener('click', function(e) {
  if (e.target === this) closeWelcome();
});
welcomeOverlay.querySelector('.welcome-close').addEventListener('click', closeWelcome);
// ── Lightbox ──
(function () {
  const lb      = document.getElementById('lightbox');
  const lbImg   = document.getElementById('lightbox-img');
  const lbVid   = document.getElementById('lightbox-video');
  const lbClose = document.getElementById('lightbox-close');
  const lbPrev  = document.getElementById('lightbox-prev');
  const lbNext  = document.getElementById('lightbox-next');

  let gallery = [];
  let idx = 0;

  function show(srcs, i) {
    gallery = srcs;
    idx = i;
    lbImg.src = gallery[idx];
    lbImg.style.display = '';
    lbVid.style.display = 'none';
    lbVid.pause();
    lbPrev.classList.toggle('hidden', gallery.length <= 1);
    lbNext.classList.toggle('hidden', gallery.length <= 1);
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function showVideo(src) {
    lbImg.style.display = 'none';
    lbImg.src = '';
    lbVid.style.display = '';
    lbVid.src = src;
    lbVid.play();
    lbPrev.classList.add('hidden');
    lbNext.classList.add('hidden');
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    lb.classList.remove('open');
    document.body.style.overflow = '';
    lbImg.src = '';
    lbVid.pause();
    lbVid.src = '';
    lbImg.style.display = '';
    lbVid.style.display = 'none';
  }

  function step(dir) {
    idx = (idx + dir + gallery.length) % gallery.length;
    lbImg.src = gallery[idx];
  }

  lbClose.addEventListener('click', close);
  lbPrev.addEventListener('click', () => step(-1));
  lbNext.addEventListener('click', () => step(1));
  lb.addEventListener('click', function (e) {
    if (e.target === lb) close();
  });
  document.addEventListener('keydown', function (e) {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') step(-1);
    if (e.key === 'ArrowRight') step(1);
  });

  document.getElementById('feed').addEventListener('click', function (e) {
    // Image lightbox
    const img = e.target.closest('.post-media img, .post-gallery img');
    if (img) {
      const wrap = img.closest('.post-media');
      const allImgs = wrap ? Array.from(wrap.querySelectorAll('img')) : [img];
      const srcs = allImgs.map(i => i.src);
      show(srcs, allImgs.indexOf(img));
      return;
    }
    // Video expand button
    const expandBtn = e.target.closest('.video-expand-btn');
    if (expandBtn) {
      e.stopPropagation();
      const wrap = expandBtn.closest('.post-native-video');
      const video = wrap ? wrap.querySelector('video source') : null;
      if (video) showVideo(video.src);
      return;
    }
  });
})();
