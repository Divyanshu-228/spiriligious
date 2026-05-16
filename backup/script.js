// ==================== FIREBASE CONFIGURATION ====================
const firebaseConfig = {
  apiKey: "AIzaSyC8h_NLwFq54mFSrZhG-gQnWJRIAr0zc5c",
  authDomain: "spiriligious-cms.firebaseapp.com",
  projectId: "spiriligious-cms",
  storageBucket: "spiriligious-cms.firebasestorage.app",
  messagingSenderId: "595657008516",
  appId: "1:595657008516:web:e7d2fed4b5e1e5c481e9d1",
  measurementId: "G-LXB9R61S94"
};

// Initialize Firebase (only once)
if (!firebase.apps || !firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();
function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// ==================== GLOBAL VARIABLES ====================
let traditionsData = [];
let bhajanVideos = [];
let encyclopediaTerms = [];

// YouTube config (replace with actual channel ID)
const YOUTUBE_CHANNEL_ID = "UCxxxxxxxxxxxxxxxxxxxxxx";
const YOUTUBE_VIDEO_ID = "LYhkZO3MRyE";
const bhajanEmbedUrl = `https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=0&rel=0`;

// ==================== MODAL LOGIC ====================
const modal = document.getElementById('infoModal');
const modalTitle = document.getElementById('modalTitle');
const modalMessage = document.getElementById('modalMessage');

function openModal(title, messageHtml) {
  if (!modal) return;
  modalTitle.innerText = title;
  modalMessage.innerHTML = messageHtml;
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  if (!modal) return;
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
}

window.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

// ==================== LOAD DATA FROM FIRESTORE ====================
async function loadScientificCards() {
  try {
    const snapshot = await db.collection('scientificCards').where('published', '==', true).get();
    traditionsData = [];
    snapshot.forEach(doc => traditionsData.push({ id: doc.id, ...doc.data() }));
    renderAnalysisCards();
    if (document.getElementById('scientificFullGrid')) renderFullAnalysis();
  } catch (err) { console.error(err); }
}

async function loadBhajanVideos() {
  try {
    const snapshot = await db.collection('bhajanVideos').where('published', '==', true).get();
    bhajanVideos = [];
    snapshot.forEach(doc => bhajanVideos.push({ id: doc.id, ...doc.data() }));
    renderBhajanPage();
  } catch (err) { console.error(err); }
}

async function loadEncyclopediaTerms() {
  try {
    const snapshot = await db.collection('encyclopediaTerms').where('published', '==', true).get();
    encyclopediaTerms = [];
    snapshot.forEach(doc => encyclopediaTerms.push({ id: doc.id, ...doc.data() }));
    renderEncyclopediaPage();
  } catch (err) { console.error(err); }
}

// ==================== RENDER HOMEPAGE SCIENTIFIC CARDS ====================
function renderAnalysisCards() {
  const grid = document.getElementById('analysisGrid');
  if (!grid) return;

  if (traditionsData.length === 0) {
    grid.innerHTML = '<div style="grid-column:1/-1; text-align:center; padding:2rem;">⚠️ कोई विश्लेषण उपलब्ध नहीं। कृपया बाद में देखें।</div>';
    return;
  }

  grid.innerHTML = traditionsData.map(t => `
    <div class="analysis-card">
      <span class="card-tag">${escapeHtml(t.category)}</span>
      <h3>${escapeHtml(t.title)}</h3>
      <div class="tradition-category"><i class="fas fa-flask"></i> वैज्ञानिक सारांश</div>
      <p>${escapeHtml(t.shortDesc)}</p>
      <button class="read-more-btn" data-id="${t.id}">पूरा विश्लेषण पढ़ें <i class="fas fa-arrow-right"></i></button>
    </div>
  `).join('');

  // Attach modal events to each "Read more" button
  document.querySelectorAll('.read-more-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = btn.getAttribute('data-id');
      const item = traditionsData.find(t => t.id === id);
      if (item) openModal(`🔬 ${item.title}`, item.fullAnalysis);
      e.stopPropagation();
    });
  });
}

