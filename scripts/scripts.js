/* --- RESPONSIVE MENU --- */
const hamburger = document.querySelector("#hamburger");
const nav = document.querySelector("#site-nav");

hamburger.addEventListener("click", () => {
  nav.classList.toggle("open");
  const expanded = hamburger.getAttribute("aria-expanded") === "true";
  hamburger.setAttribute("aria-expanded", !expanded);
  document.body.style.overflow = nav.classList.contains("open") ? "hidden" : "";
});

document.querySelectorAll(".site-nav .nav-link").forEach(a => {
  a.addEventListener("click", () => {
    nav.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  });
});

/* --- COPYRIGHT YEAR + LAST MODIFIED --- */
const yearSpan = document.querySelector("#year");
const lastMod = document.querySelector("#lastModified");

yearSpan.textContent = new Date().getFullYear();
lastMod.textContent = `Last Modified: ${document.lastModified}`;

/* --- COURSE DATA --- */
const courses = [
  { code: "CSE110", name: "Introduction to Programming", credits: 2, prefix: "CSE", completed: true },
  { code: "WDD130", name: "Web Fundamentals", credits: 2, prefix: "WDD", completed: true },
  { code: "CSE111", name: "Programming with Functions", credits: 2, prefix: "CSE", completed: true },
  { code: "WDD131", name: "Dynamic Web Fundamentals", credits: 2, prefix: "WDD", completed: true },
  { code: "CSE210", name: "Programming with Classes", credits: 2, prefix: "CSE", completed: true },
  { code: "WDD231", name: "Frontend Development II", credits: 3, prefix: "WDD", completed: false },
];

/* --- RENDER COURSES --- */
const courseList = document.querySelector("#course-list");
const totalCredits = document.querySelector("#credits-total");

function displayCourses(list) {
  courseList.innerHTML = "";
  let total = 0;

  list.forEach(course => {
    const card = document.createElement("div");
    card.classList.add("course-card");
    if (course.completed) card.classList.add("completed");

    const title = document.createElement("span");
    title.textContent = `${course.code} - ${course.name}`;

    const badge = document.createElement("span");
    badge.textContent = `${course.credits} cr`;
    badge.classList.add("badge");

    card.appendChild(title);
    card.appendChild(badge);
    courseList.appendChild(card);

    total += course.credits;
  });

  totalCredits.textContent = `Total Credits: ${total}`;
}

/* --- FILTER BUTTONS --- */
const buttons = document.querySelectorAll(".filter-btn");

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    // Reset active state
    buttons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;

    if (filter === "all") {
      displayCourses(courses);
    } else {
      const filtered = courses.filter(c => c.prefix === filter);
      displayCourses(filtered);
    }
  });
});

/* --- INITIAL RENDER --- */
displayCourses(courses);