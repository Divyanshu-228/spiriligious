// ==================== CONFIGURATION ====================
// 👇 Replace with your client's YouTube channel ID or keep as is
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
      हाथों की उंगलियों में स्थित एक्यूप्रेशर बिंदु (तंत्रिका अंत) एक दूसरे को स्पर्श करते हैं, जिससे ध्यान केंद्रित होता है और 'मिरर न्यूरॉन्स' सक्रिय होते हैं। यह शरीर में कोर्टिसोल (तनाव हार्मोन) कम करता है।<br><br>
      <strong>🕉️ आध्यात्मिक महत्व:</strong><br>
      यह भाव है कि 'मैं तुममें हूँ, तुम मुझमें हो' – अहंकार का त्याग।`
  },
  {
    id: 2,
    title: "उपवास (व्रत) – चयापचय का रीसेट",
    category: "अनुष्ठान",
    shortDesc: "व्रत केवल धार्मिक नहीं, बल्कि कोशिकीय सफाई (ऑटोफैजी) का एक प्राकृतिक तरीका है।",
    fullAnalysis: `<strong>🔬 वैज्ञानिक विश्लेषण:</strong><br>
      आंतरायिक उपवास से इंसुलिन संवेदनशीलता बढ़ती है, सूजन घटती है, और मस्तिष्क में BDNF बढ़ता है – जो न्यूरॉन्स के स्वास्थ्य के लिए आवश्यक है।<br><br>
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
  modalTitle.innerText = title;
  modalMessage.innerHTML = messageHtml;
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeModal() {
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
    <p style="margin-top: 1rem; font-size: 0.9rem; color: #6b4e2a;">
      🕉️ इन भजनों का वैज्ञानिक विश्लेषण जल्द ही आ रहा है।<br>
      <a href="https://www.youtube.com/channel/${YOUTUBE_CHANNEL_ID}" target="_blank" style="color: #c97e2a;">सब्सक्राइब करें</a>
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

  // Attach event listeners to buttons
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

// ==================== FOOTER LINKS (coming soon) ====================
const allFooterLinks = document.querySelectorAll('.footer-col a');
allFooterLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    if (link.getAttribute('href') === '#') {
      e.preventDefault();
      openModal('🚧 आ रहा है', `"${link.innerText}" पेज जल्द ही लॉन्च होगा।`);
    }
  });
});

// ==================== INITIALIZE ON PAGE LOAD ====================
document.addEventListener('DOMContentLoaded', () => {
  renderAnalysisCards();
});