function renderFullAnalysis() {
  const grid = document.getElementById('scientificFullGrid');
  if (!grid) return;
  if (traditionsData.length === 0) {
    grid.innerHTML = '<div style="text-align:center; padding:2rem;">कोई विश्लेषण उपलब्ध नहीं।</div>';
    return;
  }
  grid.innerHTML = traditionsData.map(t => `
    <div class="analysis-card full-analysis-card">
      <span class="card-tag">${escapeHtml(t.category)}</span>
      <h3>${escapeHtml(t.title)}</h3>
      <div class="tradition-category"><i class="fas fa-flask"></i> वैज्ञानिक एवं आध्यात्मिक विश्लेषण</div>
      <div class="full-analysis-content">${t.fullAnalysis}</div>
    </div>
  `).join('');
}

// ==================== RENDER BHAJAN VIDEOS ====================
function renderBhajanPage() {
  const container = document.getElementById('bhajanVideosContainer');
  if (!container) return;

  if (bhajanVideos.length === 0) {
    container.innerHTML = '<p style="text-align:center;">कोई भजन उपलब्ध नहीं। कृपया बाद में देखें।</p>';
    return;
  }

  container.innerHTML = bhajanVideos.map(video => `
    <div class="card-glass" style="padding:1rem; margin-bottom:2rem;">
      <h3 style="margin-bottom:0.5rem;">${escapeHtml(video.title)}</h3>
      <div style="position:relative; padding-bottom:56.25%; height:0; overflow:hidden; border-radius:1rem;">
        <iframe src="${video.videoUrl}?autoplay=0&rel=0" style="position:absolute; top:0; left:0; width:100%; height:100%;" frameborder="0" allowfullscreen></iframe>
      </div>
    </div>
  `).join('');
}

// ==================== RENDER ENCYCLOPEDIA TERMS ====================
function renderEncyclopediaPage() {
  const grid = document.getElementById('encyclopediaGrid');
  if (!grid) return;

  if (encyclopediaTerms.length === 0) {
    grid.innerHTML = '<div style="text-align:center; padding:2rem;">📖 कोई शब्द उपलब्ध नहीं।</div>';
    return;
  }

  grid.innerHTML = encyclopediaTerms.map(term => `
    <div class="card-glass" style="padding:1.5rem; cursor:pointer;" onclick="openModal('🔍 ${escapeHtml(term.term)}', '<strong>परंपरागत अर्थ:</strong> ${escapeHtml(term.meaning)}<br><br><strong>वैज्ञानिक व्याख्या:</strong> ${escapeHtml(term.scientific)}')">
      <i class="fas fa-gem" style="font-size:2rem; color:#A68868;"></i>
      <h3>${escapeHtml(term.term)}</h3>
      <p>${escapeHtml(term.meaning)}</p>
      <button class="read-more-btn" style="background:none; border:none; color:#A68868;">विवरण खोलें →</button>
    </div>
  `).join('');
}

function showError(type) {
  // Optional: show user-friendly error message on the respective page
  if (type === 'scientific') {
    const grid = document.getElementById('analysisGrid');
    if (grid) grid.innerHTML = '<div style="grid-column:1/-1; text-align:center; padding:2rem;">⚠️ डेटा लोड करने में त्रुटि। कृपया बाद में प्रयास करें।</div>';
  }
}

