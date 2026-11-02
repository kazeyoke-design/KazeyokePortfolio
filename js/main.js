/* ==================================================
   1. 共通ヘッダー・フッターの読み込み処理
   ================================================== */

document.addEventListener("DOMContentLoaded", async () => {
  await loadComponent("#header", "header.html");
  await loadComponent("#footer", "footer.html");

  initHeader();
  initFooter();
});

async function loadComponent(selector, file) {
  const target = document.querySelector(selector);

  if (!target) return;

  try {
    const response = await fetch(file);

    if (!response.ok) {
      throw new Error(`${file} の読み込みに失敗しました`);
    }

    target.innerHTML = await response.text();
  } catch (error) {
    console.error(error);
  }
}

function initHeader() {
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");

  if (!menuToggle || !nav) return;

  menuToggle.addEventListener("click", () => {
    const isOpen =
      menuToggle.getAttribute("aria-expanded") === "true";

    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "メニューを開く" : "メニューを閉じる"
    );

    nav.classList.toggle("is-open", !isOpen);
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "メニューを開く");
    });
  });
}

function initFooter() {
  const year = document.querySelector("#current-year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }
}




/* ========================================
   About：好きなもののツールチップ
======================================== */

document.querySelectorAll(".favorite-tags").forEach((container) => {
  const wraps = [
    ...container.querySelectorAll(".favorite-tag-wrap")
  ];

  function closeAll(except = null) {
    wraps.forEach((wrap) => {
      if (wrap === except) return;

      wrap.classList.remove("is-pinned");

      const button = wrap.querySelector(".favorite-tag");
      button?.setAttribute("aria-expanded", "false");
    });
  }

  wraps.forEach((wrap) => {
    const button = wrap.querySelector(".favorite-tag");

    button.addEventListener("click", () => {
      const wasPinned = wrap.classList.contains("is-pinned");

      closeAll();

      if (!wasPinned) {
        wrap.classList.add("is-pinned");
        button.setAttribute("aria-expanded", "true");
      }
    });

    // キーボードでフォーカスを外したときも閉じる
    wrap.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeAll();
        button.focus();
      }
    });
  });

  // タグやツールチップの外側をクリックしたら閉じる
  document.addEventListener("click", (event) => {
    if (!container.contains(event.target)) {
      closeAll();
    }
  });
});





/* カードHTML生成 */

function createWorkCardHTML(item) {
  const thumbnail = item.thumbnail || item.image;

  const imgContent = thumbnail
    ? `<img src="${thumbnail}" alt="${item.title}" style="width:100%; height:100%; object-fit:cover;">`
    : `<div class="work-thumb">Image (3:2)</div>`;

  return `
    <div class="work-card" onclick="openModal(${item.id})">
      <div style="aspect-ratio: 3/2; overflow: hidden; background-color: var(--color-border);">
        ${imgContent}
      </div>
      <div class="work-info">
        <div class="work-title">${item.title}</div>
      </div>
    </div>
  `;
}


/* トップページのプレビュー描画 */
function renderTopWorks() {
  const topIllGrid = document.getElementById('top-illustration-grid');
  const topDesGrid = document.getElementById('top-design-grid');
  const topLive2dGrid = document.getElementById('top-live2d-grid');

  if (topIllGrid && topDesGrid && topLive2dGrid) {
    const illItems = worksData.filter(item => item.category === 'illustration').slice(0, 2);
    const desItems = worksData.filter(item => item.category === 'design').slice(0, 2);
    const live2dItems = worksData.filter(item => item.category === 'live2d').slice(0, 2);

    topIllGrid.innerHTML = illItems.map(createWorkCardHTML).join('');
    topDesGrid.innerHTML = desItems.map(createWorkCardHTML).join('');
    topLive2dGrid.innerHTML = live2dItems.map(createWorkCardHTML).join('');
  }
}

/* ギャラリーページのフィルター描画 */
function filterGallery(category, btnElement) {
  const galleryGrid = document.getElementById('gallery-grid');
  if (!galleryGrid) return;

  if (btnElement) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btnElement.classList.add('active');
  }

  const filtered = category === 'all' 
    ? worksData 
    : worksData.filter(item => item.category === category);
  
  galleryGrid.innerHTML = filtered.map(createWorkCardHTML).join('');
}

/* ページ先頭へスムーズスクロール */
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}


/* モーダル表示制御 */
let modalScrollPosition = 0;

