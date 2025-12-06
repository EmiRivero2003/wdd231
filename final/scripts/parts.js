async function fetchParts() {
  try {
    const res = await fetch("scripts/parts.json");

    if (!res.ok) {
      throw new Error(`Could not load parts.json (status: ${res.status})`);
    }

    const data = await res.json();

    return Array.isArray(data.parts) ? data.parts : [];
  } catch (err) {
    console.error("Error loading parts:", err);
    return [];
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  const grid = document.getElementById("parts-grid");
  if (!grid) return;

  const parts = await fetchParts();

  if (!parts.length) {
    grid.innerHTML =
      '<p class="parts-empty">Parts could not be loaded right now. Please try again later.</p>';
    return;
  }

  grid.innerHTML = "";

  parts.forEach((part) => {
    const card = document.createElement("article");
    card.classList.add("part-card");

    card.innerHTML = `
      <img
        src="${part.image}"
        alt="${part.alt}"
        class="part-image"
        loading="lazy"
        width="900"
        height="600"
      >
      <h3>${part.name}</h3>
      <p>${part.description}</p>
    `;

    grid.appendChild(card);
  });
});