// ==================== HOMEPAGE BUTTONS ====================
document.getElementById('bhajanBtn')?.addEventListener('click', () => {
  openModal("🎵 भजन संध्या", `
    <div style="position:relative; padding-bottom:56.25%;">
      <iframe src="${bhajanEmbedUrl}" style="position:absolute; top:0; left:0; width:100%; height:100%;" frameborder="0" allowfullscreen></iframe>
    </div>
    <p style="margin-top:1rem;">🕉️ इन भजनों का वैज्ञानिक विश्लेषण जल्द आ रहा है।<br>
    <a href="https://www.youtube.com/channel/${YOUTUBE_CHANNEL_ID}" target="_blank" style="color:#A68868;">सब्सक्राइब करें</a></p>
  `);
});

document.getElementById('kyuBtn')?.addEventListener('click', () => {
  openModal('❓ एसा क्यों? — Spiriligious का दर्शन',
    '<strong>“परंपराएँ अंध विश्वास नहीं, बल्कि छिपे हुए विज्ञान की कुंजी हैं”</strong><br><br>' +
    'हम Spiriligious में मानते हैं कि प्रत्येक रीति, अनुष्ठान और आध्यात्मिक प्रथा के पीछे तर्क और वैज्ञानिक आधार होता है。<br><br>' +
    'जिज्ञासा ही भक्ति है, और विश्लेषण ही आस्था का आधुनिक सोपान। 🙏'
  );
});

// ==================== FORUM (FIRESTORE) ====================
async function initForum() {
  const newTopicBtn = document.getElementById('newTopicBtn');
  if (!newTopicBtn) {
    console.error("newTopicBtn not found");
    return;
  }
  try {
    await loadTopics();
    newTopicBtn.onclick = () => {
      console.log("New topic button clicked");
      showNewTopicModal();
    };
    document.getElementById('saveTopicBtn').onclick = saveNewTopic;
    document.getElementById('cancelTopicBtn').onclick = hideNewTopicModal;
  } catch (err) {
    console.error("initForum error:", err);
    openModal("त्रुटि", "फोरम लोड नहीं हो सका। कृपया पेज रिफ्रेश करें।");
  }
}

async function loadTopics() {
  const container = document.getElementById('topicsList');
  if (!container) return;
  try {
    const snapshot = await db.collection('forumTopics').where('published', '==', true).where('deleted', '==', false).orderBy('createdAt', 'desc').get();
    if (snapshot.empty) {
      container.innerHTML = '<div style="text-align:center; padding:2rem;">✨ कोई विषय नहीं। नया विषय बनाएँ ✨</div>';
      return;
    }
    let html = '';
    snapshot.forEach(doc => {
      const t = doc.data();
      const dateStr = t.createdAt ? new Date(t.createdAt.toDate()).toLocaleString() : new Date().toLocaleString();
      html += `
        <div class="forum-topic-card" data-id="${doc.id}">
          <h3>${escapeHtml(t.title)}</h3>
          <p>${escapeHtml(t.content.substring(0,120))}...</p>
          <small>✍️ ${escapeHtml(t.author)} · ${dateStr} · 💬 ${t.replies ? t.replies.length : 0} उत्तर</small>
        </div>
      `;
    });
    container.innerHTML = html;
    document.querySelectorAll('.forum-topic-card').forEach(card => {
      card.onclick = () => showTopicDetail(card.dataset.id);
    });
  } catch (err) {
    console.error("loadTopics error:", err);
    container.innerHTML = '<div style="text-align:center; padding:2rem; color:red;">डेटा लोड करने में त्रुटि। कृपया बाद में प्रयास करें।</div>';
  }
}

function showNewTopicModal() {
  const modal = document.getElementById('newTopicModal');
  if (modal) {
    modal.style.display = 'flex';
    console.log("Modal opened");
  } else {
    console.error("newTopicModal not found");
  }
}

function hideNewTopicModal() {
  const modal = document.getElementById('newTopicModal');
  if (modal) modal.style.display = 'none';
  document.getElementById('topicTitle').value = '';
  document.getElementById('topicAuthor').value = '';
  document.getElementById('topicContent').value = '';
}

