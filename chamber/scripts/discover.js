import { places } from "../data/places.mjs";

const grid = document.getElementById("discover-grid");

function renderPlaces() {
  places.forEach(place => {
    const card = document.createElement("article");
    card.classList.add("discover-card");
    card.style.gridArea = place.id;

    card.innerHTML = `
      <h2>${place.name}</h2>
      <figure>
        <img src="${place.image}" alt="${place.name}" loading="lazy" width="300" height="200">

      </figure>
      <address>${place.address}</address>
      <p>${place.description}</p>
      <button class="learn-more-btn">Learn More</button>
    `;

    grid.appendChild(card);
  });
}

renderPlaces();

// ===============================
// Visit Message using localStorage
// ===============================
function showVisitMessage() {
  const messageEl = document.getElementById("visit-message");
  if (!messageEl) return;

  const STORAGE_KEY = "discoverLastVisit";
  const now = Date.now();
  const lastVisit = localStorage.getItem(STORAGE_KEY);

  let message = "";

  if (!lastVisit) {
    message = "Welcome! Let us know if you have any questions.";
  } else {
    const lastTime = Number(lastVisit);
    const diffMs = now - lastTime;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays < 1) {
      message = "Back so soon! Awesome!";
    } else {
      const label = diffDays === 1 ? "day" : "days";
      message = `You last visited ${diffDays} ${label} ago.`;
    }
  }

  messageEl.textContent = message;

  localStorage.setItem(STORAGE_KEY, String(now));
}

showVisitMessage();