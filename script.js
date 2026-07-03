// ==================== FIREBASE ====================
const firebaseConfig = {
  apiKey: "AIzaSyC8h_NLwFq54mFSrZhG-gQnWJRIAr0zc5c",
  authDomain: "spiriligious-cms.firebaseapp.com",
  projectId: "spiriligious-cms",
  storageBucket: "spiriligious-cms.firebasestorage.app",
  messagingSenderId: "595657008516",
  appId: "1:595657008516:web:e7d2fed4b5e1e5c481e9d1",
  measurementId: "G-LXB9R61S94",
};
if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// ==================== HELPERS ====================
function escapeHtml(str) {
  if (!str) return "";
  return str.replace(
    /[&<>]/g,
    (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[m],
  );
}

function getReadingTime(content) {
  if (!content) return "1 min";
  const words = content.split(/\s+/).length;
  return Math.ceil(words / 200) + " min read";
}

function extractYouTubeId(url) {
  if (!url) return "";
  const match = url.match(/(?:youtube\.com\/embed\/|youtu\.be\/|v=)([^&?/]+)/);
  return match ? match[1] : "";
}

function formatDate(timestamp) {
  if (!timestamp || !timestamp.toDate) return "";
  return new Date(timestamp.toDate()).toLocaleString();
}

// ==================== UNIFIED RENDER FUNCTIONS ====================

/**
 * Renders a featured card for any content type
 * @param {string} containerId - The DOM id of the featured container
 * @param {Object} item - The featured item data
 * @param {string} type - 'sant', 'mandir', 'bhajan', 'science'
 * @param {string} detailFn - The function name to call on click (string)
 */
function renderFeatured(containerId, item, type, detailFn) {
  const container = document.getElementById(containerId);
  if (!container) return;

  if (!item) {
    container.innerHTML = `
      <div class="featured-image"><img src="https://via.placeholder.com/800x600?text=${type}" alt="No content" loading="lazy" /><span class="featured-badge">Featured</span></div>
      <div class="featured-content">
        <span class="category-tag">${type.charAt(0).toUpperCase() + type.slice(1)}</span>
        <h3>Coming Soon</h3>
        <div class="featured-divider"></div>
        <p class="featured-desc">Content will appear here. 🙏</p>
      </div>
    `;
    return;
  }

  const configs = {
    sant: {
      tag: "Sant Darshan",
      title: item.title,
      meta: [
        { icon: "fa-user", value: item.author || "Unknown" },
        { icon: "fa-clock", value: getReadingTime(item.content) },
      ],
      desc: item.content || "",
      image: item.imageUrl || "https://via.placeholder.com/800x600?text=Sant",
      btnText: "Read Article",
      btnIcon: "fa-book-open",
    },
    mandir: {
      tag: "Mandir Darshan",
      title: item.title,
      meta: [
        { icon: "fa-map-pin", value: item.location || "Sacred Site" },
        { icon: "fa-clock", value: getReadingTime(item.description) },
      ],
      desc: item.description || "",
      image: item.imageUrl || "https://via.placeholder.com/800x600?text=Temple",
      btnText: "Explore Temple",
      btnIcon: "fa-landmark",
    },
    bhajan: {
      tag: "Bhajan Collection",
      title: item.title,
      meta: [
        { icon: "fa-microphone-alt", value: item.singer || "Unknown" },
        { icon: "fa-clock", value: item.duration || "—" },
      ],
      desc: item.description || "",
      image:
        item.thumbnail ||
        (item.videoUrl
          ? `https://img.youtube.com/vi/${extractYouTubeId(item.videoUrl)}/hqdefault.jpg`
          : "https://via.placeholder.com/800x600?text=Bhajan"),
      btnText: "Listen Now",
      btnIcon: "fa-play",
    },
    science: {
      tag: "Science & Knowledge",
      title: item.title || item.term,
      meta: [
        { icon: "fa-user", value: item.author || "Researcher" },
        {
          icon: "fa-clock",
          value: getReadingTime(item.shortDesc || item.meaning),
        },
      ],
      desc: item.shortDesc || item.meaning || "",
      image:
        item.imageUrl || "https://via.placeholder.com/800x600?text=Science",
      btnText: "Read Analysis",
      btnIcon: "fa-microscope",
    },
  };

  const cfg = configs[type] || configs.sant;
  const metaHtml = cfg.meta
    .map(
      (m) =>
        `<span><i class="fas ${m.icon}"></i> ${escapeHtml(m.value)}</span>`,
    )
    .join("");

  container.innerHTML = `
    <div class="featured-image">
      <img src="${escapeHtml(cfg.image)}" alt="${escapeHtml(cfg.title)}" loading="lazy" />
      <span class="featured-badge">Featured</span>
    </div>
    <div class="featured-content">
      <span class="category-tag">${cfg.tag}</span>
      <h3>${escapeHtml(cfg.title)}</h3>
      <div class="featured-meta">${metaHtml}</div>
      <div class="featured-divider"></div>
      <p class="featured-desc">${escapeHtml((cfg.desc || "").substring(0, 180))}...</p>
      <div class="featured-actions">
        <button class="btn-primary-featured" onclick="${detailFn}('${item.id}')">
          <i class="fas ${cfg.btnIcon}"></i> ${cfg.btnText}
        </button>
      </div>
    </div>
  `;
}

/**
 * Renders a grid of content cards
 * @param {string} containerId - DOM id of the grid container
 * @param {Array} items - Array of item objects
 * @param {string} type - 'sant', 'mandir', 'bhajan', 'science'
 * @param {string} detailFn - Function name to call on click
 */
function renderCards(containerId, items, type, detailFn) {
  const container = document.getElementById(containerId);
  if (!container) return;

  if (!items || items.length === 0) {
    container.innerHTML = "";
    return;
  }

  const configs = {
    sant: {
      badge: "Sant",
      meta: (item) =>
        `<span><i class="fas fa-user"></i> ${escapeHtml(item.author)}</span>`,
      image: (item) =>
        item.imageUrl || "https://via.placeholder.com/400x250?text=Sant",
      title: (item) => item.title,
      desc: (item) => item.content || "",
      action: "Read More",
    },
    mandir: {
      badge: "Temple",
      meta: (item) =>
        `<span><i class="fas fa-map-pin"></i> ${escapeHtml(item.location || "Sacred")}</span>`,
      image: (item) =>
        item.imageUrl || "https://via.placeholder.com/400x250?text=Mandir",
      title: (item) => item.title,
      desc: (item) => item.description || "",
      action: "Explore",
    },
    bhajan: {
      badge: "Bhajan",
      meta: (item) =>
        item.singer
          ? `<span><i class="fas fa-microphone-alt"></i> ${escapeHtml(item.singer)}</span>`
          : "",
      image: (item) =>
        item.thumbnail ||
        (item.videoUrl
          ? `https://img.youtube.com/vi/${extractYouTubeId(item.videoUrl)}/hqdefault.jpg`
          : "https://via.placeholder.com/400x250?text=Bhajan"),
      title: (item) => item.title,
      desc: (item) => item.description || "",
      action: "Listen",
    },
    science: {
      badge: (item) =>
        item.type === "scientific" ? "Science" : "Encyclopedia",
      meta: (item) =>
        `<span><i class="fas fa-tag"></i> ${escapeHtml(item.category || "ज्ञानकोश")}</span>`,
      image: (item) =>
        item.imageUrl || "https://via.placeholder.com/400x250?text=Science",
      title: (item) => item.title || item.term,
      desc: (item) =>
        item.shortDesc || (item.meaning || "").substring(0, 120) + "...",
      action: "Read More",
    },
  };

  const cfg = configs[type] || configs.sant;
  let html = "";

  items.forEach((item) => {
    const badge = typeof cfg.badge === "function" ? cfg.badge(item) : cfg.badge;
    const image = typeof cfg.image === "function" ? cfg.image(item) : cfg.image;
    const title = typeof cfg.title === "function" ? cfg.title(item) : cfg.title;
    const desc = typeof cfg.desc === "function" ? cfg.desc(item) : cfg.desc;
    const meta = typeof cfg.meta === "function" ? cfg.meta(item) : cfg.meta;

    html += `
      <div class="content-card-unified" onclick="${detailFn}('${item.id}')">
        <div class="card-image-wrap">
          <img src="${escapeHtml(image)}" alt="${escapeHtml(title)}" loading="lazy" />
          <span class="card-badge">${escapeHtml(badge)}</span>
        </div>
        <div class="card-body">
          <h3 class="card-title">${escapeHtml(title)}</h3>
          <p class="card-desc">${escapeHtml((desc || "").substring(0, 120))}...</p>
          <div class="card-meta">${meta}</div>
          <span class="card-action">${cfg.action} <i class="fas fa-arrow-right"></i></span>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

// ==================== DATA LOADING FUNCTIONS ====================

async function loadDailyShlok() {
  const container = document.getElementById("shlokContent");
  if (!container) return;
  try {
    const snap = await db
      .collection("dailyShlok")
      .where("published", "==", true)
      .get();
    if (snap.empty) {
      container.innerHTML = `<p class="shlok-placeholder">🙏 कोई प्रकाशित श्लोक नहीं। कृपया बाद में देखें।</p>`;
      return;
    }
    let latest = null,
      latestDate = null;
    snap.forEach((doc) => {
      const data = doc.data();
      const d = data.date?.toDate ? data.date.toDate() : new Date(0);
      if (!latestDate || d > latestDate) {
        latestDate = d;
        latest = data;
      }
    });
    if (!latest) {
      container.innerHTML = `<p class="shlok-placeholder">🙏 श्लोक डेटा प्राप्त नहीं हुआ।</p>`;
      return;
    }
    const lines = latest.text
      .split(/\r?\n/)
      .filter((line) => line.trim() !== "");
    const shlokHtml = lines
      .map((line) => `<div class="shlok-line">${escapeHtml(line)}</div>`)
      .join("");
    container.innerHTML = `
      <div class="shlok-text">${shlokHtml}</div>
      <div class="shlok-meaning"><strong>अर्थ :</strong> ${escapeHtml(latest.meaning)}</div>
      ${latest.source ? `<div class="shlok-source">स्रोत : ${escapeHtml(latest.source)}</div>` : ""}
    `;
  } catch (err) {
    console.error("Error loading shlok:", err);
    container.innerHTML = `<p class="shlok-placeholder">🙏 श्लोक लोड नहीं हो सका। कृपया पुनः प्रयास करें।</p>`;
  }
}

// --- Unified loader for collections ---
async function loadCollection(
  collectionName,
  featuredId,
  gridId,
  type,
  detailFn,
  transformFn,
) {
  try {
    const snap = await db
      .collection(collectionName)
      .where("published", "==", true)
      .get();
    const docs = snap.docs;

    // Sort by createdAt descending
    docs.sort((a, b) => {
      const aDate = a.data().createdAt?.toDate
        ? a.data().createdAt.toDate()
        : new Date(0);
      const bDate = b.data().createdAt?.toDate
        ? b.data().createdAt.toDate()
        : new Date(0);
      return bDate - aDate;
    });

    // Find featured: either explicit featured flag or first doc
    let featuredDoc =
      docs.find((d) => d.data().featured === true) ||
      (docs.length > 0 ? docs[0] : null);
    let rest = docs.filter((d) => d.id !== featuredDoc?.id);

    // Transform data
    const transform = transformFn || ((doc) => ({ id: doc.id, ...doc.data() }));

    let featuredItem = featuredDoc ? transform(featuredDoc) : null;
    let restItems = rest.map((d) => transform(d));

    // Render featured
    renderFeatured(featuredId, featuredItem, type, detailFn);

    // Render grid
    renderCards(gridId, restItems, type, detailFn);

    return { featured: featuredItem, items: restItems };
  } catch (err) {
    console.error(`Error loading ${collectionName}:`, err);
    const container = document.getElementById(featuredId);
    if (container) {
      container.innerHTML = `<div class="featured-content"><h3>Error</h3><p>Could not load content.</p></div>`;
    }
    const grid = document.getElementById(gridId);
    if (grid) grid.innerHTML = "";
  }
}

// ==================== SECTION LOADERS ====================

function loadSantArticles() {
  return loadCollection(
    "santArticles",
    "featuredSantContainer",
    "santArticlesGrid",
    "sant",
    "openSantArticle",
    (doc) => ({ id: doc.id, ...doc.data() }),
  );
}

function loadMandirs() {
  return loadCollection(
    "mandirDarshan",
    "featuredTempleContainer",
    "mandirGrid",
    "mandir",
    "openMandirDetail",
    (doc) => ({ id: doc.id, ...doc.data() }),
  );
}

function loadBhajans() {
  return loadCollection(
    "bhajanVideos",
    "featuredBhajanContainer",
    "bhajanGrid",
    "bhajan",
    "openBhajanDetail",
    (doc) => ({ id: doc.id, ...doc.data() }),
  );
}

async function loadScience() {
  try {
    const [cardsSnap, termsSnap] = await Promise.all([
      db.collection("scientificCards").where("published", "==", true).get(),
      db.collection("encyclopediaTerms").where("published", "==", true).get(),
    ]);

    let items = [];
    cardsSnap.forEach((doc) => {
      const data = doc.data();
      items.push({
        id: doc.id,
        type: "scientific",
        ...data,
        createdAt: data.createdAt?.seconds || 0,
      });
    });
    termsSnap.forEach((doc) => {
      const data = doc.data();
      items.push({
        id: doc.id,
        type: "encyclopedia",
        term: data.term,
        meaning: data.meaning,
        scientific: data.scientific,
        createdAt: 0,
        featured: false,
      });
    });

    items.sort((a, b) => {
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      return b.createdAt - a.createdAt;
    });

    let featuredItem =
      items.find((i) => i.featured === true) ||
      (items.length > 0 ? items[0] : null);
    let restItems = items.filter((i) => i.id !== featuredItem?.id);

    // Render featured
    renderFeatured(
      "featuredScienceContainer",
      featuredItem,
      "science",
      "openScienceDetail",
    );

    // Render grid
    renderCards("scienceGrid", restItems, "science", "openScienceDetail");
  } catch (err) {
    console.error("Error loading science:", err);
    const container = document.getElementById("featuredScienceContainer");
    if (container) {
      container.innerHTML = `<div class="featured-content"><h3>Error</h3><p>Could not load science content.</p></div>`;
    }
    document.getElementById("scienceGrid").innerHTML = "";
  }
}

// ==================== DETAIL VIEWS ====================

async function openSantArticle(id) {
  const doc = await db.collection("santArticles").doc(id).get();
  if (!doc.exists) return;
  const a = doc.data();
  const html = `
    <h1 class="detail-title">${escapeHtml(a.title)}</h1>
    <div class="detail-meta">
      <span><i class="fas fa-user"></i> ${escapeHtml(a.author)}</span>
      <span><i class="fas fa-clock"></i> ${getReadingTime(a.content)}</span>
      ${a.authorCredits ? `<span><i class="fas fa-award"></i> ${escapeHtml(a.authorCredits)}</span>` : ""}
    </div>
    ${a.imageUrl ? `<img src="${escapeHtml(a.imageUrl)}" alt="${escapeHtml(a.title)}" class="detail-hero" />` : ""}
    <div class="detail-body-text dropcap">${a.content}</div>
    <div class="detail-share">
      <button onclick="shareContent('${escapeHtml(a.title)}','${window.location.href}')"><i class="fas fa-share-alt"></i></button>
      <button onclick="window.print()"><i class="fas fa-print"></i></button>
    </div>
  `;
  openDetailModal(html);
}

async function openMandirDetail(id) {
  const doc = await db.collection("mandirDarshan").doc(id).get();
  if (!doc.exists) return;
  const m = doc.data();
  let videoHtml = m.videoUrl
    ? `<div class="video-wrapper"><iframe src="${m.videoUrl}?rel=0" frameborder="0" allowfullscreen></iframe></div>`
    : "";
  let galleryHtml = "";
  if (m.gallery && m.gallery.length > 0) {
    galleryHtml = `<div class="detail-gallery">${m.gallery.map((img) => `<img src="${escapeHtml(img)}" alt="Gallery" loading="lazy" onclick="window.open('${escapeHtml(img)}','_blank')" />`).join("")}</div>`;
  }
  const html = `
    <h1 class="detail-title">${escapeHtml(m.title)}</h1>
    <div class="detail-meta">
      <span><i class="fas fa-map-pin"></i> ${escapeHtml(m.location || "Sacred Site")}</span>
      ${m.established ? `<span><i class="fas fa-calendar-alt"></i> Est. ${escapeHtml(m.established)}</span>` : ""}
      ${m.altitude ? `<span><i class="fas fa-mountain"></i> ${escapeHtml(m.altitude)} m</span>` : ""}
    </div>
    ${m.imageUrl ? `<img src="${escapeHtml(m.imageUrl)}" alt="${escapeHtml(m.title)}" class="detail-hero" />` : ""}
    <div class="detail-body-text">
      ${m.description ? `<p>${escapeHtml(m.description)}</p>` : ""}
      ${m.history ? `<h3>History</h3><p>${escapeHtml(m.history)}</p>` : ""}
      ${m.architecture ? `<h3>Architecture</h3><p>${escapeHtml(m.architecture)}</p>` : ""}
      ${m.significance ? `<h3>Religious Importance</h3><p>${escapeHtml(m.significance)}</p>` : ""}
      ${m.festivals ? `<h3>Festivals</h3><p>${escapeHtml(m.festivals)}</p>` : ""}
      ${m.travelInfo ? `<h3>Travel Information</h3><p>${escapeHtml(m.travelInfo)}</p>` : ""}
      ${m.openingHours ? `<h3>Opening Hours</h3><p>${escapeHtml(m.openingHours)}</p>` : ""}
      ${m.mapLink ? `<p><a href="${escapeHtml(m.mapLink)}" target="_blank" style="color:var(--gold);font-weight:600;"><i class="fas fa-map-marker-alt"></i> View on Map</a></p>` : ""}
    </div>
    ${galleryHtml}
    ${videoHtml}
    <div class="detail-share">
      <button onclick="shareContent('${escapeHtml(m.title)}','${window.location.href}')"><i class="fas fa-share-alt"></i></button>
      <button onclick="window.print()"><i class="fas fa-print"></i></button>
    </div>
  `;
  openDetailModal(html);
}

async function openBhajanDetail(id) {
  const doc = await db.collection("bhajanVideos").doc(id).get();
  if (!doc.exists) return;
  const v = doc.data();
  const thumb =
    v.thumbnail ||
    (v.videoUrl
      ? `https://img.youtube.com/vi/${extractYouTubeId(v.videoUrl)}/hqdefault.jpg`
      : "https://via.placeholder.com/800x600?text=Bhajan");

  let lyricsHtml = "";
  if (v.lyrics) {
    lyricsHtml = `
      <button class="lyrics-toggle" onclick="toggleLyrics()"><i class="fas fa-music"></i> Show Lyrics</button>
      <div class="lyrics-panel" id="lyricsPanel">${escapeHtml(v.lyrics)}</div>
    `;
  }
  let meaningHtml = "";
  if (v.meaning) {
    meaningHtml = `
      <button class="lyrics-toggle" onclick="toggleMeaning()"><i class="fas fa-book-open"></i> Show Meaning</button>
      <div class="meaning-panel" id="meaningPanel">${escapeHtml(v.meaning)}</div>
    `;
  }

  const html = `
    <img src="${escapeHtml(thumb)}" alt="${escapeHtml(v.title)}" class="detail-hero" />
    <h1 class="detail-title">${escapeHtml(v.title)}</h1>
    ${v.subtitle ? `<p style="color:var(--brown-soft);font-size:1.1rem;font-style:italic;margin-top:-0.3rem;">${escapeHtml(v.subtitle)}</p>` : ""}
    <div class="detail-meta">
      ${v.singer ? `<span><i class="fas fa-microphone-alt"></i> Singer: ${escapeHtml(v.singer)}</span>` : ""}
      ${v.composer ? `<span><i class="fas fa-music"></i> Composer: ${escapeHtml(v.composer)}</span>` : ""}
      ${v.lyricist ? `<span><i class="fas fa-feather-alt"></i> Lyricist: ${escapeHtml(v.lyricist)}</span>` : ""}
      ${v.duration ? `<span><i class="fas fa-clock"></i> ${escapeHtml(v.duration)}</span>` : ""}
      ${v.language ? `<span><i class="fas fa-language"></i> ${escapeHtml(v.language)}</span>` : ""}
    </div>
    ${v.description ? `<div class="detail-body-text"><p>${escapeHtml(v.description)}</p></div>` : ""}
    ${v.videoUrl ? `<div class="video-wrapper"><iframe src="${v.videoUrl}?rel=0" frameborder="0" allowfullscreen></iframe></div>` : ""}
    ${lyricsHtml}
    ${meaningHtml}
    <div class="detail-share">
      <button onclick="shareContent('${escapeHtml(v.title)}','${window.location.href}')"><i class="fas fa-share-alt"></i></button>
      <button onclick="window.print()"><i class="fas fa-print"></i></button>
    </div>
  `;
  openDetailModal(html);

  window.toggleLyrics = function () {
    const el = document.getElementById("lyricsPanel");
    if (el) el.classList.toggle("open");
  };
  window.toggleMeaning = function () {
    const el = document.getElementById("meaningPanel");
    if (el) el.classList.toggle("open");
  };
}

async function openScienceDetail(id, type) {
  let html = "";
  if (type === "scientific" || type === "science") {
    const doc = await db.collection("scientificCards").doc(id).get();
    if (!doc.exists) return;
    const d = doc.data();
    html = `
      <h1 class="detail-title">${escapeHtml(d.title)}</h1>
      <div class="detail-meta">
        <span><i class="fas fa-user"></i> ${escapeHtml(d.author || "Researcher")}</span>
        <span><i class="fas fa-tag"></i> ${escapeHtml(d.category || "Science")}</span>
        <span><i class="fas fa-clock"></i> ${getReadingTime(d.fullAnalysis)}</span>
      </div>
      ${d.imageUrl ? `<img src="${escapeHtml(d.imageUrl)}" alt="${escapeHtml(d.title)}" class="detail-hero" />` : ""}
      <div class="detail-body-text">
        ${d.shortDesc ? `<p><strong>Summary:</strong> ${escapeHtml(d.shortDesc)}</p>` : ""}
        ${d.fullAnalysis ? `<h3>Full Analysis</h3><p>${d.fullAnalysis}</p>` : ""}
        ${d.traditionalRef ? `<h3>Traditional Reference</h3><p>${escapeHtml(d.traditionalRef)}</p>` : ""}
        ${d.modernExplanation ? `<h3>Modern Explanation</h3><p>${escapeHtml(d.modernExplanation)}</p>` : ""}
        ${d.references ? `<h3>References</h3><p>${escapeHtml(d.references)}</p>` : ""}
        ${d.externalLinks ? `<h3>External Sources</h3><p>${escapeHtml(d.externalLinks)}</p>` : ""}
      </div>
      <div class="detail-share">
        <button onclick="shareContent('${escapeHtml(d.title)}','${window.location.href}')"><i class="fas fa-share-alt"></i></button>
        <button onclick="window.print()"><i class="fas fa-print"></i></button>
      </div>
    `;
  } else {
    const doc = await db.collection("encyclopediaTerms").doc(id).get();
    if (!doc.exists) return;
    const d = doc.data();
    html = `
      <h1 class="detail-title">${escapeHtml(d.term)}</h1>
      <div class="detail-meta">
        <span><i class="fas fa-book"></i> Encyclopedia</span>
        <span><i class="fas fa-clock"></i> ${getReadingTime(d.meaning + " " + d.scientific)}</span>
      </div>
      <div class="detail-body-text">
        <h3>Traditional Meaning</h3>
        <p>${escapeHtml(d.meaning)}</p>
        <h3>Scientific Explanation</h3>
        <p>${escapeHtml(d.scientific)}</p>
      </div>
      <div class="detail-share">
        <button onclick="shareContent('${escapeHtml(d.term)}','${window.location.href}')"><i class="fas fa-share-alt"></i></button>
        <button onclick="window.print()"><i class="fas fa-print"></i></button>
      </div>
    `;
  }
  openDetailModal(html);
}

// ==================== COMMUNITY ====================

async function loadCommunityDiscussions() {
  const container = document.getElementById("communityTopicsList");
  if (!container) return;
  try {
    const snap = await db
      .collection("forumTopics")
      .where("published", "==", true)
      .where("deleted", "==", false)
      .orderBy("createdAt", "desc")
      .limit(10)
      .get();
    if (snap.empty) {
      container.innerHTML =
        '<div class="discussion-item"><h4>अभी कोई चर्चा नहीं।</h4><p>पहली चर्चा शुरू करें! 🙏</p></div>';
      return;
    }
    let html = "";
    snap.forEach((doc) => {
      const t = doc.data();
      const dateStr = t.createdAt
        ? new Date(t.createdAt.toDate()).toLocaleString()
        : "";
      const replyCount = (t.replies && t.replies.length) || 0;
      html += `
        <div class="discussion-item" onclick="openDiscussionDetail('${doc.id}')">
          <h4>${escapeHtml(t.title)}</h4>
          <p>${escapeHtml((t.content || "").substring(0, 100))}...</p>
          <div class="discussion-meta">
            <span><i class="fas fa-user"></i> ${escapeHtml(t.author || "साधक")}</span>
            <span><i class="fas fa-calendar-alt"></i> ${dateStr}</span>
            <span><i class="fas fa-comment"></i> ${replyCount} replies</span>
          </div>
        </div>
      `;
    });
    container.innerHTML = html;
  } catch (err) {
    console.error(err);
    container.innerHTML =
      '<div class="discussion-item"><h4>चर्चाएँ लोड नहीं हो सकीं।</h4></div>';
  }
}

async function openDiscussionDetail(id) {
  const doc = await db.collection("forumTopics").doc(id).get();
  if (!doc.exists) return;
  const t = doc.data();
  const dateStr = t.createdAt
    ? new Date(t.createdAt.toDate()).toLocaleString()
    : "";
  let repliesHtml = "";
  if (t.replies && t.replies.length > 0) {
    repliesHtml = t.replies
      .map(
        (r) => `
      <div class="reply-item"><strong>${escapeHtml(r.author || "साधक")}</strong><span class="reply-date">${r.timestamp ? new Date(r.timestamp.toDate()).toLocaleString() : ""}</span><p>${escapeHtml(r.content)}</p></div>
    `,
      )
      .join("");
  } else {
    repliesHtml = '<p style="color:var(--brown-soft);">अभी कोई उत्तर नहीं।</p>';
  }
  const html = `
    <h1 class="detail-title">${escapeHtml(t.title)}</h1>
    <div class="detail-meta"><strong>✍️ ${escapeHtml(t.author || "साधक")}</strong> · ${dateStr}</div>
    <div class="detail-body-text" style="margin:1rem 0 1.5rem;">${escapeHtml(t.content)}</div>
    <h3 style="font-family:var(--font-serif);margin-bottom:0.8rem;">💬 उत्तर</h3>
    ${repliesHtml}
    <div style="margin-top:1.5rem;border-top:1px solid rgba(201,168,76,0.1);padding-top:1.5rem;">
      <p style="font-size:0.9rem;color:var(--brown-soft);">💡 उत्तर देने के लिए <a href="#manthan-section" style="color:var(--gold);font-weight:600;">Manthan Forum</a> पर जाएँ।</p>
    </div>
  `;
  openDetailModal(html);
}

// ==================== SHARE ====================

function shareContent(title, url) {
  if (navigator.share) {
    navigator.share({ title, text: title, url }).catch(() => {});
  } else {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        openModal(
          "🔗 Link Copied",
          "The link has been copied to your clipboard.",
        );
      })
      .catch(() => {
        openModal(
          "🔗 Share",
          `<p>Share this: <a href="${url}" target="_blank">${url}</a></p>`,
        );
      });
  }
}

