// ==================== FIREBASE CONFIGURATION ====================
const firebaseConfig = {
  apiKey: "AIzaSyC8h_NLwFq54mFSrZhG-gQnWJRIAr0zc5c",
  authDomain: "spiriligious-cms.firebaseapp.com",
  projectId: "spiriligious-cms",
  storageBucket: "spiriligious-cms.firebasestorage.app",
  messagingSenderId: "595657008516",
  appId: "1:595657008516:web:e7d2fed4b5e1e5c481e9d1",
  measurementId: "G-LXB9R61S94",
};

// Initialize Firebase (only once)
if (!firebase.apps || !firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();

// Helper: escape HTML
function escapeHtml(str) {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// ==================== GLOBAL VARIABLES ====================
let traditionsData = [];
let bhajanVideos = [];
let encyclopediaTerms = [];
let mandirDarshan = [];
let santDarshan = [];

// YouTube config
const YOUTUBE_CHANNEL_ID = "UCxxxxxxxxxxxxxxxxxxxxxx";
const YOUTUBE_VIDEO_ID = "LYhkZO3MRyE";
const bhajanEmbedUrl = `https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=0&rel=0`;

// ==================== MODAL LOGIC ====================
const modal = document.getElementById("infoModal");
const modalTitle = document.getElementById("modalTitle");
const modalMessage = document.getElementById("modalMessage");

function openModal(title, messageHtml) {
  if (!modal) return;
  modalTitle.innerText = title;
  modalMessage.innerHTML = messageHtml;
  modal.style.display = "flex";
  document.body.style.overflow = "hidden";
}

function closeModal() {
  if (!modal) return;
  modal.style.display = "none";
  document.body.style.overflow = "auto";
}

window.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

// ==================== LOAD DATA FROM FIRESTORE ====================
async function loadScientificCards() {
  try {
    const snapshot = await db
      .collection("scientificCards")
      .where("published", "==", true)
      .get();
    traditionsData = [];
    snapshot.forEach((doc) => {
      traditionsData.push({ id: doc.id, ...doc.data() });
    });
    traditionsData.sort((a, b) => {
      if ((b.pinned || false) !== (a.pinned || false))
        return (b.pinned || false) - (a.pinned || false);
      const aTime = a.createdAt?.seconds || 0;
      const bTime = b.createdAt?.seconds || 0;
      return bTime - aTime;
    });
    renderAnalysisCards();
    if (document.getElementById("scientificFullGrid")) renderFullAnalysis();
  } catch (err) {
    console.error(err);
  }
}

async function loadBhajanVideos() {
  try {
    const snapshot = await db
      .collection("bhajanVideos")
      .where("published", "==", true)
      .get();
    bhajanVideos = [];
    snapshot.forEach((doc) => {
      bhajanVideos.push({ id: doc.id, ...doc.data() });
    });
    bhajanVideos.sort(
      (a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0),
    );
    renderBhajanPage();
  } catch (err) {
    console.error(err);
  }
}

async function loadEncyclopediaTerms() {
  try {
    const snapshot = await db
      .collection("encyclopediaTerms")
      .where("published", "==", true)
      .get();
    encyclopediaTerms = [];
    snapshot.forEach((doc) =>
      encyclopediaTerms.push({ id: doc.id, ...doc.data() }),
    );
    renderEncyclopediaPage();
  } catch (err) {
    console.error(err);
  }
}
// ==================== DAILY SHLOK (Aaj ka Shlok) ====================
async function loadDailyShlok() {
  const container = document.getElementById("shlokContent");
  if (!container) return;
  try {
    // Fetch all published shloks (no orderBy, no limit)
    const snapshot = await db
      .collection("dailyShlok")
      .where("published", "==", true)
      .get();

    if (snapshot.empty) {
      container.innerHTML = `
        <p style="font-size:1.2rem;"><i class="fas fa-praying-hands"></i> ॐ सह नाववतु । सह नौ भुनक्तु । सह वीर्यं करवावहै ।</p>
        <p style="margin-top:0.5rem;">(शीघ्र ही प्रतिदिन नया श्लोक उपलब्ध होगा।)</p>
      `;
      return;
    }

    // Find the document with the latest date manually
    let latest = null;
    let latestDate = null;
    snapshot.forEach((doc) => {
      const data = doc.data();
      const dateVal = data.date?.toDate ? data.date.toDate() : new Date(0);
      if (!latestDate || dateVal > latestDate) {
        latestDate = dateVal;
        latest = data;
      }
    });

    if (!latest) {
      container.innerHTML = `<p>🙏 कोई प्रकाशित श्लोक नहीं।</p>`;
      return;
    }

    container.innerHTML = `
      <div style="font-size:1.4rem; font-weight:500; font-family: 'Noto Sans Devanagari', serif;">${escapeHtml(latest.text || "")}</div>
      <div style="margin-top:1rem;"><strong>अर्थ :</strong> ${escapeHtml(latest.meaning || "")}</div>
      ${latest.source ? `<div style="margin-top:0.5rem;"><small>स्रोत : ${escapeHtml(latest.source)}</small></div>` : ""}
    `;
  } catch (err) {
    console.error("Error loading daily shlok:", err);
    container.innerHTML = `<p>🙏 श्लोक लोड नहीं हो सका। कृपया बाद में देखें।</p>`;
  }
}

// ==================== RENDER FUNCTIONS ====================
function renderAnalysisCards() {
  const grid = document.getElementById("analysisGrid");
  if (!grid) return;
  if (traditionsData.length === 0) {
    grid.innerHTML =
      '<div style="grid-column:1/-1; text-align:center; padding:2rem;">⚠️ कोई विश्लेषण उपलब्ध नहीं। कृपया बाद में देखें।</div>';
    return;
  }
  grid.innerHTML = traditionsData
    .map(
      (t) => `
    <div class="analysis-card">
      <span class="card-tag">${escapeHtml(t.category)}</span>
      <h3>${escapeHtml(t.title)}</h3>
      <div class="tradition-category"><i class="fas fa-flask"></i> वैज्ञानिक सारांश</div>
      <p>${escapeHtml(t.shortDesc)}</p>
      <button class="read-more-btn" data-id="${t.id}">पूरा विश्लेषण पढ़ें <i class="fas fa-arrow-right"></i></button>
    </div>
  `,
    )
    .join("");
  document.querySelectorAll(".read-more-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = btn.getAttribute("data-id");
      const item = traditionsData.find((t) => t.id === id);
      if (item) openModal(`🔬 ${item.title}`, item.fullAnalysis);
      e.stopPropagation();
    });
  });
}

