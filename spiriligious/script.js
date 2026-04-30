// ==================== CONFIGURATION ====================
const YOUTUBE_CHANNEL_ID = "UCxxxxxxxxxxxxxxxxxxxxxx";
const YOUTUBE_VIDEO_ID = "LYhkZO3MRyE";
const bhajanEmbedUrl = `https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=0&rel=0`;

// ==================== SCIENTIFIC ANALYSIS DATA ====================
const traditionsData = [
  {
    id: 1,
    title: "नमस्ते – विज्ञान और आध्यात्म का संगम",
    category: "अभिवादन",
    shortDesc: "हाथ जोड़ने से हृदय चक्र सक्रिय होता है और मस्तिष्क को सकारात्मक संकेत मिलते हैं।",
    fullAnalysis: `<strong>🔬 वैज्ञानिक विश्लेषण:</strong><br>
      हाथों की उंगलियों में स्थित एक्यूप्रेशर बिंदु (तंत्रिका अंत) एक दूसरे को स्पर्श करते हैं, जिससे ध्यान केंद्रित होता है और 'मिरर न्यूरॉन्स' सक्रिय होते हैं। यह शरीर में कोर्टिसोल (तनाव हार्मोन) कम करता है。<br><br>
      <strong>🕉️ आध्यात्मिक महत्व:</strong><br>
      यह भाव है कि 'मैं तुममें हूँ, तुम मुझमें हो' – अहंकार का त्याग।`
  },
  {
    id: 2,
    title: "उपवास (व्रत) – चयापचय का रीसेट",
    category: "अनुष्ठान",
    shortDesc: "व्रत केवल धार्मिक नहीं, बल्कि कोशिकीय सफाई (ऑटोफैजी) का एक प्राकृतिक तरीका है।",
    fullAnalysis: `<strong>🔬 वैज्ञानिक विश्लेषण:</strong><br>
      आंतरायिक उपवास से इंसुलिन संवेदनशीलता बढ़ती है, सूजन घटती है, और मस्तिष्क में BDNF बढ़ता है – जो न्यूरॉन्स के स्वास्थ्य के लिए आवश्यक है。<br><br>
      <strong>🕉️ परंपरागत दृष्टि:</strong><br>
      एकादशी, महाशिवरात्रि आदि व्रत शरीर को विश्राम और विषहरण का अवसर देते हैं।`
  },
  {
    id: 3,
    title: "हवन / यज्ञ – वायु शोधन और मन की शांति",
    category: "अग्नि अनुष्ठान",
    shortDesc: "यज्ञ में प्रयुक्त सामग्री वातावरण में रोगाणुरोधी प्रभाव छोड़ती है।",
    fullAnalysis: `<strong>🔬 वैज्ञानिक विश्लेषण:</strong><br>
      हवन में जलाई गई जड़ी-बूटियाँ (जैसे घी, जौ, सांभर) फॉर्मेल्डिहाइड जैसे प्रदूषकों को नष्ट करती हैं और हवन-धुएं में एंटीबैक्टीरियल यौगिक पाए गए हैं। <br><br>
      <strong>🕉️ मानसिक प्रभाव:</strong><br>
      नियमित यज्ञ से सीरोटोनिन स्तर बढ़ता है और चिंता कम होती है।`
  },
  {
    id: 4,
    title: "तिलक / बिंदी – मस्तिष्क बिंदुओं की सक्रियता",
    category: "शारीरिक चिह्न",
    shortDesc: "भौंहों के मध्य बिंदु को 'आज्ञा चक्र' कहा गया है – यह पीनियल ग्रंथि से जुड़ा है।",
    fullAnalysis: `<strong>🔬 वैज्ञानिक विश्लेषण:</strong><br>
      यह बिंदु ट्राइजेमिनल तंत्रिका के ऊपर स्थित है। हल्का दबाव ध्यान और एकाग्रता बढ़ाता है। <br><br>
      <strong>🕉️ परंपरागत अर्थ:</strong><br>
      तिलक सुरक्षा, समर्पण और ऊर्जा केंद्र को जागृत करने का प्रतीक है।`
  }
];

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

// ==================== "भजन देखें" BUTTON ====================
document.getElementById('bhajanBtn')?.addEventListener('click', () => {
  const playerHtml = `
    <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 1rem; margin-top: 0.5rem;">
      <iframe src="${bhajanEmbedUrl}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
    <p style="margin-top: 1rem; font-size: 0.9rem; color: #4B6382;">
      🕉️ इन भजनों का वैज्ञानिक विश्लेषण जल्द ही आ रहा है।<br>
      <a href="https://www.youtube.com/channel/${YOUTUBE_CHANNEL_ID}" target="_blank" style="color: #A68868;">सब्सक्राइब करें</a>
    </p>
  `;
  openModal("🎵 भजन संध्या", playerHtml);
});

