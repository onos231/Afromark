function loadPage(page) {
  fetch(`pages/${page}.html`)
    .then(res => res.text())
    .then(html => {
      document.getElementById('appContent').innerHTML = html;
      window.scrollTo(0, 0);
    })
    .catch(err => {
      document.getElementById('appContent').innerHTML = `<p class="text-red-600">Page load failed.</p>`;
    });
}

// Load default page on first visit:
loadPage('listings');
