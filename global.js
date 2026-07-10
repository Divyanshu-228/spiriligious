// global.js – Premium Navbar + Mobile Menu (Event Delegation)

function loadHeader() {
  const placeholder = document.getElementById("header-placeholder");
  if (!placeholder) return;

  placeholder.innerHTML = `
    <header class="premium-header" role="banner">
      <div class="container">
        <a href="index.html" class="logo-link" aria-label="Spiriligious – Home">
          <img src="images/logo.png" alt="Spiriligious" class="logo-image" />
          <span class="logo-text-inline">Spiriligious</span>
        </a>

        <nav class="nav-links" id="navLinks" aria-label="Main Navigation">
          <a href="index.html" class="nav-link" data-page="index"><i class="fas fa-home"></i> Home</a>
          <a href="about.html" class="nav-link" data-page="about"><i class="fas fa-info-circle"></i> About</a>
          <a href="team.html" class="nav-link" data-page="team"><i class="fas fa-users"></i> Team</a>
          <a href="index.html#manthan-section" class="nav-link" data-page="forum"><i class="fas fa-comments"></i> Manthan</a>
          <a href="astro.html" class="nav-link" data-page="astro"><i class="fas fa-star-of-life"></i> Jyotish · Panchang</a>
          <a href="contact.html" class="nav-link" data-page="contact"><i class="fas fa-envelope"></i> Contact</a>
        </nav>

        <button class="mobile-menu-btn" id="mobileMenuBtn" aria-label="Toggle navigation menu" aria-expanded="false">
          <span class="pill"></span>
          <span class="pill"></span>
          <span class="pill"></span>
        </button>
      </div>
    </header>

    <!-- Mobile Drawer -->
    <div class="mobile-drawer-overlay" id="mobileDrawerOverlay"></div>
    <div class="mobile-drawer" id="mobileDrawer" role="dialog" aria-modal="true" aria-label="Navigation menu">
      <div class="drawer-header">
        <a href="index.html" class="drawer-logo-link">
          <img src="images/logo.png" alt="Spiriligious" class="drawer-logo" />
          <span class="drawer-logo-text">Spiriligious</span>
        </a>
        <p class="drawer-tagline">ज्ञान · अध्यात्म · विज्ञान</p>
        <button class="drawer-close" id="drawerCloseBtn" aria-label="Close navigation menu">
          <i class="fas fa-times"></i>
        </button>
        <div class="drawer-divider"></div>
      </div>
      <nav class="drawer-nav">
        <a href="index.html" class="drawer-link" data-page="index"><i class="fas fa-home"></i> Home</a>
        <a href="about.html" class="drawer-link" data-page="about"><i class="fas fa-info-circle"></i> About</a>
        <a href="team.html" class="drawer-link" data-page="team"><i class="fas fa-users"></i> Team</a>
        <a href="index.html#manthan-section" class="drawer-link" data-page="forum"><i class="fas fa-comments"></i> Manthan</a>
        <a href="astro.html" class="drawer-link" data-page="astro"><i class="fas fa-star-of-life"></i> Jyotish · Panchang</a>
        <a href="contact.html" class="drawer-link" data-page="contact"><i class="fas fa-envelope"></i> Contact</a>
      </nav>
    </div>
  `;
}