function openModal(id) {
  // クリックされた作品を取得
  const item = worksData.find(w => w.id === id);
  if (!item) return;

  // 画像・動画の表示
  const modalImgWrap = document.getElementById('modal-img-placeholder');

  if (modalImgWrap) {
    if (item.type === "video") {
      modalImgWrap.innerHTML = `
        <video
          controls
          playsinline
          preload="metadata"
          style="max-width:100%; max-height:100%; width:100%; height:100%; object-fit:contain;"
        >
          <source src="${item.image}" type="video/mp4">
          お使いのブラウザでは動画を再生できません。
        </video>
      `;
    } else if (item.image) {
      modalImgWrap.innerHTML = `
        <img
          src="${item.image}"
          alt="${item.title}"
          style="max-width:100%; max-height:100%; object-fit:contain;"
        >
      `;
    } else {
      modalImgWrap.textContent = 'Artwork Image';
    }
  }

  // タイトル・説明文を設定
  document.getElementById('modal-title').textContent = item.title;
  document.getElementById('modal-desc').textContent = item.desc || '';

  // 制作時期を設定
  const createdAt = document.getElementById('modal-created-at');

  if (createdAt) {
    createdAt.textContent = item.createdAt
      ? `制作時期：${item.createdAt.replace(/^(\d{4})-(\d{1,2})$/, '$1年$2月')}`
      : '';
  }

  // モーダルを開く
  const modal = document.getElementById('modal');

  if (!modal.classList.contains('active')) {
    modalScrollPosition = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${modalScrollPosition}px`;
    document.body.style.width = '100%';
  }

  modal.classList.add('active');
}

function closeModal() {
  const modal = document.getElementById('modal');
  if (!modal.classList.contains('active')) return;

  modal.classList.remove('active');
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.width = '';
  window.scrollTo(0, modalScrollPosition);
}

/* 初期化処理 */
document.addEventListener('DOMContentLoaded', () => {
  renderTopWorks();

  if (document.getElementById('gallery-grid')) {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category') || 'all';

    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
      btn.classList.remove('active');
      if (categoryParam === 'all' && btn.textContent === 'All') btn.classList.add('active');
      if (categoryParam === 'illustration' && btn.textContent === 'Illustration') btn.classList.add('active');
      if (categoryParam === 'design' && btn.textContent === 'Design') btn.classList.add('active');
      if (categoryParam === 'live2d' && btn.textContent === 'Live2D') btn.classList.add('active');
    });

    filterGallery(categoryParam);
  }
});





/* ==================================================
   ページネーション機能
   ================================================== */
const ITEMS_PER_PAGE = 6; // 1ページあたりの表示件数（お好みで変更可能）
let currentPage = 1;
let currentCategory = 'all';

// ギャラリーのフィルタリング＆ページ分割表示
function filterGallery(category, btnElement) {
  const galleryGrid = document.getElementById('gallery-grid');
  if (!galleryGrid) return;

  // ボタンのアクティブ状態を更新
  if (btnElement) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btnElement.classList.add('active');
  }

  currentCategory = category;
  currentPage = 1; // カテゴリ切り替え時は1ページ目に戻す

  renderGalleryPage();
}

// 現在のページの作品とページネーションUIを描画
function renderGalleryPage() {
  const galleryGrid = document.getElementById('gallery-grid');
  const paginationContainer = document.getElementById('pagination');
  if (!galleryGrid) return;

  // 選択中のカテゴリで対象作品を抽出
  const filteredWorks = currentCategory === 'all'
    ? worksData
    : worksData.filter(item => item.category === currentCategory);

  // ページ計算
  const totalItems = filteredWorks.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE) || 1;

  // ページの範囲外チェック
  if (currentPage > totalPages) currentPage = totalPages;

  // 現在のページに該当する作品データを抽出
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const pageWorks = filteredWorks.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // 作品カードを表示
  if (pageWorks.length > 0) {
    galleryGrid.innerHTML = pageWorks.map(createWorkCardHTML).join('');
  } else {
    galleryGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #8da4b0; padding: 40px 0;">作品がありません。</p>';
  }

  // ページネーションUIの生成
  renderPaginationUI(paginationContainer, totalPages);
}

// ページネーションボタンの生成
function renderPaginationUI(container, totalPages) {
  if (!container) return;

  // 作品数が1ページ以下ならページネーション非表示
  if (totalPages <= 1) {
    container.innerHTML = '';
    return;
  }

  let html = '';

  // 前へボタン
  html += `<button class="page-btn" ${currentPage === 1 ? 'disabled' : ''} onclick="changePage(${currentPage - 1})">‹</button>`;

  // ページ番号ボタン
  for (let i = 1; i <= totalPages; i++) {
    html += `<button class="page-btn ${i === currentPage ? 'active' : ''}" onclick="changePage(${i})">${i}</button>`;
  }

  // 次へボタン
  html += `<button class="page-btn" ${currentPage === totalPages ? 'disabled' : ''} onclick="changePage(${currentPage + 1})">›</button>`;

  container.innerHTML = html;
}

// ページ変更関数
function changePage(pageNumber) {
  currentPage = pageNumber;
  renderGalleryPage();

  // ギャラリー位置まで上スクロール
  const gallerySection = document.getElementById('gallery-grid');
  if (gallerySection) {
    gallerySection.scrollIntoView({ behavior: 'smooth' });
  }
}



const currentYear = new Date().getFullYear();
const yearElement = document.getElementById("current-year");

if (yearElement) {
  yearElement.textContent =
    currentYear > 2025 ? `–${currentYear}` : "";
}


// OPening Animation Control
const opening = document.getElementById("opening");

if (sessionStorage.getItem("openingPlayed")) {
  opening?.remove();
} else {
  sessionStorage.setItem("openingPlayed", "true");
}
