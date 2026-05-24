// global.js
function loadHeader() {
  document.getElementById("header-placeholder").innerHTML = `
    <header>
      <div class="container" style="display:flex; justify-content:space-between; align-items:baseline; flex-wrap:wrap; gap:1rem;">
        <div>
          <a href="index.html" style="text-decoration:none;" class="logo-text">
            <span style="font-size:1.7rem; font-weight:700;">Spiriligious</span>
          </a>
        </div>

        <button class="mobile-menu-btn" id="mobileMenuBtn">
          <i class="fas fa-ellipsis-v"></i>
        </button>

        <div class="nav-links" id="navLinks">
          <div style="display: flex; gap: 1.5rem; font-size: 0.85rem; flex-wrap: wrap; align-items: center;">
            <a href="index.html" class="nav-link" data-page="index"><i class="fas fa-home"></i> मुखपृष्ठ</a>

            <!-- Darshan dropdown (Bhajan, Mandir, Sant) -->
            <div class="dropdown">
              <a href="#" class="dropbtn"><i class="fas fa-eye"></i> दर्शन <i class="fas fa-chevron-down" style="font-size: 0.7rem"></i></a>
              <div class="dropdown-content">
                <a href="bhajan.html"><i class="fas fa-music"></i> भजन संग्रह</a>
                <a href="mandir-darshan.html"><i class="fas fa-building"></i> मंदिर दर्शन</a>
                <a href="sant-darshan.html"><i class="fas fa-user-astronaut"></i> संत दर्शन</a>
              </div>
            </div>

            <!-- New dropdown: विज्ञान और ज्ञान (Scientific + Encyclopedia + Panchang) -->
            <div class="dropdown">
              <a href="#" class="dropbtn"><i class="fas fa-flask"></i> विज्ञान और ज्ञान <i class="fas fa-chevron-down" style="font-size: 0.7rem"></i></a>
              <div class="dropdown-content">
                <a href="scientific.html"><i class="fas fa-microscope"></i> वैज्ञानिक विश्लेषण</a>
                <a href="encyclopedia.html"><i class="fas fa-book"></i> ज्ञानकोश</a>
                <a href="panchang.html"><i class="fas fa-calendar-alt"></i> पंचांग</a>
              </div>
            </div>

            <!-- Remaining links -->
            <a href="forum.html" class="nav-link" data-page="forum"><i class="fas fa-comments"></i> मंथन मंच</a>
            <a href="podcast.html" class="nav-link" data-page="podcast"><i class="fas fa-podcast"></i> मंथन पॉडकास्ट</a>
            <a href="jyotish-paramarsh.html" class="nav-link" data-page="jyotish"><i class="fas fa-star-of-life"></i> ज्योतिष परामर्श</a>
          </div>
        </div>
      </div>
    </header>
    <style>
      /* dropdown styles now in style.css – keep minimal here if needed */
    </style>
  `;
}

function loadFooter() {
  document.getElementById("footer-placeholder").innerHTML = `
    <footer>
      <div class="container">
        <div class="footer-links-grid">
          <div class="footer-col">
            <h4>Spiriligious</h4>
            <a href="about.html"><i class="fas fa-info-circle"></i> About</a>
            <a href="team.html"><i class="fas fa-users"></i> Team</a>
            <a href="contact.html"><i class="fas fa-envelope"></i> Contact Us</a>
          </div>
          <div class="footer-col">
            <h4>कानूनी &amp; नीति</h4>
            <a href="privacy.html"><i class="fas fa-file-alt"></i> Privacy Policy</a>
            <a href="terms.html"><i class="fas fa-gavel"></i> Terms and Conditions</a>
          </div>
          <div class="footer-col">
            <h4>जुड़ें</h4>
            <a href="https://www.youtube.com/@spiriligious" target="_blank"><i class="fab fa-youtube"></i> Youtube</a>
            <a href="https://facebook.com/spiriligious" target="_blank"><i class="fab fa-facebook"></i> Facebook</a>
            <a href="https://instagram.com/spiriligious" target="_blank"><i class="fab fa-instagram"></i> Instagram</a>
          </div>
        </div>
        <div class="footer-copyright"><i class="far fa-copyright"></i> Spiriligious — ज्ञान, अध्यात्म और विज्ञान का संतुलित मंथन</div>
        <div class="footer-tagline">धर्म = जीवन का संतुलन · अध्यात्म = आत्मा का विज्ञान · उद्देश्य = परंपराओं का वैज्ञानिक विश्लेषण</div>
      </div>
    </footer>
  `;
}

function highlightActiveNav() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const links = document.querySelectorAll(".nav-link, .dropdown-content a");
  links.forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentPage) {
      link.style.color = "#B76E2E";
      link.style.fontWeight = "500";
    } else if (href && !link.classList.contains("dropbtn")) {
      link.style.color = "#5E3A24";
      link.style.fontWeight = "normal";
    }
  });
}

// ==================== DYNAMIC BACKGROUND IMAGES ====================
function setPageBackground() {
  const page = window.location.pathname.split("/").pop() || "index.html";
  let bgImage = "";
  if (page === "index.html") {
    bgImage = "images/bg-main.jpg";
  } else {
    bgImage = "images/bg-snd.jpg";
  }
  if (bgImage) {
    document.body.style.backgroundImage = `url('${bgImage}')`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center center";
    document.body.style.backgroundAttachment = "fixed";
  }
}

// ==================== MOBILE MENU TOGGLE & CLOSE ON CLICK OUTSIDE ====================
function initMobileMenu() {
  const btn = document.getElementById("mobileMenuBtn");
  const nav = document.getElementById("navLinks");

  if (!btn || !nav) return;

  // Toggle menu on button click
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    nav.classList.toggle("active");
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!nav.contains(e.target) && !btn.contains(e.target)) {
      nav.classList.remove("active");
    }
  });

  // Close menu when any nav link is clicked (for better UX on mobile)
  const navLinks = nav.querySelectorAll("a");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 768) {
        nav.classList.remove("active");
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadHeader();
  loadFooter();
  highlightActiveNav();
  setPageBackground();
  initMobileMenu();
});