function loadFooter() {
  const placeholder = document.getElementById("footer-placeholder");
  if (!placeholder) return;

  placeholder.innerHTML = `
    <footer class="premium-footer" role="contentinfo">
      <div class="container">
        <div class="footer-main">
          <!-- Brand with Logo -->
          <div class="footer-brand">
            <div class="brand-logo">
              <img src="images/logo.png" alt="Spiriligious" class="footer-logo-image" />
              <span class="logo-text">Spiriligious</span>
            </div>
            <p class="brand-tagline">ज्ञान · अध्यात्म · विज्ञान</p>
            <p class="brand-description">
              Spiriligious is dedicated to preserving, understanding, and sharing the timeless wisdom of Sanatan Dharma through authentic knowledge, spirituality, and modern technology.
            </p>
            <div class="brand-lotus"><i class="fas fa-lotus"></i></div>
          </div>

          <div class="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="index.html"><i class="fas fa-home"></i> Home</a></li>
              <li><a href="about.html"><i class="fas fa-info-circle"></i> About</a></li>
              <li><a href="team.html"><i class="fas fa-users"></i> Team</a></li>
              <li><a href="contact.html"><i class="fas fa-envelope"></i> Contact</a></li>
              <li><a href="privacy.html"><i class="fas fa-shield-alt"></i> Privacy Policy</a></li>
              <li><a href="terms.html"><i class="fas fa-gavel"></i> Terms &amp; Conditions</a></li>
            </ul>
          </div>

          <div class="footer-col">
            <h4>Explore</h4>
            <ul>
              <li><a href="index.html#sant-section"><i class="fas fa-feather-alt"></i> Sant Darshan</a></li>
              <li><a href="index.html#mandir-section"><i class="fas fa-om"></i> Mandir Darshan</a></li>
              <li><a href="index.html#bhajan-section"><i class="fas fa-music"></i> Bhajan Collection</a></li>
              <li><a href="index.html#science-section"><i class="fas fa-book"></i> Encyclopedia</a></li>
              <li><a href="index.html#manthan-section"><i class="fas fa-comments"></i> Manthan Community</a></li>
            </ul>
          </div>

          <div class="footer-col footer-social-col">
            <h4>Social Links</h4>
            <ul class="social-links-list">
              <li><a href="https://www.youtube.com/@spiriligious" target="_blank" rel="noopener"><i class="fab fa-youtube"></i> YouTube</a></li>
              <li><a href="https://instagram.com/spiriligious" target="_blank" rel="noopener"><i class="fab fa-instagram"></i> Instagram</a></li>
              <li><a href="https://facebook.com/spiriligious" target="_blank" rel="noopener"><i class="fab fa-facebook-f"></i> Facebook</a></li>
            </ul>
          </div>

          <div class="footer-col footer-contact-col">
            <div class="footer-contact-card">
              <i class="fas fa-envelope contact-icon"></i>
              <h4>Contact</h4>
              <p class="contact-email"><a href="mailto:info@spiriligious.in">info@spiriligious.in</a></p>
              <p class="contact-response">For collaborations, corrections, and community queries.</p>
            </div>
          </div>

          
          </div>
        </div>

        <div class="footer-lotus-divider">
          <span class="divider-line"></span>
          <i class="fas fa-lotus"></i>
          <span class="divider-line"></span>
        </div>

        <div class="footer-bottom">
          <div class="footer-bottom-content">
            <p class="copyright">&copy; 2026 Spiriligious. All Rights Reserved. <span class="heart">|</span> Built to preserve India's timeless spiritual heritage.</p>
            <p class="credit">Rooted in tradition. Inspired by knowledge.</p>
          </div>
        </div>
      </div>
    </footer>
  `;
}

// ===== NAVBAR SCROLL =====
let lastScrollY = 0;
function handleNavScroll() {
  const header = document.querySelector(".premium-header");
  if (!header) return;
  const currentScrollY = window.scrollY;
  const delta = currentScrollY - lastScrollY;
  if (delta > 10 && currentScrollY > 100) {
    header.classList.add("hidden");
  } else if (delta < -5 || currentScrollY < 50) {
    header.classList.remove("hidden");
  }
  lastScrollY = currentScrollY;
}

// ===== MOBILE MENU – Event Delegation (works even if elements are added later) =====
function initMobileMenu() {
  // Helper to get elements
  const getElements = () => ({
    menuBtn: document.getElementById("mobileMenuBtn"),
    drawer: document.getElementById("mobileDrawer"),
    overlay: document.getElementById("mobileDrawerOverlay"),
    closeBtn: document.getElementById("drawerCloseBtn"),
  });

  function openDrawer(drawer, overlay, menuBtn) {
    drawer.classList.add("open");
    overlay.classList.add("active");
    menuBtn.classList.add("active");
    menuBtn.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }

  function closeDrawer(drawer, overlay, menuBtn) {
    drawer.classList.remove("open");
    overlay.classList.remove("active");
    menuBtn.classList.remove("active");
    menuBtn.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  // Use event delegation on the whole document
  document.addEventListener("click", function (e) {
    const { menuBtn, drawer, overlay, closeBtn } = getElements();
    if (!menuBtn || !drawer || !overlay || !closeBtn) return;

    // If click is on menu button or its children
    if (menuBtn.contains(e.target)) {
      e.preventDefault();
      if (drawer.classList.contains("open")) {
        closeDrawer(drawer, overlay, menuBtn);
      } else {
        openDrawer(drawer, overlay, menuBtn);
      }
    }

    // If click is on close button
    if (closeBtn.contains(e.target)) {
      e.preventDefault();
      closeDrawer(drawer, overlay, menuBtn);
    }

    // If click is on overlay
    if (e.target === overlay) {
      closeDrawer(drawer, overlay, menuBtn);
    }

    // If click is on a drawer link, close it
    if (e.target.closest(".drawer-link")) {
      closeDrawer(drawer, overlay, menuBtn);
    }
  });

  // Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      const { drawer, overlay, menuBtn } = getElements();
      if (drawer && drawer.classList.contains("open")) {
        closeDrawer(drawer, overlay, menuBtn);
      }
    }
  });

  console.log("Mobile menu event delegation set up.");
}

// ===== ACTIVE NAV LINK =====
function highlightActiveNav() {
  const current = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-link, .drawer-link").forEach(function (link) {
    link.classList.toggle("active", link.getAttribute("href") === current);
  });
}

// ===== INIT =====
document.addEventListener("DOMContentLoaded", function () {
  loadHeader();
  loadFooter();
  highlightActiveNav();
  initMobileMenu();
  window.addEventListener("scroll", handleNavScroll, { passive: true });
  handleNavScroll();
});
