// Slide up account menu

document.addEventListener("DOMContentLoaded", () => {
  const accountBtn = document.getElementById("accountBtn");
  const accountMenu = document.getElementById("accountMenu");
  const backdrop = document.getElementById("backdrop");
  const closeMenu = document.getElementById("closeMenu");

  function openMenu() {
    accountMenu.classList.remove("translate-y-full");
    backdrop.classList.remove("hidden");
  }

  function closeAccountMenu() {
    accountMenu.classList.add("translate-y-full");
    backdrop.classList.add("hidden");
  }

  if (accountBtn) accountBtn.addEventListener("click", openMenu);
  if (closeMenu) closeMenu.addEventListener("click", closeAccountMenu);
  if (backdrop) backdrop.addEventListener("click", closeAccountMenu);
});




// Search page Sample data
// Sample data
const foodData = [
  { id: 1, name: "Rice", category: "grains", offer: "1 Basket of Onions", want: "3 Tubers of Yam", location: "Lagos - 400m", date: "Today", message: "Prefer fresh, no rot, old yam and big tubers if possible", verified: true },
  { id: 2, name: "Onions", category: "vegetables", offer: "10 bulbs of Onions", want: "8 cups of Rice", location: "Lagos - 1.2km", date: "Today", message: "I can trade more onion for more rice but minimum 8 cups of rice please", verified: false },
  { id: 3, name: "Yam", category: "tubers", offer: "2 Tubers of Yam", want: "5 cups of Beans", location: "Lagos - 800m", date: "Yesterday", message: "Looking for beans only. Prefer organic if available", verified: true },
  { id: 4, name: "Beans", category: "grains", offer: "4 cups of Beans", want: "1 Tubers of Yam", location: "Lagos - 2km", date: "This Week", message: "Flexible swap, reach out if interested", verified: false }
];

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const suggestions = document.getElementById("suggestions");
const results = document.getElementById("results");
const noResults = document.getElementById("noResults");
const filters = document.getElementById("filters");
const categoryFilter = document.getElementById("categoryFilter");
const sortFilter = document.getElementById("sortFilter");

// Render results
function renderResults(data) {
  results.innerHTML = "";
  if (data.length === 0) {
    results.classList.add("hidden");
    noResults.classList.remove("hidden");
    return;
  }
  noResults.classList.add("hidden");
  results.classList.remove("hidden");

  data.forEach(item => {
    const card = document.createElement("div");
    card.className = "dark:bg-gray-800 dark:border-gray-900 dark:text-white border rounded-lg shadow-sm p-3 mb-3 bg-gray-100 transition";

    card.innerHTML = `
      <div class="flex gap-3 dark:bg-gray-800 dark:text-white">
        <img 
    src="../../img/free-swap/onions.jpg" 
    alt="Food Item" 
    class="w-24 h-24 object-cover rounded-lg mb-3"
  />
        <div class="flex-grow">
          <p class="mt-2"><span class="font-bold opacity-50">Offers:</span> ${item.offer} 
            ${item.verified ? '<span class="text-green-600 text-xs">✔</span>' : ""}
          </p>
          <p class="mt-2"><span class="font-bold opacity-50">Wants:</span> ${item.want}</p>
          <p class="text-xs text-gray-500 dark:text-blue-300 mt-2 opacity-50">📍 ${item.location} · 🗓️ ${item.date}</p>

        </div>
      </div>
<p class="font-Kodchasan text-xl text-gray-700 dark:text-white mt-2 py-2 px-2"><span class="font-bold mt-2">Message:</span> ${item.message}</p>
      <div class="flex justify-between mt-3">
        <button class="cancelBtn hidden border border-red-300 text-red-500 dark:text-red-300 font-light px-3 py-1 rounded text-sm dark:border-gray-500">Cancel</button>
        <button class="sendBtn bg-green-600 text-white px-3 py-1 rounded text-sm ml-auto">Send Request</button>
      </div>
    `;

    const sendBtn = card.querySelector(".sendBtn");
    const cancelBtn = card.querySelector(".cancelBtn");

    sendBtn.addEventListener("click", () => {
      card.classList.add("bg-green-50");
      sendBtn.textContent = "Sent";
      sendBtn.disabled = true;
      cancelBtn.classList.remove("hidden");
    });

    cancelBtn.addEventListener("click", () => {
      card.classList.remove("bg-green-50");
      sendBtn.textContent = "Send Request";
      sendBtn.disabled = false;
      cancelBtn.classList.add("hidden");
    });

    results.appendChild(card);
  });
}

// Search function
function searchFood(query) {
  const filtered = foodData.filter(item => 
    item.name.toLowerCase().includes(query.toLowerCase())
  );
  renderResults(filtered);
  filters.classList.remove("hidden");
}

// Update filters
function updateFilters() {
  let filtered = [...foodData];
  const category = categoryFilter.value;
  const sort = sortFilter.value;

  if (category) filtered = filtered.filter(item => item.category === category);

  if (sort === "recent") filtered = filtered.reverse();
  if (sort === "verified") filtered = filtered.filter(item => item.verified);

  renderResults(filtered);
}

// Event listeners
searchBtn.addEventListener("click", () => {
  if (searchInput.value.trim() === "") return;
  searchFood(searchInput.value.trim());
});

searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && searchInput.value.trim() !== "") {
    searchFood(searchInput.value.trim());
  }
});

// Suggestions
searchInput.addEventListener("input", () => {
  const value = searchInput.value.trim().toLowerCase();
  if (!value) {
    suggestions.classList.add("hidden");
    return;
  }
  const matches = foodData.filter(item => item.name.toLowerCase().includes(value));
  suggestions.innerHTML = "";
  matches.forEach(item => {
    const li = document.createElement("li");
    li.className = "px-3 py-2 hover:bg-green-100 cursor-pointer";
    li.textContent = item.name;
    li.addEventListener("click", () => {
      searchInput.value = item.name;
      suggestions.classList.add("hidden");
      searchFood(item.name);
    });
    suggestions.appendChild(li);
  });
  suggestions.classList.remove("hidden");
});

categoryFilter.addEventListener("change", updateFilters);
sortFilter.addEventListener("change", updateFilters);