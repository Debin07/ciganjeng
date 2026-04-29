// SLIDER
let slides = document.querySelectorAll(".slide");
let current = 0;
let dotsContainer = document.querySelector(".dots");

// BUAT DOT
slides.forEach((_, i)=>{
  let dot = document.createElement("span");
  dot.classList.add("dot");
  if(i===0) dot.classList.add("active");

  dot.onclick = ()=>showSlide(i);
  dotsContainer.appendChild(dot);
});

let dots = document.querySelectorAll(".dot");

function showSlide(i){
  slides[current].classList.remove("active");
  dots[current].classList.remove("active");

  current = i;

  slides[current].classList.add("active");
  dots[current].classList.add("active");
}

// NEXT
document.querySelector(".next").onclick=()=>{
  showSlide((current+1)%slides.length);
};

// PREV
document.querySelector(".prev").onclick=()=>{
  showSlide((current-1+slides.length)%slides.length);
};

// AUTO
setInterval(()=>{
  showSlide((current+1)%slides.length);
},5000);


// NAVBAR SCROLL EFFECT
window.addEventListener("scroll",()=>{
  let header = document.querySelector(".header");
  let navbar = document.querySelector(".navbar");

  if(window.scrollY > 50){
    header.classList.add("scrolled");
    navbar.classList.add("scrolled");
  }else{
    header.classList.remove("scrolled");
    navbar.classList.remove("scrolled");
  }
});