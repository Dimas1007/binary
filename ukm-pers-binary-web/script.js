const pages = document.querySelectorAll(".page");
const links = document.querySelectorAll("[data-page]");
const menu = document.querySelector(".nav-menu");
const hamburger = document.querySelector(".hamburger");
const cursorGlow = document.querySelector(".cursor-glow");

function openPage(id){
  pages.forEach(p => p.classList.toggle("active", p.id === id));
  links.forEach(l => l.classList.toggle("active", l.dataset.page === id));
  menu.classList.remove("open");
  window.scrollTo({top:0, behavior:"smooth"});
  revealNow();
}

links.forEach(link => link.addEventListener("click", e => {
  e.preventDefault();
  openPage(link.dataset.page);
}));

document.querySelectorAll("[data-page-target]").forEach(btn => btn.addEventListener("click", () => openPage(btn.dataset.pageTarget)));
document.querySelectorAll("[data-open-detail]").forEach(card => card.addEventListener("click", () => openPage("detail")));

hamburger.addEventListener("click", () => menu.classList.toggle("open"));

document.addEventListener("mousemove", e => {
  cursorGlow.style.left = e.clientX + "px";
  cursorGlow.style.top = e.clientY + "px";
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting) entry.target.classList.add("show");
  });
},{threshold:.12});

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

function revealNow(){
  document.querySelectorAll(".page.active .reveal").forEach((el, i) => {
    setTimeout(()=>el.classList.add("show"), i*90);
  });
}

revealNow();

document.querySelector("form")?.addEventListener("submit", e => {
  e.preventDefault();
  alert("Pesan berhasil disiapkan! Silakan hubungkan ke backend/email service.");
});