// ==================== "एसा क्यों?" BUTTON ====================
document.getElementById('kyuBtn')?.addEventListener('click', () => {
  openModal('❓ एसा क्यों? — Spiriligious का दर्शन',
    '<strong>“परंपराएँ अंध विश्वास नहीं, बल्कि छिपे हुए विज्ञान की कुंजी हैं”</strong><br><br>' +
    'हम Spiriligious में मानते हैं कि प्रत्येक रीति, अनुष्ठान और आध्यात्मिक प्रथा के पीछे तर्क और वैज्ञानिक आधार होता है।<br><br>' +
    'जिज्ञासा ही भक्ति है, और विश्लेषण ही आस्था का आधुनिक सोपान। 🙏'
  );
});

// ==================== RENDER SCIENTIFIC ANALYSIS CARDS ====================
function renderAnalysisCards() {
  const grid = document.getElementById('analysisGrid');
  if (!grid) return;

  if (traditionsData.length === 0) {
    grid.innerHTML = '<div style="grid-column:1/-1; text-align:center; padding:2rem;">⚠️ कोई विश्लेषण उपलब्ध नहीं।</div>';
    return;
  }

  let cardsHtml = '';
  traditionsData.forEach(tradition => {
    cardsHtml += `
      <div class="analysis-card" data-id="${tradition.id}">
        <span class="card-tag">${tradition.category}</span>
        <h3>${tradition.title}</h3>
        <div class="tradition-category"><i class="fas fa-flask"></i> वैज्ञानिक सारांश</div>
        <p>${tradition.shortDesc}</p>
        <button class="read-more-btn" data-id="${tradition.id}">पूरा विश्लेषण पढ़ें <i class="fas fa-arrow-right"></i></button>
      </div>
    `;
  });
  grid.innerHTML = cardsHtml;

  document.querySelectorAll('.read-more-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = parseInt(btn.getAttribute('data-id'));
      const item = traditionsData.find(t => t.id === id);
      if (item) {
        openModal(`🔬 ${item.title}`, item.fullAnalysis);
      }
      e.stopPropagation();
    });
  });
}

// ==================== FORUM FUNCTIONS ====================
function initForum() {
  const newTopicBtn = document.getElementById('newTopicBtn');
  if (!newTopicBtn) return;
  loadTopics();
  newTopicBtn.onclick = () => showNewTopicModal();
  document.getElementById('saveTopicBtn').onclick = saveNewTopic;
  document.getElementById('cancelTopicBtn').onclick = hideNewTopicModal;
}

function loadTopics() {
  let topics = JSON.parse(localStorage.getItem('forumTopics')) || [];
  const container = document.getElementById('topicsList');
  if (!container) return;

  if (topics.length === 0) {
    container.innerHTML = '<div style="text-align:center; padding:2rem; color:#4B6382;">✨ कोई विषय नहीं। नया विषय बनाएँ ✨</div>';
    return;
  }

  container.innerHTML = topics.map(t => `
    <div class="forum-topic-card" data-id="${t.id}">
      <h3>${escapeHtml(t.title)}</h3>
      <p>${escapeHtml(t.content.substring(0, 120))}${t.content.length > 120 ? '…' : ''}</p>
      <small>✍️ ${escapeHtml(t.author)} · ${new Date(t.date).toLocaleString()} · 💬 ${t.replies.length} उत्तर</small>
    </div>
  `).join('');

  document.querySelectorAll('.forum-topic-card').forEach(card => {
    card.onclick = () => showTopicDetail(card.dataset.id);
  });
}

function showNewTopicModal() {
  const modalEl = document.getElementById('newTopicModal');
  if (modalEl) modalEl.style.display = 'flex';
}

function hideNewTopicModal() {
  const modalEl = document.getElementById('newTopicModal');
  if (modalEl) modalEl.style.display = 'none';
  const title = document.getElementById('topicTitle');
  const author = document.getElementById('topicAuthor');
  const content = document.getElementById('topicContent');
  if (title) title.value = '';
  if (author) author.value = '';
  if (content) content.value = '';
}

