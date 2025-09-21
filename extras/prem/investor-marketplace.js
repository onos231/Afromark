const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');
    const industryFilter = document.getElementById('industryFilter');
    const locationFilter = document.getElementById('locationFilter');
    const investorList = document.getElementById('investorList');
    const noResults = document.getElementById('noResults');

    searchBtn.addEventListener('click', () => {
      const query = searchInput.value.toLowerCase();
      const selectedIndustry = industryFilter.value;
      const selectedLocation = locationFilter.value;

      let matchCount = 0;

      [...investorList.children].forEach(card => {
        const name = card.dataset.name.toLowerCase();
        const industry = card.dataset.industry;
        const location = card.dataset.location;

        const matchesName = !query || name.includes(query);
        const matchesIndustry = !selectedIndustry || industry === selectedIndustry;
        const matchesLocation = !selectedLocation || location === selectedLocation;

        if (matchesName && matchesIndustry && matchesLocation) {
          card.style.display = 'block';
          matchCount++;
        } else {
          card.style.display = 'none';
        }
      });

      noResults.style.display = matchCount === 0 ? 'block' : 'none';
    });