function renderFullAnalysis() {
  const grid = document.getElementById("scientificFullGrid");
  if (!grid) return;
  if (traditionsData.length === 0) {
    grid.innerHTML =
      '<div style="text-align:center; padding:2rem;">कोई विश्लेषण उपलब्ध नहीं।</div>';
    return;
  }
  grid.innerHTML = traditionsData
    .map(
      (t) => `
    <div class="analysis-card full-analysis-card">
      <span class="card-tag">${escapeHtml(t.category)}</span>
      <h3>${escapeHtml(t.title)}</h3>
      <div class="tradition-category"><i class="fas fa-flask"></i> वैज्ञानिक एवं आध्यात्मिक विश्लेषण</div>
      <div class="full-analysis-content">${t.fullAnalysis}</div>
    </div>
  `,
    )
    .join("");
}

function renderBhajanPage() {
  const container = document.getElementById("bhajanVideosContainer");
  if (!container) return;
  if (bhajanVideos.length === 0) {
    container.innerHTML =
      '<p style="text-align:center;">कोई भजन उपलब्ध नहीं। कृपया बाद में देखें।</p>';
    return;
  }
  container.innerHTML = bhajanVideos
    .map(
      (video) => `
    <div class="card-glass" style="padding:1rem; margin-bottom:2rem;">
      <h3 style="margin-bottom:0.5rem;">${escapeHtml(video.title)}</h3>
      <div style="position:relative; padding-bottom:56.25%; height:0; overflow:hidden; border-radius:1rem;">
        <iframe src="${video.videoUrl}?autoplay=0&rel=0" style="position:absolute; top:0; left:0; width:100%; height:100%;" frameborder="0" allowfullscreen></iframe>
      </div>
    </div>
  `,
    )
    .join("");
}

