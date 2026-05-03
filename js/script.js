document.addEventListener("DOMContentLoaded", () => {
  loadComponent("head", "../components/head.html");
  loadComponent("navbar", "../components/navbar.html");
  loadComponent("footer", "../components/footer.html");

  initSlider();
  initNavbarScroll();
  initMenuToggle();
});

function loadComponent(id, file) {
  fetch(file)
    .then((res) => res.text())
    .then((data) => {
      const el = document.getElementById(id);
      if (el) el.innerHTML = data;
    });
}

function initSlider() {
  let slides = document.querySelectorAll(".slide");
  if (slides.length === 0) return;

  let current = 0;
  let dotsContainer = document.querySelector(".dots");

  // BUAT DOT
  if (dotsContainer) {
    slides.forEach((_, i) => {
      let dot = document.createElement("span");
      dot.classList.add("dot");
      if (i === 0) dot.classList.add("active");

      dot.onclick = () => showSlide(i);
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

  if (nextBtn && prevBtn) {
    nextBtn.onclick = () => {
      showSlide((current + 1) % slides.length);
    };

    prevBtn.onclick = () => {
      showSlide((current - 1 + slides.length) % slides.length);
    };
  }

  setInterval(() => {
    showSlide((current + 1) % slides.length);
  }, 5000);
}

function initNavbarScroll() {
  window.addEventListener("scroll", () => {
    let header = document.querySelector(".header");
    let navbar = document.querySelector(".navbar");

    if (!navbar || !header) return; // ❗ penting

    if (window.scrollY > 50) {
      header.classList.add("scrolled");
      navbar.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
      navbar.classList.remove("scrolled");
    }
  });
}

function initMenuToggle() {
  const menuToggle = document.querySelector(".menu-toggle");
  const navRight = document.querySelector(".nav-right");
  const navLeft = document.querySelector(".nav-left");

  if (!menuToggle || !navRight || !navLeft) return; // ❗ penting

  menuToggle.onclick = function () {
    navRight.classList.toggle("active");
    navLeft.classList.toggle("active");

    menuToggle.innerHTML = navRight.classList.contains("active") ? "✕" : "☰";
  };
}

function initGallery() {
  const buttons = document.querySelectorAll(".galeri-filter button");
  const items = document.querySelectorAll(".galeri-item");

  if (buttons.length === 0) return;

  // FILTER
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      document
        .querySelector(".galeri-filter .active")
        .classList.remove("active");
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");

      items.forEach((item) => {
        if (filter === "all" || item.dataset.category === filter) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });
  });

  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modal-img");
  const close = document.querySelector(".close");

  items.forEach((item) => {
    item.onclick = () => {
      modal.style.display = "block";
      modalImg.src = item.querySelector("img").src;
    };
  });

  close.onclick = () => (modal.style.display = "none");
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
