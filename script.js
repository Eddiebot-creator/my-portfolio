const root = document.documentElement;
const themeToggle = document.querySelector(".theme-toggle");
const navLinks = [...document.querySelectorAll(".nav-link")];
const filters = [...document.querySelectorAll(".filter")];
const cards = [...document.querySelectorAll(".project-card")];
const searchInput = document.querySelector("#projectSearch");
const revealItems = [...document.querySelectorAll(".reveal")];

const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme === "dark") {
  root.classList.add("dark");
}

themeToggle?.addEventListener("click", () => {
  root.classList.toggle("dark");
  localStorage.setItem("portfolio-theme", root.classList.contains("dark") ? "dark" : "light");
});

const updateProjects = () => {
  const activeFilter = document.querySelector(".filter.active")?.dataset.filter || "all";
  const query = searchInput.value.trim().toLowerCase();

  cards.forEach((card) => {
    const matchesFilter = activeFilter === "all" || card.dataset.category === activeFilter;
    const matchesSearch = card.dataset.title.toLowerCase().includes(query);
    card.classList.toggle("hidden", !matchesFilter || !matchesSearch);
  });
};

filters.forEach((button) => {
  button.addEventListener("click", () => {
    filters.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    updateProjects();
  });
});

searchInput?.addEventListener("input", updateProjects);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.16 }
);

revealItems.forEach((item) => observer.observe(item));

const sections = ["work", "insights", "about", "contact"]
  .map((id) => document.getElementById(id))
  .filter(Boolean);

window.addEventListener("scroll", () => {
  const current = sections.findLast((section) => section.offsetTop <= window.scrollY + 180);
  if (!current) return;

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.dataset.section === current.id);
  });
});
