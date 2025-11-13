// ===============================
// Navigation Toggle
// ===============================
const navToggle = document.querySelector('#nav-toggle');
const siteNav = document.querySelector('#site-nav');

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const open = siteNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
}

// ===============================
// Footer Dates
// ===============================
const yearEl = document.getElementById('year');
const lastModEl = document.getElementById('last-mod');

if (yearEl) yearEl.textContent = new Date().getFullYear();
if (lastModEl) lastModEl.textContent = new Date(document.lastModified).toLocaleString();

// ===============================
// View Toggle (Grid / List)
// ===============================
const btnGrid = document.getElementById('btn-grid');
const btnList = document.getElementById('btn-list');
const directory = document.getElementById('directory');

function setView(mode) {
  if (!directory) return;

  const isGrid = mode === 'grid';
  directory.classList.toggle('grid', isGrid);
  directory.classList.toggle('list', !isGrid);

  btnGrid?.classList.toggle('selected', isGrid);
  btnGrid?.setAttribute('aria-pressed', String(isGrid));
  btnList?.classList.toggle('selected', !isGrid);
  btnList?.setAttribute('aria-pressed', String(!isGrid));
}

btnGrid?.addEventListener('click', () => setView('grid'));
btnList?.addEventListener('click', () => setView('list'));

setView('grid');

// ===============================
// Fetch and Display Members
// ===============================
async function loadMembers() {
  try {
    const response = await fetch('https://emirivero2003.github.io/wdd231/chamber/data/members.json');
    const members = await response.json();
    displayMembers(members);
  } catch (error) {
    console.error("Error loading members:", error);
  }
}

function displayMembers(members) {
  if (!directory) return;
  directory.innerHTML = "";

  members.forEach(member => {
    const card = document.createElement("section");
    card.classList.add("member-card");

    card.innerHTML = `
      <img src="${member.image}" alt="${member.name} logo" loading="lazy">
      <h2>${member.name}</h2>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <a href="${member.website}" target="_blank">${member.website}</a>
      <p>Membership: ${member.membership}</p>
    `;

    directory.appendChild(card);
  });
}

loadMembers();

// ===============================
// Spotlight Members
// ===============================
async function loadSpotlights() {
  try {
    const response = await fetch('https://emirivero2003.github.io/wdd231/chamber/data/members.json');
    const members = await response.json();

    const spotlightContainer = document.querySelector(".spotlight-container");
    if (!spotlightContainer) return;

    const eligible = members.filter(m => m.membership === "Gold" || m.membership === "Silver");
    const random = eligible.sort(() => 0.5 - Math.random()).slice(0, 3);

    spotlightContainer.innerHTML = "";

    random.forEach(member => {
      const card = document.createElement("div");
      card.classList.add("spotlight-card");

      card.innerHTML = `
        <img src="${member.image}" alt="${member.name} logo" loading="lazy">
        <h3>${member.name}</h3>
        <p>${member.address}</p>
        <p>${member.phone}</p>
        <a href="${member.website}" target="_blank">${member.website}</a>
        <p>Membership: ${member.membership}</p>
      `;

      spotlightContainer.appendChild(card);
    });
  } catch (error) {
    console.error("Error loading spotlights:", error);
  }
}

loadSpotlights();

// ===============================
// Weather Now
// ===============================
async function loadWeather() {
  const weatherInfo = document.getElementById('weather-info');
  if (!weatherInfo) return;

  const apiKey = '65444cc2553aaf6adc1963e1a0bc2251';
  const city = 'Montevideo';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Weather not available');

    const data = await response.json();
    const temp = Math.round(data.main.temp);
    const desc = data.weather[0].description;
    const icon = data.weather[0].icon;

    weatherInfo.innerHTML = `
      <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${desc}">
      <p><strong>${city}</strong></p>
      <p>${temp}°C • ${desc.charAt(0).toUpperCase() + desc.slice(1)}</p>
    `;
  } catch (error) {
    weatherInfo.innerHTML = `<p style="color: gray;">Weather data not available ☁️</p>`;
  }
}

loadWeather();

// ===============================
// 3-Day Forecast
// ===============================
async function loadForecast() {
  const forecastEl = document.getElementById('forecast');
  if (!forecastEl) return;

  const apiKey = '65444cc2553aaf6adc1963e1a0bc2251';
  const city = 'Montevideo';
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Forecast not available");

    const data = await response.json();
    const daily = data.list.filter(i => i.dt_txt.includes("12:00:00")).slice(0, 3);

    forecastEl.innerHTML = `
      <h3>3-Day Forecast</h3>
      <div class="forecast-container">
        ${daily.map(day => `
          <div class="forecast-day">
            <p><strong>${new Date(day.dt_txt).toLocaleDateString('en-US', { weekday: 'long' })}</strong></p>
            <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png">
            <p>${Math.round(day.main.temp)}°C</p>
          </div>
        `).join('')}
      </div>
    `;
  } catch (error) {
    forecastEl.innerHTML = `<p style="color: gray;">Forecast not available</p>`;
  }
}

loadForecast();