function renderEncyclopediaPage() {
  const grid = document.getElementById("encyclopediaGrid");
  if (!grid) return;
  if (encyclopediaTerms.length === 0) {
    grid.innerHTML =
      '<div style="text-align:center; padding:2rem;">📖 कोई शब्द उपलब्ध नहीं।</div>';
    return;
  }
  grid.innerHTML = encyclopediaTerms
    .map(
      (term) => `
    <div class="card-glass" style="padding:1.5rem; cursor:pointer;" onclick="openModal('🔍 ${escapeHtml(term.term)}', '<strong>परंपरागत अर्थ:</strong> ${escapeHtml(term.meaning)}<br><br><strong>वैज्ञानिक व्याख्या:</strong> ${escapeHtml(term.scientific)}')">
      <i class="fas fa-gem" style="font-size:2rem; color:#A68868;"></i>
      <h3>${escapeHtml(term.term)}</h3>
      <p>${escapeHtml(term.meaning)}</p>
      <button class="read-more-btn" style="background:none; border:none; color:#A68868;">विवरण खोलें →</button>
    </div>
  `,
    )
    .join("");
}

// ==================== MANDIR DARSHAN ====================
async function loadMandirs() {
  const container = document.getElementById("mandirDarshanContainer");
  if (!container) return;

  try {
    const snapshot = await db
      .collection("mandirDarshan")
      .where("published", "==", true)
      .orderBy("createdAt", "desc")
      .get();

    if (snapshot.empty) {
      container.innerHTML = `
        <div style="text-align:center; padding:2rem;">
          🛕 कोई मंदिर उपलब्ध नहीं।
        </div>
      `;
      return;
    }

    let html = "";

    snapshot.forEach((doc) => {
      const m = doc.data();

      html += `
        <div class="darshan-card">
          <img 
            src="${escapeHtml(m.imageUrl || "https://via.placeholder.com/400x200?text=Mandir")}" 
            alt="${escapeHtml(m.title)}"
            class="darshan-image"
          >

          <div class="darshan-content">
            <span class="darshan-badge">🛕 दिव्य स्थल</span>

            <h3>${escapeHtml(m.title)}</h3>

            <p>${escapeHtml(m.description || "")}</p>

            ${
              m.videoUrl
                ? `
                <div class="video-wrapper">
                  <iframe
                    src="${m.videoUrl}?rel=0"
                    title="${escapeHtml(m.title)}"
                    frameborder="0"
                    allowfullscreen>
                  </iframe>
                </div>
              `
                : ""
            }
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  } catch (err) {
    console.error(err);

    container.innerHTML = `
      <div style="text-align:center; padding:2rem;">
        त्रुटि: मंदिर डेटा लोड नहीं हो सका।
      </div>
    `;
  }
}

// ==================== SANT DARSHAN (FIXED) ====================
async function loadSants() {
  const snap = await db.collection("santDarshan").get();
  const container = document.getElementById("santList");
  container.innerHTML = "";
  let docs = [];
  snap.forEach((doc) => docs.push({ id: doc.id, ...doc.data() }));
  docs.sort(
    (a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0),
  );
  docs.forEach((item) => {
    const div = document.createElement("div");
    div.className = "item";
    div.innerHTML = `
      <img src="${escapeHtml(item.imageUrl || "https://via.placeholder.com/400x200?text=Sant")}" 
           style="width:100%; height:180px; object-fit:cover; border-radius:1rem;">
      <h3>${escapeHtml(item.name)}</h3>
      <p>${escapeHtml(item.description?.slice(0, 120))}...</p>
      <div><span class="${item.published ? "published-badge" : "draft-badge"}">${item.published ? "Published" : "Draft"}</span></div>
      <div class="forum-actions">
        <button onclick="editSant('${item.id}')">Edit</button>
        <button style="background:#dc3545;" onclick="deleteSant('${item.id}')">Delete</button>
      </div>
    `;
    container.appendChild(div);
  });
}

async function loadSantArticles() {
  const container = document.getElementById("santArticlesGrid");
  if (!container) return;
  try {
    const snapshot = await db
      .collection("santArticles")
      .where("published", "==", true)
      .orderBy("createdAt", "desc")
      .limit(6)
      .get();
    if (snapshot.empty) {
      container.innerHTML =
        '<p style="text-align:center;">लेख जल्द आ रहे हैं। 🙏</p>';
      return;
    }
    let html = "";
    snapshot.forEach((doc) => {
      const article = doc.data();
      html += `
        <a href="sant-article.html?id=${doc.id}" class="article-card">
          <img src="${article.imageUrl || "https://via.placeholder.com/400x200?text=Sant"}" alt="${article.title}">
          <div class="content">
            <h3>${escapeHtml(article.title)}</h3>
            <div class="author">✍️ ${escapeHtml(article.author)}</div>
            <div class="excerpt">${escapeHtml(article.content.substring(0, 120))}...</div>
          </div>
        </a>
      `;
    });
    container.innerHTML = html;
  } catch (err) {
    console.error(err);
    container.innerHTML =
      '<p style="text-align:center;">लेख लोड नहीं हो सके।</p>';
  }
}

window.deleteSant = async (id) => {
  if (!confirm("Delete this sant?")) return;
  await db.collection("santDarshan").doc(id).delete();
  loadSants();
};

async function editSant(id) {
  const doc = await db.collection("santDarshan").doc(id).get();
  const data = doc.data();
  openSantForm(data, id);
}

function openSantForm(existingData = null, existingId = null) {
  const modal = document.createElement("div");
  modal.className = "modal-overlay";
  const name = existingData ? existingData.name || "" : "";
  const description = existingData ? existingData.description || "" : "";
  const imageUrl = existingData ? existingData.imageUrl || "" : "";
  const videoUrl = existingData ? existingData.videoUrl || "" : "";
  const published = existingData ? existingData.published !== false : true;
  modal.innerHTML = `
    <div class="modal-content">
      <h3>${existingData ? "Edit Sant" : "Add New Sant"}</h3>
      <input id="santName" placeholder="Sant Name" value="${escapeHtml(name)}">
      <textarea id="santDesc" placeholder="Description" rows="5">${escapeHtml(description)}</textarea>
      <input id="santImage" placeholder="Image URL (optional)" value="${escapeHtml(imageUrl)}">
      <input id="santVideo" placeholder="YouTube Link (any format)" value="${escapeHtml(videoUrl)}">
      <label><input type="checkbox" id="santPublished" ${published ? "checked" : ""}> Published</label>
      <button id="saveSantBtn">Save Sant</button>
      <button style="background:#ccc; color:#222;" id="closeSantModal">Cancel</button>
    </div>
  `;
  document.body.appendChild(modal);
  document.getElementById("closeSantModal").onclick = () => modal.remove();
  document.getElementById("saveSantBtn").onclick = async () => {
    const nameVal = document.getElementById("santName").value.trim();
    const descVal = document.getElementById("santDesc").value.trim();
    const imageVal = document.getElementById("santImage").value.trim();
    const videoInput = document.getElementById("santVideo");
    const publishedVal = document.getElementById("santPublished").checked;
    if (!nameVal || !descVal) return alert("Please fill name and description");
    let embedUrl = null;
    if (videoInput.value.trim()) {
      embedUrl = await validateAndConvertYouTubeLink(
        videoInput.value.trim(),
        videoInput,
      );
      if (!embedUrl) return;
    }
    const payload = {
      name: nameVal,
      description: descVal,
      imageUrl: imageVal,
      videoUrl: embedUrl || "",
      published: publishedVal,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    };
    try {
      if (existingId)
        await db.collection("santDarshan").doc(existingId).update(payload);
      else await db.collection("santDarshan").add(payload);
      modal.remove();
      loadSants();
      alert("Sant saved successfully 🙏");
    } catch (err) {
      console.error(err);
      alert("Error saving sant");
    }
  };
}

// Also update loadAllData() to call loadSants() (not loadSant)
async function loadAllData() {
  await loadCards();
  await loadVideos();
  await loadTerms();
  await loadForumTopics();
  await loadMandirs();
  await loadSants(); // ✅ fixed
}

// ==================== SANT DARSHAN ====================
async function loadSantDarshan() {
  const container = document.getElementById("santDarshanContainer");
  if (!container) return;
  try {
    const snapshot = await db
      .collection("santDarshan")
      .where("published", "==", true)
      .orderBy("createdAt", "desc")
      .get();
    if (snapshot.empty) {
      container.innerHTML =
        '<div style="text-align:center; padding:2rem;">🙏 कोई संत उपलब्ध नहीं। जल्द आ रहा है।</div>';
      return;
    }
    let html = "";
    snapshot.forEach((doc) => {
      const s = doc.data();
      html += `
        <div class="darshan-card">
          <img src="${escapeHtml(s.imageUrl || "https://via.placeholder.com/400x200?text=Sant")}" 
               alt="${escapeHtml(s.name)}" 
               class="darshan-image">
          <div class="darshan-content">
            <span class="darshan-badge">🙏 महापुरुष</span>
            <h3>${escapeHtml(s.name)}</h3>
            <p>${escapeHtml(s.description)}</p>
            ${
              s.videoUrl
                ? `
              <div class="video-wrapper">
                <iframe src="${s.videoUrl}?rel=0" 
                        title="${escapeHtml(s.name)}" 
                        frameborder="0" 
                        allowfullscreen></iframe>
              </div>
            `
                : ""
            }
          </div>
        </div>
      `;
    });
    container.innerHTML = html;
  } catch (err) {
    console.error(err);
    container.innerHTML =
      '<div style="text-align:center; padding:2rem;">त्रुटि: डेटा लोड नहीं हो सका।</div>';
  }
}

// ==================== HOMEPAGE BUTTONS ====================
document.getElementById("bhajanBtn")?.addEventListener("click", () => {
  openModal(
    "🎵 भजन संध्या",
    `
    <div style="position:relative; padding-bottom:56.25%;">
      <iframe src="${bhajanEmbedUrl}" style="position:absolute; top:0; left:0; width:100%; height:100%;" frameborder="0" allowfullscreen></iframe>
    </div>
    <p style="margin-top:1rem;">🕉️ इन भजनों का वैज्ञानिक विश्लेषण जल्द आ रहा है।<br>
    <a href="https://www.youtube.com/channel/${YOUTUBE_CHANNEL_ID}" target="_blank" style="color:#A68868;">सब्सक्राइब करें</a></p>
  `,
  );
});

document.getElementById("kyuBtn")?.addEventListener("click", () => {
  openModal(
    "❓ एसा क्यों? — Spiriligious का दर्शन",
    "<strong>“परंपराएँ अंध विश्वास नहीं, बल्कि छिपे हुए विज्ञान की कुंजी हैं”</strong><br><br>" +
      "हम Spiriligious में मानते हैं कि प्रत्येक रीति, अनुष्ठान और आध्यात्मिक प्रथा के पीछे तर्क और वैज्ञानिक आधार होता है。<br><br>" +
      "जिज्ञासा ही भक्ति है, और विश्लेषण ही आस्था का आधुनिक सोपान। 🙏",
  );
});

// ==================== FORUM ====================
async function initForum() {
  const newTopicBtn = document.getElementById("newTopicBtn");
  if (!newTopicBtn) return;
  try {
    await loadTopics();
    newTopicBtn.onclick = () => showNewTopicModal();
    document.getElementById("saveTopicBtn").onclick = saveNewTopic;
    document.getElementById("cancelTopicBtn").onclick = hideNewTopicModal;
  } catch (err) {
    console.error(err);
    openModal("त्रुटि", "फोरम लोड नहीं हो सका। कृपया पेज रिफ्रेश करें।");
  }
}

async function loadTopics() {
  const container = document.getElementById("topicsList");
  if (!container) return;
  try {
    const snapshot = await db
      .collection("forumTopics")
      .where("published", "==", true)
      .where("deleted", "==", false)
      .orderBy("createdAt", "desc")
      .get();
    if (snapshot.empty) {
      container.innerHTML =
        '<div style="text-align:center; padding:2rem;">✨ कोई विषय नहीं। नया विषय बनाएँ ✨</div>';
      return;
    }
    let html = "";
    snapshot.forEach((doc) => {
      const t = doc.data();
      const dateStr = t.createdAt
        ? new Date(t.createdAt.toDate()).toLocaleString()
        : new Date().toLocaleString();
      html += `
        <div class="forum-topic-card" data-id="${doc.id}">
          <h3>${escapeHtml(t.title)}</h3>
          <p>${escapeHtml(t.content.substring(0, 120))}...</p>
          <small>✍️ ${escapeHtml(t.author)} · ${dateStr} · 💬 ${t.replies ? t.replies.length : 0} उत्तर</small>
        </div>
      `;
    });
    container.innerHTML = html;
    document.querySelectorAll(".forum-topic-card").forEach((card) => {
      card.onclick = () => showTopicDetail(card.dataset.id);
    });
  } catch (err) {
    console.error(err);
    container.innerHTML =
      '<div style="text-align:center; padding:2rem; color:red;">डेटा लोड करने में त्रुटि। कृपया बाद में प्रयास करें।</div>';
  }
}

function showNewTopicModal() {
  const modalDiv = document.getElementById("newTopicModal");
  if (modalDiv) modalDiv.style.display = "flex";
}

function hideNewTopicModal() {
  const modalDiv = document.getElementById("newTopicModal");
  if (modalDiv) modalDiv.style.display = "none";
  document.getElementById("topicTitle").value = "";
  document.getElementById("topicAuthor").value = "";
  document.getElementById("topicContent").value = "";
}

async function saveNewTopic() {
  const title = document.getElementById("topicTitle").value.trim();
  const author = document.getElementById("topicAuthor").value.trim() || "साधक";
  const content = document.getElementById("topicContent").value.trim();
  if (!title || !content)
    return openModal("त्रुटि", "कृपया शीर्षक और विवरण भरें");
  try {
    const newTopic = {
      title: escapeHtml(title),
      author: escapeHtml(author),
      content: escapeHtml(content),
      category: "General",
      published: false,
      locked: false,
      deleted: false,
      reports: 0,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      replies: [],
    };
    await db.collection("forumTopics").add(newTopic);
    hideNewTopicModal();
    await loadTopics();
    openModal("सफल", "आपका विषय समीक्षा हेतु भेज दिया गया है। 🙏");
  } catch (err) {
    console.error(err);
    openModal("त्रुटि", "विषय पोस्ट नहीं हो सका। कृपया बाद में प्रयास करें।");
  }
}

async function showTopicDetail(topicId) {
  try {
    const doc = await db.collection("forumTopics").doc(topicId).get();
    if (!doc.exists) return;
    const topic = { id: doc.id, ...doc.data() };
    const container = document.getElementById("topicDetailView");
    const mainContainer = document.getElementById("forumContainer");
    mainContainer.style.display = "none";
    container.style.display = "block";
    let repliesHtml = "";
    if (topic.replies && topic.replies.length) {
      repliesHtml = topic.replies
        .map(
          (r) => `
        <div class="forum-reply-card">
          <strong>${escapeHtml(r.author)}</strong> <small>${new Date(r.date).toLocaleString()}</small>
          <p>${escapeHtml(r.content)}</p>
        </div>
      `,
        )
        .join("");
    } else {
      repliesHtml = "<p>कोई उत्तर नहीं। पहला उत्तर लिखें।</p>";
    }
    const createdAtStr = topic.createdAt
      ? new Date(topic.createdAt.toDate()).toLocaleString()
      : new Date().toLocaleString();
    container.innerHTML = `
      <div class="card-glass" style="padding:1.5rem;">
        <button id="backToTopicsBtn" class="btn btn-outline" style="margin-bottom:1rem;"><i class="fas fa-arrow-left"></i> सभी विषय</button>
        <h2>${escapeHtml(topic.title)}</h2>
        <p><small>${escapeHtml(topic.author)} · ${createdAtStr}</small></p>
        <div style="margin:1rem 0; padding:1rem; background:#E3C39D; border-radius:1rem;">${escapeHtml(topic.content)}</div>
        <h3>उत्तर (${topic.replies ? topic.replies.length : 0})</h3>
        <div id="repliesList">${repliesHtml}</div>
        <div style="margin-top:1.5rem;">
          <textarea id="replyContent" rows="3" placeholder="अपना उत्तर लिखें..." style="width:100%; padding:10px; border-radius:12px; border:1px solid #A4B5C4;"></textarea>
          <button id="postReplyBtn" class="btn btn-primary" style="margin-top:0.5rem;">उत्तर दें</button>
        </div>
      </div>
    `;
    document.getElementById("backToTopicsBtn").onclick = () => {
      container.style.display = "none";
      mainContainer.style.display = "block";
      loadTopics();
    };
    document.getElementById("postReplyBtn").onclick = async () => {
      const replyText = document.getElementById("replyContent").value.trim();
      if (!replyText) return openModal("त्रुटि", "कृपया उत्तर लिखें");
      const newReply = {
        author: "साधक",
        content: replyText,
        date: new Date().toISOString(),
      };
      const updatedReplies = [...(topic.replies || []), newReply];
      await db
        .collection("forumTopics")
        .doc(topicId)
        .update({ replies: updatedReplies });
      showTopicDetail(topicId);
    };
  } catch (err) {
    console.error(err);
    openModal("त्रुटि", "विषय विवरण लोड नहीं हो सका।");
  }
}

// ==================== CONTACT FORM ====================
function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("contactName").value.trim();
    const email = document.getElementById("contactEmail").value.trim();
    const subject = document.getElementById("contactSubject").value.trim();
    const message = document.getElementById("contactMessage").value.trim();
    if (!name || !email || !subject || !message)
      return openModal("त्रुटि", "कृपया सभी फ़ील्ड भरें");
    if (!email.includes("@"))
      return openModal("त्रुटि", "कृपया मान्य ईमेल दर्ज करें");
    openModal(
      "धन्यवाद!",
      `प्रिय ${name}, आपका संदेश प्राप्त हो गया है। हम जल्द उत्तर देंगे। 🙏`,
    );
    form.reset();
  });
}

// ==================== INITIALIZATION ====================
document.addEventListener("DOMContentLoaded", async () => {
  // Load scientific cards
  if (
    document.getElementById("analysisGrid") ||
    document.getElementById("scientificFullGrid")
  ) {
    await loadScientificCards();
  }
  // Load bhajan videos
  if (document.getElementById("bhajanVideosContainer")) {
    await loadBhajanVideos();
  }
  // Load encyclopedia
  if (document.getElementById("encyclopediaGrid")) {
    await loadEncyclopediaTerms();
  }
  // Load mandir darshan
  if (document.getElementById("mandirDarshanContainer")) {
    loadMandirs();
  }
  // Load sant darshan
  if (document.getElementById("santDarshanContainer")) {
    loadSantDarshan();
  }
  if (document.getElementById("dailyShlokCard")) {
    await loadDailyShlok();
  }
  // Forum
  if (document.getElementById("newTopicBtn")) {
    initForum();
  }
  // Contact form
  if (document.getElementById("contactForm")) {
    initContactForm();
  }
  if (document.getElementById("shlokContent")) {
    loadDailyShlok();
  }
});