// ==================== INIT ====================

// Expose all functions globally for inline onclick handlers
window.openSantArticle = openSantArticle;
window.openMandirDetail = openMandirDetail;
window.openBhajanDetail = openBhajanDetail;
window.openScienceDetail = openScienceDetail;
window.openDiscussionDetail = openDiscussionDetail;
window.shareContent = shareContent;
window.openModal = function (title, html) {
  document.getElementById("modalTitle").innerText = title;
  document.getElementById("modalMessage").innerHTML = html;
  document.getElementById("infoModal").style.display = "flex";
  document.body.style.overflow = "hidden";
};
window.closeModal = function () {
  document.getElementById("infoModal").style.display = "none";
  document.body.style.overflow = "auto";
};
window.openDetailModal = function (html) {
  document.getElementById("detailBody").innerHTML = html;
  document.getElementById("detailModal").style.display = "flex";
  document.body.style.overflow = "hidden";
};
window.closeDetailModal = function () {
  document.getElementById("detailModal").style.display = "none";
  document.body.style.overflow = "auto";
};

// Auto-load on DOM ready
document.addEventListener("DOMContentLoaded", function () {
  loadDailyShlok();
  loadSantArticles();
  loadMandirs();
  loadBhajans();
  loadScience();
  loadCommunityDiscussions();
});
