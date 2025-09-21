const html = document.documentElement;
const themeToggle = document.getElementById("themeToggle");

// 1. Apply the saved theme on page load
if (localStorage.getItem("theme") === "dark") {
  html.classList.add("dark");
  if (themeToggle) themeToggle.checked = true; // sync toggle on settings page
} else {
  html.classList.remove("dark");
  if (themeToggle) themeToggle.checked = false;
}

// 2. If we are on settings.html, listen for toggle changes
if (themeToggle) {
  themeToggle.addEventListener("change", () => {
    if (themeToggle.checked) {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  });
}
