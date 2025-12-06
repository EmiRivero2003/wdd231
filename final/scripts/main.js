// Toggle mobile nav
const navToggle = document.querySelector("#nav-toggle");
const nav = document.querySelector("#primary-nav");

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

// Footer year
const yearSpan = document.querySelector("#current-year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// Wayfinding: marca el link activo según la página
const navLinks = document.querySelectorAll("#primary-nav a");
const currentPath = window.location.pathname.split("/").pop() || "index.html";

navLinks.forEach(link => {
  const href = link.getAttribute("href");
  if (href === currentPath) {
    link.classList.add("active");
  }
});