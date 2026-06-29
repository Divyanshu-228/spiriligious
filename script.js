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
  return str.replace(/[&<>]/g, function (m) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;" }[m];
  });
}
function openComingSoon(title) {
  openModal(
    "🚧 आने वाला है",
    "<h3>" +
      title +
      "</h3><p>हम जल्द ही इस सुविधा को लाएंगे। कृपया बने रहें। 🙏</p>",
  );
}
function scrollToSection(id) {
  var el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

// ==================== MODALS ====================
var modal = document.getElementById("infoModal");
var modalTitle = document.getElementById("modalTitle");
var modalMessage = document.getElementById("modalMessage");

function openModal(title, html) {
  modalTitle.innerText = title;
  modalMessage.innerHTML = html;
  modal.style.display = "flex";
  document.body.style.overflow = "hidden";
}
function closeModal() {
  modal.style.display = "none";
  document.body.style.overflow = "auto";
}
window.addEventListener("click", function (e) {
  if (e.target === modal) closeModal();
});

// Detail Modal
var detailModal = document.getElementById("detailModal");
var detailBody = document.getElementById("detailBody");

function openDetailModal(html) {
  detailBody.innerHTML = html;
  detailModal.style.display = "flex";
  document.body.style.overflow = "hidden";
}
function closeDetailModal() {
  detailModal.style.display = "none";
  document.body.style.overflow = "auto";
}
window.addEventListener("click", function (e) {
  if (e.target === detailModal) closeDetailModal();
});

// ==================== LOAD DATA ====================

// ----- Daily Shlok -----
async function loadDailyShlok() {
  var container = document.getElementById("shlokContent");
  if (!container) return;
  try {
    var snap = await db
      .collection("dailyShlok")
      .where("published", "==", true)
      .get();
    if (snap.empty) {
      container.innerHTML =
        '<p class="shlok-placeholder">🙏 कोई प्रकाशित श्लोक नहीं। कृपया बाद में देखें।</p>';
      return;
    }
    var latest = null;
    var latestDate = null;
    snap.forEach(function (doc) {
      var data = doc.data();
      var d = data.date && data.date.toDate ? data.date.toDate() : new Date(0);
      if (!latestDate || d > latestDate) {
        latestDate = d;
        latest = data;
      }
    });
    if (!latest) {
      container.innerHTML =
        '<p class="shlok-placeholder">🙏 श्लोक डेटा प्राप्त नहीं हुआ।</p>';
      return;
    }
    container.innerHTML =
      '<div class="shlok-text">' +
      escapeHtml(latest.text) +
      "</div>" +
      '<div class="shlok-meaning"><strong>अर्थ :</strong> ' +
      escapeHtml(latest.meaning) +
      "</div>" +
      (latest.source
        ? '<div class="shlok-source">स्रोत : ' +
          escapeHtml(latest.source) +
          "</div>"
        : "");
  } catch (err) {
    console.error("Error loading shlok:", err);
    container.innerHTML =
      '<p class="shlok-placeholder">🙏 श्लोक लोड नहीं हो सका। कृपया पुनः प्रयास करें।</p>';
  }
}

// ----- Sant Articles (client-side sorting – no index required) -----
async function loadSantArticles() {
  var featuredContainer = document.getElementById("featuredSantContainer");
  var gridContainer = document.getElementById("santArticlesGrid");
  if (!featuredContainer || !gridContainer) return;

  try {
    var snap = await db
      .collection("santArticles")
      .where("published", "==", true)
      .get();
    if (snap.empty) {
      featuredContainer.innerHTML =
        '<div class="featured-image"><img src="https://via.placeholder.com/600x400?text=Sant" alt="No content" loading="lazy" /></div>' +
        '<div class="featured-content"><span class="badge">Featured</span><h3>Coming Soon</h3><p>Sant articles will appear here. 🙏</p></div>';
      gridContainer.innerHTML = "";
      return;
    }

    var docs = snap.docs;
    // Sort manually by createdAt (descending) – no Firebase index needed
    docs.sort(function (a, b) {
      var aDate =
        a.data().createdAt && a.data().createdAt.toDate
          ? a.data().createdAt.toDate()
          : new Date(0);
      var bDate =
        b.data().createdAt && b.data().createdAt.toDate
          ? b.data().createdAt.toDate()
          : new Date(0);
      return bDate - aDate;
    });

    var first = docs[0];
    var rest = docs.slice(1);
    var a = first.data();

    // Featured
    featuredContainer.innerHTML =
      '<div class="featured-image"><img src="' +
      escapeHtml(
        a.imageUrl || "https://via.placeholder.com/600x400?text=Sant",
      ) +
      '" alt="' +
      escapeHtml(a.title) +
      '" loading="lazy" /></div>' +
      '<div class="featured-content">' +
      '<span class="badge">Featured</span>' +
      "<h3>" +
      escapeHtml(a.title) +
      "</h3>" +
      '<div class="meta"><i class="fas fa-user"></i> ' +
      escapeHtml(a.author) +
      "</div>" +
      "<p>" +
      escapeHtml((a.content || "").substring(0, 150)) +
      "...</p>" +
      '<button class="btn-gold" onclick="openSantArticle(\'' +
      first.id +
      "')\">Read Article</button>" +
      "</div>";

    // Grid
    if (rest.length === 0) {
      gridContainer.innerHTML = "";
      return;
    }
    var html = "";
    rest.forEach(function (doc) {
      var item = doc.data();
      html +=
        '<div class="article-card" onclick="openSantArticle(\'' +
        doc.id +
        "')\">" +
        '<img src="' +
        escapeHtml(
          item.imageUrl || "https://via.placeholder.com/400x200?text=Sant",
        ) +
        '" alt="' +
        escapeHtml(item.title) +
        '" />' +
        '<div class="content">' +
        "<h3>" +
        escapeHtml(item.title) +
        "</h3>" +
        '<div class="author">✍️ ' +
        escapeHtml(item.author) +
        "</div>" +
        '<div class="excerpt">' +
        escapeHtml((item.content || "").substring(0, 120)) +
        "...</div>" +
        "</div></div>";
    });
    gridContainer.innerHTML = html;
  } catch (err) {
    console.error("Error loading sant articles:", err);
    featuredContainer.innerHTML =
      '<div class="featured-content"><h3>Error</h3><p>Could not load articles.</p></div>';
    gridContainer.innerHTML = "";
  }
}

// ----- Open Sant Article -----
async function openSantArticle(id) {
  var doc = await db.collection("santArticles").doc(id).get();
  if (!doc.exists) return;
  var a = doc.data();
  var html =
    "<h1>" +
    escapeHtml(a.title) +
    "</h1>" +
    '<div class="detail-meta"><strong>✍️ ' +
    escapeHtml(a.author) +
    "</strong>" +
    (a.authorCredits ? " · " + escapeHtml(a.authorCredits) : "") +
    "</div>" +
    (a.imageUrl
      ? '<img src="' +
        escapeHtml(a.imageUrl) +
        '" alt="' +
        escapeHtml(a.title) +
        '" />'
      : "") +
    '<div class="full-text sant-article-content">' +
    a.content +
    "</div>";
  openDetailModal(html);
}

// ----- Mandir Darshan (client-side sorting) -----
async function loadMandirs() {
  var featuredContainer = document.getElementById("featuredTempleContainer");
  var gridContainer = document.getElementById("mandirGrid");
  if (!featuredContainer || !gridContainer) return;

  try {
    var snap = await db
      .collection("mandirDarshan")
      .where("published", "==", true)
      .get();
    if (snap.empty) {
      featuredContainer.innerHTML =
        '<div class="featured-image"><img src="https://via.placeholder.com/600x400?text=Temple" alt="No content" loading="lazy" /></div>' +
        '<div class="featured-content"><span class="badge">Featured</span><h3>Coming Soon</h3><p>Temples will appear here. 🙏</p></div>';
      gridContainer.innerHTML = "";
      return;
    }

    var docs = snap.docs;
    docs.sort(function (a, b) {
      var aDate =
        a.data().createdAt && a.data().createdAt.toDate
          ? a.data().createdAt.toDate()
          : new Date(0);
      var bDate =
        b.data().createdAt && b.data().createdAt.toDate
          ? b.data().createdAt.toDate()
          : new Date(0);
      return bDate - aDate;
    });

    var first = docs[0];
    var rest = docs.slice(1);
    var m = first.data();

    featuredContainer.innerHTML =
      '<div class="featured-image"><img src="' +
      escapeHtml(
        m.imageUrl || "https://via.placeholder.com/600x400?text=Temple",
      ) +
      '" alt="' +
      escapeHtml(m.title) +
      '" loading="lazy" /></div>' +
      '<div class="featured-content">' +
      '<span class="badge">Featured</span>' +
      "<h3>" +
      escapeHtml(m.title) +
      "</h3>" +
      '<div class="meta"><i class="fas fa-map-pin"></i> ' +
      escapeHtml(m.location || "Sacred Site") +
      "</div>" +
      "<p>" +
      escapeHtml((m.description || "").substring(0, 150)) +
      "...</p>" +
      '<button class="btn-gold" onclick="openMandirDetail(\'' +
      first.id +
      "')\">Explore Temple</button>" +
      "</div>";

    if (rest.length === 0) {
      gridContainer.innerHTML = "";
      return;
    }
    var html = "";
    rest.forEach(function (doc) {
      var item = doc.data();
      html +=
        '<div class="darshan-card" onclick="openMandirDetail(\'' +
        doc.id +
        "')\">" +
        '<img class="darshan-image" src="' +
        escapeHtml(
          item.imageUrl || "https://via.placeholder.com/400x200?text=Mandir",
        ) +
        '" alt="' +
        escapeHtml(item.title) +
        '" />' +
        '<div class="darshan-content">' +
        '<span class="darshan-badge">🛕 दिव्य स्थल</span>' +
        "<h3>" +
        escapeHtml(item.title) +
        "</h3>" +
        "<p>" +
        escapeHtml((item.description || "").substring(0, 100)) +
        "...</p>" +
        "</div></div>";
    });
    gridContainer.innerHTML = html;
  } catch (err) {
    console.error("Error loading mandirs:", err);
    featuredContainer.innerHTML =
      '<div class="featured-content"><h3>Error</h3><p>Could not load temples.</p></div>';
    gridContainer.innerHTML = "";
  }
}

// ----- Open Mandir Detail -----
async function openMandirDetail(id) {
  var doc = await db.collection("mandirDarshan").doc(id).get();
  if (!doc.exists) return;
  var m = doc.data();
  var videoHtml = "";
  if (m.videoUrl) {
    videoHtml =
      '<div class="video-wrapper"><iframe src="' +
      m.videoUrl +
      '?rel=0" frameborder="0" allowfullscreen></iframe></div>';
  }
  var html =
    "<h1>" +
    escapeHtml(m.title) +
    "</h1>" +
    (m.imageUrl
      ? '<img src="' +
        escapeHtml(m.imageUrl) +
        '" alt="' +
        escapeHtml(m.title) +
        '" />'
      : "") +
    '<div class="full-text">' +
    escapeHtml(m.description) +
    "</div>" +
    videoHtml;
  openDetailModal(html);
}

// ----- Bhajan Videos (client-side sorting) -----
async function loadBhajans() {
  var featuredContainer = document.getElementById("featuredBhajanContainer");
  var gridContainer = document.getElementById("bhajanGrid");
  if (!featuredContainer || !gridContainer) return;

  try {
    var snap = await db
      .collection("bhajanVideos")
      .where("published", "==", true)
      .get();
    if (snap.empty) {
      featuredContainer.innerHTML =
        '<div class="featured-image"><img src="https://via.placeholder.com/600x400?text=Bhajan" alt="No content" loading="lazy" /></div>' +
        '<div class="featured-content"><span class="badge">Featured</span><h3>Coming Soon</h3><p>Bhajans will appear here. 🙏</p></div>';
      gridContainer.innerHTML = "";
      return;
    }

    var docs = snap.docs;
    docs.sort(function (a, b) {
      var aDate =
        a.data().createdAt && a.data().createdAt.toDate
          ? a.data().createdAt.toDate()
          : new Date(0);
      var bDate =
        b.data().createdAt && b.data().createdAt.toDate
          ? b.data().createdAt.toDate()
          : new Date(0);
      return bDate - aDate;
    });

    var first = docs[0];
    var rest = docs.slice(1);
    var v = first.data();

    featuredContainer.innerHTML =
      '<div class="featured-image"><img src="https://img.youtube.com/vi/' +
      extractYouTubeId(v.videoUrl) +
      '/hqdefault.jpg" alt="' +
      escapeHtml(v.title) +
      '" loading="lazy" /></div>' +
      '<div class="featured-content">' +
      '<span class="badge">Featured</span>' +
      "<h3>" +
      escapeHtml(v.title) +
      "</h3>" +
      '<div class="meta"><i class="fas fa-microphone-alt"></i> Bhajan</div>' +
      "<p>" +
      escapeHtml(
        (v.description || "").substring(0, 150) ||
          "Listen to this devotional bhajan.",
      ) +
      "</p>" +
      '<button class="btn-gold" onclick="openBhajanDetail(\'' +
      first.id +
      "')\">Listen Now</button>" +
      "</div>";

    if (rest.length === 0) {
      gridContainer.innerHTML = "";
      return;
    }
    var html = "";
    rest.forEach(function (doc) {
      var item = doc.data();
      html +=
        '<div class="darshan-card" onclick="openBhajanDetail(\'' +
        doc.id +
        "')\">" +
        '<div class="darshan-content">' +
        '<span class="darshan-badge">🎵 भजन</span>' +
        "<h3>" +
        escapeHtml(item.title) +
        "</h3>" +
        '<div style="margin-top:0.5rem; background:#000; border-radius:8px; overflow:hidden;">' +
        '<iframe src="' +
        item.videoUrl +
        '?rel=0" style="width:100%; aspect-ratio:16/9;" frameborder="0" allowfullscreen></iframe>' +
        "</div></div></div>";
    });
    gridContainer.innerHTML = html;
  } catch (err) {
    console.error("Error loading bhajans:", err);
    featuredContainer.innerHTML =
      '<div class="featured-content"><h3>Error</h3><p>Could not load bhajans.</p></div>';
    gridContainer.innerHTML = "";
  }
}

// ----- Open Bhajan Detail -----
async function openBhajanDetail(id) {
  var doc = await db.collection("bhajanVideos").doc(id).get();
  if (!doc.exists) return;
  var v = doc.data();
  var html =
    "<h1>" +
    escapeHtml(v.title) +
    "</h1>" +
    '<div class="video-wrapper"><iframe src="' +
    v.videoUrl +
    '?rel=0" frameborder="0" allowfullscreen></iframe></div>' +
    (v.description
      ? '<div class="full-text">' + escapeHtml(v.description) + "</div>"
      : "");
  openDetailModal(html);
}

// ----- Extract YouTube ID -----
function extractYouTubeId(url) {
  if (!url) return "";
  var match = url.match(/(?:youtube\.com\/embed\/|youtu\.be\/|v=)([^&?/]+)/);
  return match ? match[1] : "";
}

// ----- Science Section -----
async function loadScience() {
  var container = document.getElementById("scienceGrid");
  if (!container) return;
  try {
    var [cardsSnap, termsSnap] = await Promise.all([
      db.collection("scientificCards").where("published", "==", true).get(),
      db.collection("encyclopediaTerms").where("published", "==", true).get(),
    ]);
    var items = [];
    cardsSnap.forEach(function (doc) {
      var data = doc.data();
      items.push({
        id: doc.id,
        type: "scientific",
        title: data.title,
        category: data.category,
        shortDesc: data.shortDesc,
        fullContent: data.fullAnalysis,
        pinned: data.pinned || false,
        createdAt: data.createdAt?.seconds || 0,
        imageUrl: data.imageUrl || null,
      });
    });
    termsSnap.forEach(function (doc) {
      var data = doc.data();
      items.push({
        id: doc.id,
        type: "encyclopedia",
        title: data.term,
        category: "ज्ञानकोश",
        shortDesc: data.meaning,
        fullContent:
          "<strong>परंपरागत अर्थ:</strong> " +
          escapeHtml(data.meaning) +
          "<br><br><strong>वैज्ञानिक व्याख्या:</strong> " +
          escapeHtml(data.scientific),
        pinned: false,
        createdAt: 0,
        imageUrl: null,
      });
    });
    items.sort(function (a, b) {
      if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
      return b.createdAt - a.createdAt;
    });
    if (items.length === 0) {
      container.innerHTML =
        '<div style="grid-column:1/-1; text-align:center; padding:2rem;">⚠️ कोई विश्लेषण उपलब्ध नहीं।</div>';
      return;
    }
    var html = "";
    items.forEach(function (item) {
      var tag =
        item.type === "scientific" ? "🔬 वैज्ञानिक विश्लेषण" : "📖 ज्ञानकोश";
      var short =
        item.type === "scientific"
          ? item.shortDesc
          : (item.shortDesc || "").substring(0, 120) + "...";
      var imgHtml = item.imageUrl
        ? '<img src="' +
          escapeHtml(item.imageUrl) +
          '" alt="' +
          escapeHtml(item.title) +
          '" class="science-image" />'
        : "";
      html +=
        '<div class="analysis-card" onclick="openScienceDetail(\'' +
        item.id +
        "','" +
        item.type +
        "')\">" +
        imgHtml +
        '<div class="analysis-content">' +
        '<span class="card-tag">' +
        tag +
        "</span>" +
        "<h3>" +
        escapeHtml(item.title) +
        "</h3>" +
        "<p>" +
        escapeHtml(short) +
        "</p>" +
        '<button class="read-more-btn">पूरा विवरण →</button>' +
        "</div></div>";
    });
    container.innerHTML = html;
  } catch (err) {
    console.error(err);
    container.innerHTML =
      '<div style="text-align:center;padding:2rem;">त्रुटि: डेटा लोड नहीं हो सका।</div>';
  }
}

// ----- Open Science Detail -----
async function openScienceDetail(id, type) {
  var data;
  if (type === "scientific") {
    var doc = await db.collection("scientificCards").doc(id).get();
    if (!doc.exists) return;
    data = doc.data();
    var html =
      "<h1>" +
      escapeHtml(data.title) +
      "</h1>" +
      '<div class="detail-meta">📂 ' +
      escapeHtml(data.category) +
      "</div>" +
      (data.imageUrl
        ? '<img src="' +
          escapeHtml(data.imageUrl) +
          '" alt="' +
          escapeHtml(data.title) +
          '" />'
        : "") +
      '<div class="full-text">' +
      data.fullAnalysis +
      "</div>";
    openDetailModal(html);
  } else {
    var doc = await db.collection("encyclopediaTerms").doc(id).get();
    if (!doc.exists) return;
    data = doc.data();
    var html =
      "<h1>" +
      escapeHtml(data.term) +
      "</h1>" +
      '<div class="full-text">' +
      "<strong>परंपरागत अर्थ:</strong> " +
      escapeHtml(data.meaning) +
      "<br><br>" +
      "<strong>वैज्ञानिक व्याख्या:</strong> " +
      escapeHtml(data.scientific) +
      "</div>";
    openDetailModal(html);
  }
}

// ----- Community Discussions -----
async function loadCommunityDiscussions() {
  var container = document.getElementById("communityTopicsList");
  if (!container) return;
  try {
    var snap = await db
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
    var html = "";
    snap.forEach(function (doc) {
      var t = doc.data();
      var dateStr = t.createdAt
        ? new Date(t.createdAt.toDate()).toLocaleString()
        : "";
      var replyCount = (t.replies && t.replies.length) || 0;
      html +=
        '<div class="discussion-item" onclick="openDiscussionDetail(\'' +
        doc.id +
        "')\">" +
        "<h4>" +
        escapeHtml(t.title) +
        "</h4>" +
        "<p>" +
        escapeHtml((t.content || "").substring(0, 100)) +
        "...</p>" +
        '<div class="discussion-meta">' +
        '<span><i class="fas fa-user"></i> ' +
        escapeHtml(t.author || "साधक") +
        "</span>" +
        '<span><i class="fas fa-calendar-alt"></i> ' +
        dateStr +
        "</span>" +
        '<span><i class="fas fa-comment"></i> ' +
        replyCount +
        " replies</span>" +
        "</div></div>";
    });
    container.innerHTML = html;
  } catch (err) {
    console.error(err);
    container.innerHTML =
      '<div class="discussion-item"><h4>चर्चाएँ लोड नहीं हो सकीं।</h4></div>';
  }
}

// ----- Open Discussion Detail -----
async function openDiscussionDetail(id) {
  var doc = await db.collection("forumTopics").doc(id).get();
  if (!doc.exists) return;
  var t = doc.data();
  var dateStr = t.createdAt
    ? new Date(t.createdAt.toDate()).toLocaleString()
    : "";
  var repliesHtml = "";
  if (t.replies && t.replies.length > 0) {
    repliesHtml = t.replies
      .map(function (r) {
        return (
          '<div class="reply-item"><strong>' +
          escapeHtml(r.author || "साधक") +
          '</strong><span class="reply-date">' +
          (r.timestamp ? new Date(r.timestamp.toDate()).toLocaleString() : "") +
          "</span><p>" +
          escapeHtml(r.content) +
          "</p></div>"
        );
      })
      .join("");
  } else {
    repliesHtml = '<p style="color:var(--brown-soft);">अभी कोई उत्तर नहीं।</p>';
  }
  var html =
    "<h1>" +
    escapeHtml(t.title) +
    "</h1>" +
    '<div class="detail-meta"><strong>✍️ ' +
    escapeHtml(t.author || "साधक") +
    "</strong> · " +
    dateStr +
    "</div>" +
    '<div class="full-text" style="margin:1rem 0 1.5rem;">' +
    escapeHtml(t.content) +
    "</div>" +
    '<h3 style="font-family:var(--font-serif); margin-bottom:0.8rem;">💬 उत्तर</h3>' +
    repliesHtml +
    '<div style="margin-top:1.5rem; border-top:1px solid rgba(201,168,76,0.1); padding-top:1.5rem;">' +
    '<p style="font-size:0.9rem; color:var(--brown-soft);">💡 उत्तर देने के लिए <a href="forum.html" style="color:var(--gold); font-weight:600;">Manthan Forum</a> पर जाएँ।</p>' +
    "</div>";
  openDetailModal(html);
}

// ==================== INIT ====================
document.addEventListener("DOMContentLoaded", function () {
  loadDailyShlok();
  loadSantArticles();
  loadMandirs();
  loadBhajans();
  loadScience();
  loadCommunityDiscussions();
});
