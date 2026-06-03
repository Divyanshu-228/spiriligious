// global.js – Fixed Navbar (Hamburger + Mobile Drawer + Dropdowns)

function loadHeader() {
  document.getElementById("header-placeholder").innerHTML = `
    <header>
      <div class="container">
        <a href="index.html" class="logo-text">Spiriligious</a>
        <button class="mobile-menu-btn" id="mobileMenuBtn" aria-label="Menu">
          <i class="fas fa-bars"></i>
        </button>
        <div class="nav-links" id="navLinks">
          <a href="index.html" class="nav-link" data-page="index">मुखपृष्ठ</a>
          <div class="dropdown">
            <button class="dropbtn">दर्शन <i class="fas fa-chevron-down"></i></button>
            <div class="dropdown-content">
              <a href="bhajan.html">भजन संग्रह</a>
              <a href="mandir-darshan.html">मंदिर दर्शन</a>
              <a href="sant-darshan.html">संत दर्शन</a>
            </div>
          </div>
          <div class="dropdown">
            <button class="dropbtn">विज्ञान और ज्ञान <i class="fas fa-chevron-down"></i></button>
            <div class="dropdown-content">
              <a href="scientific.html">वैज्ञानिक विश्लेषण</a>
              <a href="encyclopedia.html">ज्ञानकोश</a>
              <a href="panchang.html">पंचांग</a>
            </div>
          </div>
          <a href="forum.html" class="nav-link">मंथन मंच</a>
          <a href="podcast.html" class="nav-link">मंथन पॉडकास्ट</a>
          <a href="jyotish-paramarsh.html" class="nav-link">ज्योतिष परामर्श</a>
        </div>
      </div>
    </header>
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
            <h4>कानूनी</h4>
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
      </div>
    </footer>
  `;
}

function highlightActiveNav() {
  const current = window.location.pathname.split("/").pop() || "index.html";
  document
    .querySelectorAll(".nav-link, .dropdown-content a")
    .forEach((link) => {
      if (link.getAttribute("href") === current) {
        link.style.color = "#285943";
        link.style.fontWeight = "600";
      } else if (!link.classList.contains("dropbtn")) {
        link.style.color = "#4b5b4f";
        link.style.fontWeight = "500";
      }
    });
}

let lastScroll = 0;
function handleNavScroll() {
  const header = document.querySelector("header");
  if (!header) return;
  const current = window.scrollY;
  if (current > lastScroll && current > 100) header.classList.add("hide");
  else header.classList.remove("hide");
  lastScroll = current <= 0 ? 0 : current;
}

function initMobileMenu() {
  const btn = document.getElementById("mobileMenuBtn");
  const nav = document.getElementById("navLinks");
  if (!btn || !nav) return;

  // Remove any existing listeners to avoid duplicates
  const newBtn = btn.cloneNode(true);
  btn.parentNode.replaceChild(newBtn, btn);
  const newNav = nav.cloneNode(true);
  nav.parentNode.replaceChild(newNav, nav);

  const finalBtn = document.getElementById("mobileMenuBtn");
  const finalNav = document.getElementById("navLinks");

  // Toggle drawer
  finalBtn.addEventListener("click", (e) => {
    e.preventDefault();
    finalNav.classList.toggle("active");
    // Prevent body scroll when drawer is open
    if (finalNav.classList.contains("active")) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  });

  // Close drawer when clicking outside
  document.addEventListener("click", (e) => {
    if (!finalNav.contains(e.target) && !finalBtn.contains(e.target)) {
      finalNav.classList.remove("active");
      document.body.style.overflow = "";
    }
  });

  // Close drawer when any link (a) inside is clicked
  finalNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      finalNav.classList.remove("active");
      document.body.style.overflow = "";
    });
  });
}

// Mobile dropdown toggle (event delegation)
function initMobileDropdowns() {
  const nav = document.getElementById("navLinks");
  if (!nav) return;

  nav.addEventListener("click", (e) => {
    if (window.innerWidth > 768) return;
    const dropbtn = e.target.closest(".dropbtn");
    if (!dropbtn) return;
    e.preventDefault();
    const dropdownContent = dropbtn.nextElementSibling;
    if (
      !dropdownContent ||
      !dropdownContent.classList.contains("dropdown-content")
    )
      return;
    // Close all other open dropdowns
    document.querySelectorAll(".dropdown-content").forEach((menu) => {
      if (menu !== dropdownContent) menu.classList.remove("show");
    });
    dropdownContent.classList.toggle("show");
  });
}

function setPageBackground() {
  const page = window.location.pathname.split("/").pop() || "index.html";
  if (page !== "index.html") {
    document.body.style.backgroundImage = "url('images/bg-snd.jpg')";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundAttachment = "fixed";
  } else {
    document.body.style.backgroundImage = "none";
    document.body.style.backgroundColor = "var(--bg-cream)";
  }
}

function onWindowResize() {
  if (window.innerWidth > 768) {
    document.querySelectorAll(".dropdown-content").forEach((menu) => {
      menu.classList.remove("show");
    });
    // Ensure body scroll is re-enabled if drawer was open
    document.body.style.overflow = "";
    const nav = document.getElementById("navLinks");
    if (nav) nav.classList.remove("active");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadHeader();
  loadFooter();
  highlightActiveNav();
  setPageBackground();
  initMobileMenu();
  initMobileDropdowns();
  window.addEventListener("scroll", handleNavScroll);
  window.addEventListener("resize", onWindowResize);
  document.body.style.paddingTop = "70px";
});