async function saveNewTopic() {
  const title = document.getElementById('topicTitle').value.trim();
  const author = document.getElementById('topicAuthor').value.trim() || 'साधक';
  const content = document.getElementById('topicContent').value.trim();
  if (!title || !content) return openModal('त्रुटि', 'कृपया शीर्षक और विवरण भरें');
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
      replies: []
    };
    await db.collection('forumTopics').add(newTopic);
    hideNewTopicModal();
    await loadTopics();
    openModal('सफल','आपका विषय समीक्षा हेतु भेज दिया गया है। 🙏');
  } catch (err) {
    console.error("saveNewTopic error:", err);
    openModal('त्रुटि', 'विषय पोस्ट नहीं हो सका। कृपया बाद में प्रयास करें।');
  }
}

async function showTopicDetail(topicId) {
  try {
    const doc = await db.collection('forumTopics').doc(topicId).get();
    if (!doc.exists) return;
    const topic = { id: doc.id, ...doc.data() };
    const container = document.getElementById('topicDetailView');
    const mainContainer = document.getElementById('forumContainer');
    mainContainer.style.display = 'none';
    container.style.display = 'block';
    let repliesHtml = '';
    if (topic.replies && topic.replies.length) {
      repliesHtml = topic.replies.map(r => `
        <div class="forum-reply-card">
          <strong>${escapeHtml(r.author)}</strong> <small>${new Date(r.date).toLocaleString()}</small>
          <p>${escapeHtml(r.content)}</p>
        </div>
      `).join('');
    } else {
      repliesHtml = '<p>कोई उत्तर नहीं। पहला उत्तर लिखें।</p>';
    }
    const createdAtStr = topic.createdAt ? new Date(topic.createdAt.toDate()).toLocaleString() : new Date().toLocaleString();
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
    document.getElementById('backToTopicsBtn').onclick = () => {
      container.style.display = 'none';
      mainContainer.style.display = 'block';
      loadTopics();
    };
    document.getElementById('postReplyBtn').onclick = async () => {
      const replyText = document.getElementById('replyContent').value.trim();
      if (!replyText) return openModal('त्रुटि', 'कृपया उत्तर लिखें');
      const newReply = {
        author: 'साधक',
        content: replyText,
        date: new Date().toISOString()
      };
      const updatedReplies = [...(topic.replies || []), newReply];
      await db.collection('forumTopics').doc(topicId).update({ replies: updatedReplies });
      showTopicDetail(topicId);
    };
  } catch (err) {
    console.error("showTopicDetail error:", err);
    openModal('त्रुटि', 'विषय विवरण लोड नहीं हो सका।');
  }
}

// ==================== CONTACT FORM ====================
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const subject = document.getElementById('contactSubject').value.trim();
    const message = document.getElementById('contactMessage').value.trim();
    if (!name || !email || !subject || !message) return openModal('त्रुटि', 'कृपया सभी फ़ील्ड भरें');
    if (!email.includes('@')) return openModal('त्रुटि', 'कृपया मान्य ईमेल दर्ज करें');
    openModal('धन्यवाद!', `प्रिय ${name}, आपका संदेश प्राप्त हो गया है। हम जल्द उत्तर देंगे। 🙏`);
    form.reset();
  });
}

// ==================== HELPER ====================
function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>]/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[m]));
}

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', async () => {
  // Load scientific cards on homepage & scientific page
  if (document.getElementById('analysisGrid') || document.getElementById('scientificFullGrid')) {
    await loadScientificCards();
  }
  // Load bhajan videos on bhajan page
  if (document.getElementById('bhajanVideosContainer')) {
    await loadBhajanVideos();
  }
  // Load encyclopedia terms on encyclopedia page
  if (document.getElementById('encyclopediaGrid')) {
    await loadEncyclopediaTerms();
  }
  // Initialize forum if on forum page
  if (typeof initForum === 'function') initForum();
  // Initialize contact form if on contact page
  if (typeof initContactForm === 'function') initContactForm();
});