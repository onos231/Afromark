// theme.js
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
}

function toggleTheme(manualToggle = true) {
  const newTheme = manualToggle
    ? document.getElementById('themeSwitch').checked ? 'dark' : 'light'
    : (localStorage.getItem('theme') || 'light');

  applyTheme(newTheme);
  if (manualToggle) localStorage.setItem('theme', newTheme);
}

document.addEventListener('DOMContentLoaded', () => {
  toggleTheme(false);
  const switcher = document.getElementById('themeSwitch');
  if (switcher) {
    switcher.checked = localStorage.getItem('theme') === 'dark';
    switcher.addEventListener('change', toggleTheme);
  }
});
