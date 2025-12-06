import { fetchVehicles } from "./data-service.js";

const STORAGE_KEY = "rms-inventory-preferences";

document.addEventListener("DOMContentLoaded", async () => {
  let vehicles = [];

  // -------------------------
  // LOAD VEHICLES WITH ERROR HANDLING
  // -------------------------
  try {
    vehicles = await fetchVehicles();
  } catch (error) {
    console.error("Error loading vehicles:", error);

    const grid = document.getElementById("vehicle-grid");
    const noResults = document.getElementById("no-results");

    if (grid && noResults) {
      grid.innerHTML = "";
      noResults.hidden = false;
      noResults.textContent = "There was a problem loading the inventory. Please try again later.";
    }

    return; // stop execution if we can't load data
  }

  const grid = document.getElementById("vehicle-grid");
  const filterType = document.getElementById("filter-type");
  const filterSort = document.getElementById("filter-sort");
  const filterSearch = document.getElementById("filter-search");
  const noResults = document.getElementById("no-results");

  // Modal elements
  const modal = document.getElementById("vehicle-modal");
  const modalImage = document.getElementById("modal-image");
  const modalTitle = document.getElementById("modal-title");
  const modalYear = document.getElementById("modal-year");
  const modalPrice = document.getElementById("modal-price");
  const modalDescription = document.getElementById("modal-description");
  const modalOverlay = modal.querySelector(".modal-overlay");
  const modalClose = modal.querySelector(".modal-close");

  let filteredVehicles = [...vehicles];

  // -------------------------
  // RENDER VEHICLE CARDS
  // -------------------------
  function renderVehicles(list) {
    grid.innerHTML = "";

    if (list.length === 0) {
      noResults.hidden = false;
      return;
    }

    noResults.hidden = true;

    list.forEach((v) => {
      const card = document.createElement("article");
      card.classList.add("vehicle-card");

      card.innerHTML = `
        <img
          src="${v.image}"
          alt="${v.brand} ${v.model}"
          class="vehicle-img"
          loading="lazy"
          width="400"
          height="250"
        >

        <div class="vehicle-info">
          <h3>${v.brand} ${v.model}</h3>
          <p class="vehicle-year">${v.year}</p>
          <p class="vehicle-price">$${v.price.toLocaleString()}</p>
        </div>
      `;

      // Open modal on click 
      card.addEventListener("click", () => openModal(v));

      grid.appendChild(card);
    });
  }

  // -------------------------
  // RESTORE FILTERS FROM LOCAL STORAGE (IF ANY)
  // -------------------------
  const savedPrefsRaw = localStorage.getItem(STORAGE_KEY);

  if (savedPrefsRaw) {
    try {
      const savedPrefs = JSON.parse(savedPrefsRaw);

      if (savedPrefs.type) {
        filterType.value = savedPrefs.type;
      }

      if (savedPrefs.sort) {
        filterSort.value = savedPrefs.sort;
      }

      if (typeof savedPrefs.search === "string") {
        filterSearch.value = savedPrefs.search;
      }
    } catch (error) {
      console.error("Error parsing saved inventory preferences:", error);
    }
  }

  // -------------------------
  // FILTERS AND SORTING
  // -------------------------
  filterType.addEventListener("change", applyFilters);
  filterSort.addEventListener("change", applyFilters);
  filterSearch.addEventListener("input", applyFilters);

  function applyFilters() {
    const typeValue = filterType.value;
    const sortValue = filterSort.value;
    const searchValue = filterSearch.value.toLowerCase();

    // Save current preferences to localStorage
    const preferences = {
      type: typeValue,
      sort: sortValue,
      search: filterSearch.value,
    };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
    } catch (error) {
      console.error("Error saving inventory preferences:", error);
    }

    // 1. Filter by type
    filteredVehicles = vehicles.filter((v) =>
      typeValue === "all" ? true : v.type === typeValue
    );

    // 2. Filter by search text
    filteredVehicles = filteredVehicles.filter((v) =>
      `${v.brand} ${v.model}`.toLowerCase().includes(searchValue)
    );

    // 3. Sorting
    switch (sortValue) {
      case "price-asc":
        filteredVehicles.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filteredVehicles.sort((a, b) => b.price - a.price);
        break;
      case "year-desc":
        filteredVehicles.sort((a, b) => b.year - a.year);
        break;
      case "year-asc":
        filteredVehicles.sort((a, b) => a.year - b.year);
        break;
    }

    renderVehicles(filteredVehicles);
  }

  // First render using current (or restored) filters
  applyFilters();

  // -------------------------
  // MODAL LOGIC
  // -------------------------
  function openModal(vehicle) {
    modalImage.src = vehicle.image;
    modalImage.alt = `${vehicle.brand} ${vehicle.model}`;
    modalTitle.textContent = `${vehicle.brand} ${vehicle.model}`;
    modalYear.textContent = `Year: ${vehicle.year}`;
    modalPrice.textContent = `$${vehicle.price.toLocaleString()}`;

    modalDescription.textContent =
      vehicle.type === "car"
        ? "This sports car offers premium performance, handling precision, and stunning design."
        : "This motorcycle delivers speed, agility, and top-tier engineering for true riders.";

    modal.hidden = false;
  }

  function closeModal() {
    modal.hidden = true;
  }

  modalOverlay.addEventListener("click", closeModal);
  modalClose.addEventListener("click", closeModal);

  // CLOSE WITH ESC
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.hidden) {
      closeModal();
    }
  });
});
