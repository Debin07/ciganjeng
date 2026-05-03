document.addEventListener("DOMContentLoaded", async () => {
  // ⚠️ gunakan path ABSOLUTE (WAJIB di Vercel)
  await loadComponent("head", "/components/head.html");
  await loadComponent("navbar", "/components/navbar.html");
  await loadComponent("footer", "/components/footer.html");

  // ⚠️ jalankan SETELAH component selesai dimuat
  initSlider();
  initNavbarScroll();
  initMenuToggle();
  initGallery();
  initContactForm();
});

// 🔥 FIX: pakai async + error handling
async function loadComponent(id, file) {
  try {
    const res = await fetch(file);
    if (!res.ok) throw new Error(`Gagal load ${file}`);

    const data = await res.text();
    const el = document.getElementById(id);
    if (el) el.innerHTML = data;
  } catch (err) {
    console.error(err);
  }
}

function initSlider() {
  let slides = document.querySelectorAll(".slide");
  if (slides.length === 0) return;

  let current = 0;
  let dotsContainer = document.querySelector(".dots");

  if (dotsContainer) {
    dotsContainer.innerHTML = ""; // 🔥 reset biar tidak dobel

    slides.forEach((_, i) => {
      let dot = document.createElement("span");
      dot.classList.add("dot");
      if (i === 0) dot.classList.add("active");

      dot.addEventListener("click", () => showSlide(i));
      dotsContainer.appendChild(dot);
    });
  }

  let dots = document.querySelectorAll(".dot");

  function showSlide(i) {
    slides[current].classList.remove("active");
    if (dots[current]) dots[current].classList.remove("active");

    current = i;

    slides[current].classList.add("active");
    if (dots[current]) dots[current].classList.add("active");
  }

  const nextBtn = document.querySelector(".next");
  const prevBtn = document.querySelector(".prev");

  if (nextBtn)
    nextBtn.addEventListener("click", () =>
      showSlide((current + 1) % slides.length)
    );

  if (prevBtn)
    prevBtn.addEventListener("click", () =>
      showSlide((current - 1 + slides.length) % slides.length)
    );

  setInterval(() => {
    showSlide((current + 1) % slides.length);
  }, 5000);
}

function initNavbarScroll() {
  window.addEventListener("scroll", () => {
    let header = document.querySelector(".header");
    let navbar = document.querySelector(".navbar");

    if (!navbar || !header) return;

    if (window.scrollY > 50) {
      header.classList.add("scrolled");
      navbar.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
      navbar.classList.remove("scrolled");
    }
  });
}

// 🔥 FIX PALING PENTING (pakai event delegation)
function initMenuToggle() {
  document.addEventListener("click", function (e) {
    const toggle = e.target.closest(".menu-toggle");
    if (!toggle) return;

    const navRight = document.querySelector(".nav-right");
    const navLeft = document.querySelector(".nav-left");

    if (!navRight || !navLeft) return;

    navRight.classList.toggle("active");
    navLeft.classList.toggle("active");

    toggle.innerHTML = navRight.classList.contains("active") ? "✕" : "☰";
  });
}

function initGallery() {
  const buttons = document.querySelectorAll(".galeri-filter button");
  const items = document.querySelectorAll(".galeri-item");

  if (buttons.length === 0) return;

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const active = document.querySelector(".galeri-filter .active");
      if (active) active.classList.remove("active");

      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");

      items.forEach((item) => {
        item.style.display =
          filter === "all" || item.dataset.category === filter
            ? "block"
            : "none";
      });
    });
  });

  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modal-img");
  const close = document.querySelector(".close");

  if (!modal || !modalImg || !close) return;

  items.forEach((item) => {
    item.addEventListener("click", () => {
      modal.style.display = "block";
      modalImg.src = item.querySelector("img").src;
    });
  });

  close.addEventListener("click", () => {
    modal.style.display = "none";
  });
}

function initContactForm() {
  const form = document.querySelector(".kontak-form");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Pesan berhasil dikirim!");
    form.reset();
  });
}