function saveNewTopic() {
  const title = document.getElementById('topicTitle').value.trim();
  const author = document.getElementById('topicAuthor').value.trim() || 'साधक';
  const content = document.getElementById('topicContent').value.trim();
  if (!title || !content) {
    openModal('त्रुटि', 'कृपया शीर्षक और विवरण भरें');
    return;
  }

  let topics = JSON.parse(localStorage.getItem('forumTopics')) || [];
  const newTopic = {
    id: Date.now(),
    title: title,
    author: author,
    content: content,
    date: new Date().toISOString(),
    replies: []
  };
  topics.push(newTopic);
  localStorage.setItem('forumTopics', JSON.stringify(topics));
  hideNewTopicModal();
  loadTopics();
  openModal('सफल', 'आपका विषय पोस्ट कर दिया गया है। 🙏');
}

function showTopicDetail(topicId) {
  const topics = JSON.parse(localStorage.getItem('forumTopics')) || [];
  const topic = topics.find(t => t.id == topicId);
  if (!topic) return;

  const container = document.getElementById('topicDetailView');
  const mainContainer = document.getElementById('forumContainer');
  if (!container || !mainContainer) return;
  
  mainContainer.style.display = 'none';
  container.style.display = 'block';

  let repliesHtml = '';
  topic.replies.forEach(reply => {
    repliesHtml += `
      <div class="forum-reply-card">
        <strong>${escapeHtml(reply.author)}</strong> <small>${new Date(reply.date).toLocaleString()}</small>
        <p>${escapeHtml(reply.content)}</p>
      </div>
    `;
  });

  container.innerHTML = `
    <div class="card-glass" style="padding:1.5rem;">
      <button id="backToTopicsBtn" class="btn btn-outline" style="margin-bottom:1rem;"><i class="fas fa-arrow-left"></i> सभी विषय</button>
      <h2>${escapeHtml(topic.title)}</h2>
      <p><small>${escapeHtml(topic.author)} · ${new Date(topic.date).toLocaleString()}</small></p>
      <div style="margin:1rem 0; padding:1rem; background:#E3C39D; border-radius:1rem;">${escapeHtml(topic.content)}</div>
      
      <h3>उत्तर (${topic.replies.length})</h3>
      <div id="repliesList">${repliesHtml || '<p>कोई उत्तर नहीं। पहला उत्तर लिखें।</p>'}</div>
      
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

  document.getElementById('postReplyBtn').onclick = () => {
    const replyText = document.getElementById('replyContent').value.trim();
    if (!replyText) {
      openModal('त्रुटि', 'कृपया उत्तर लिखें');
      return;
    }
    const reply = {
      author: 'साधक',
      content: replyText,
      date: new Date().toISOString()
    };
    topic.replies.push(reply);
    localStorage.setItem('forumTopics', JSON.stringify(topics));
    showTopicDetail(topicId);
  };
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>]/g, function(m) {
    if (m === '&') return '&amp;';
    if (m === '<') return '&lt;';
    if (m === '>') return '&gt;';
    return m;
  });
}

// ==================== LAB EXPERIMENTS ====================
let audioContext = null;
let mediaStream = null;
let animationId = null;
let breathingInterval = null;

function initLabExperiments() {
  const enableMicBtn = document.getElementById('enableMicBtn');
  if (enableMicBtn) {
    enableMicBtn.onclick = startAudioVisualizer;
  }
  const startBtn = document.getElementById('startBreathingBtn');
  const stopBtn = document.getElementById('stopBreathingBtn');
  if (startBtn) startBtn.onclick = startBreathing;
  if (stopBtn) stopBtn.onclick = stopBreathing;
}

async function startAudioVisualizer() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    if (audioContext) await audioContext.close();
    audioContext = new AudioContext();
    mediaStream = stream;
    const source = audioContext.createMediaStreamSource(stream);
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;
    source.connect(analyser);
    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    const canvas = document.getElementById('audioWaveCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    
    function draw() {
      if (!analyser || !ctx) return;
      analyser.getByteTimeDomainData(dataArray);
      ctx.fillStyle = '#071739';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.strokeStyle = '#A68868';
      ctx.lineWidth = 2;
      const sliceWidth = canvas.width / dataArray.length;
      let x = 0;
      for (let i = 0; i < dataArray.length; i++) {
        const v = dataArray[i] / 128.0;
        const y = v * canvas.height / 2;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
        x += sliceWidth;
      }
      ctx.stroke();
      
      analyser.getByteFrequencyData(dataArray);
      let max = 0, maxIndex = 0;
      for (let i = 0; i < dataArray.length; i++) {
        if (dataArray[i] > max) { max = dataArray[i]; maxIndex = i; }
      }
      const freq = maxIndex * audioContext.sampleRate / analyser.fftSize;
      const freqDiv = document.getElementById('freqData');
      if (freqDiv) freqDiv.innerHTML = `🎵 प्रमुख आवृत्ति: ${Math.round(freq)} Hz`;
      const relaxIndexDiv = document.getElementById('relaxIndex');
      if (relaxIndexDiv) {
        const relaxIndex = (max < 100) ? 'उच्च विश्राम' : (max < 180 ? 'मध्यम विश्राम' : 'कम विश्राम');
        relaxIndexDiv.innerHTML = `😌 विश्राम सूचकांक: ${relaxIndex}`;
      }
      animationId = requestAnimationFrame(draw);
    }
    draw();
  } catch (err) {
    openModal('माइक एक्सेस', 'माइक अनुमति नहीं मिली या कोई त्रुटि हुई। कृपया अनुमति दें।');
  }
}

function startBreathing() {
  if (breathingInterval) stopBreathing();
  
  const type = document.getElementById('breathingType').value;
  let inhale, hold, exhale;
  if (type === '478') {
    inhale = 4; hold = 7; exhale = 8;
  } else {
    inhale = 4; hold = 4; exhale = 4;
  }
  
  let cycle = 0;
  const cycleEl = document.getElementById('cycleCount');
  const phaseEl = document.getElementById('breathingPhase');
  const circle = document.getElementById('breathingCircle');
  
  let step = 0;
  let timeLeft = inhale;
  
  function updateUI() {
    if (step === 0) {
      phaseEl.innerText = `श्वास लें (${timeLeft}s)`;
      if (circle) circle.style.transform = 'scale(1.1)';
    } else if (step === 1) {
      phaseEl.innerText = `रोकें (${timeLeft}s)`;
      if (circle) circle.style.transform = 'scale(1.1)';
    } else if (step === 2) {
      phaseEl.innerText = `श्वास छोड़ें (${timeLeft}s)`;
      if (circle) circle.style.transform = 'scale(0.9)';
    } else if (step === 3) {
      phaseEl.innerText = `रोकें (${timeLeft}s)`;
      if (circle) circle.style.transform = 'scale(0.9)';
    }
  }
  
  const timer = setInterval(() => {
    if (!breathingInterval) {
      clearInterval(timer);
      return;
    }
    if (timeLeft <= 0) {
      step++;
      if (type === '478') {
        if (step > 2) { step = 0; cycle++; cycleEl.innerText = `चक्र: ${cycle}`; }
      } else {
        if (step > 3) { step = 0; cycle++; cycleEl.innerText = `चक्र: ${cycle}`; }
      }
      if (step === 0) timeLeft = inhale;
      else if (step === 1) timeLeft = hold;
      else if (step === 2) timeLeft = exhale;
      else if (step === 3) timeLeft = hold;
      updateUI();
    } else {
      timeLeft--;
      updateUI();
    }
  }, 1000);
  
  breathingInterval = timer;
  updateUI();
}

function stopBreathing() {
  if (breathingInterval) {
    clearInterval(breathingInterval);
    breathingInterval = null;
  }
  const phaseEl = document.getElementById('breathingPhase');
  if (phaseEl) phaseEl.innerText = 'रुका हुआ';
}

// ==================== CONTACT FORM ====================
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const subject = document.getElementById('contactSubject').value.trim();
    const message = document.getElementById('contactMessage').value.trim();
    if (!name || !email || !subject || !message) {
      openModal('त्रुटि', 'कृपया सभी फ़ील्ड भरें');
      return;
    }
    if (!email.includes('@')) {
      openModal('त्रुटि', 'कृपया मान्य ईमेल दर्ज करें');
      return;
    }
    openModal('धन्यवाद!', `प्रिय ${name}, आपका संदेश प्राप्त हो गया है। हम जल्द उत्तर देंगे। 🙏`);
    form.reset();
  });
}

// ==================== FOOTER "COMING SOON" ====================
const allFooterLinks = document.querySelectorAll('.footer-col a');
allFooterLinks.forEach(link => {
  if (link.getAttribute('href') === '#') {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      openModal('🚧 आ रहा है', `"${link.innerText}" पेज जल्द ही लॉन्च होगा।`);
    });
  }
});

// ==================== INITIALIZE ON PAGE LOAD ====================
document.addEventListener('DOMContentLoaded', () => {
  renderAnalysisCards();
  if (typeof initForum === 'function') initForum();
  if (typeof initLabExperiments === 'function') initLabExperiments();
  if (typeof initContactForm === 'function') initContactForm();
});